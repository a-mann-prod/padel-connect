import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework.exceptions import ValidationError
from main_app.exceptions import ErrorCode

class Four_padel_user:
    def __init__(self, id, email):
        self.id = id
        self.email = email

class FourPadelAPIClient:
    def __init__(self, id=None):
        self.id = id
        self.base_url = settings.FOUR_PADEL["BASE_URL"]
        self.login_url = f"{self.base_url}{settings.FOUR_PADEL['LOGIN_ENDPOINT']}"
        self.google_login_url = f"{self.base_url}{settings.FOUR_PADEL['LOGIN_ENDPOINT']}/google"
        self.booking_url = f"{self.base_url}{settings.FOUR_PADEL['BOOKING_ENDPOINT']}"
        self.token = None

    SHARED_PARAMS = {
        "appId": 2
    }
    
    TOKEN_CACHE_TIMEOUT = 3600 * 24 * 30  # Durée de vie du token dans le cache (30j)



    def login(self, username, password):
        headers = {
            "accept": "text/plain, */*",
            "content-type": "application/x-www-form-urlencoded"
        }
        params = {
            **self.SHARED_PARAMS
        }
        payload = {
            "email": username,
            "password": password
        }

        response = requests.post(self.login_url, data=payload, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            user = Four_padel_user(id=data.get('id'), email=data.get('email'))
            self.token = data.get("access_token")

            cache.set(f"four_padel_token_{user.id}", self.token, self.TOKEN_CACHE_TIMEOUT)
            
            return user
    

        data = response.json()
        code = data.get('code') 
        message = data.get('message')

        # 9 -> User not found 1 -> Invalid credentials
        if code in [1, 9]:
            raise ValidationError(detail="Invalid credentials or user not found", code=ErrorCode.INVALID_CREDENTIALS.value)

        raise ValidationError(detail=message)

    def google_login(self, google_token):
        headers = {
            "accept": "text/plain, */*",
            "content-type": "application/x-www-form-urlencoded"
        }
        params = {
            **self.SHARED_PARAMS,
            "createIfNotExist": False,
            "newsletter": False,
            "center": 1
        }
        payload = {
            "GOOGLE_ID_TOKEN": google_token,
        }

        response = requests.post(self.google_login_url, data=payload, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()

            if data is None:
                raise ValidationError(detail="No user found", code="USER_NOT_FOUND")

            user = Four_padel_user(id=data.get('id'), email=data.get('email'))
            self.token = data.get("access_token")

            cache.set(f"four_padel_token_{user.id}", self.token, self.TOKEN_CACHE_TIMEOUT)
            
            return user

        # Lever une exception si la connexion échoue
        response.raise_for_status()
        
    def get_token(self):
        """
        Récupère le token du cache ou lève une exception si non disponible.
        """
        token = cache.get(f"four_padel_token_{self.id}")
        if not token:
            return settings.FOUR_PADEL['DEFAULT_TOKEN']
            raise ValueError("Four padel token not found")
        return token

    def get_booking_rules(self, complex_id, date):
        """
        Fetch booking rules with the token. Retry login if token is expired.
        """
        token = self.get_token()  # Ensure we have a valid token

        headers = {
            "Authorization": f"Bearer {token}",
            "accept": "text/plain, */*",
            "content-type": "application/json"
        }

        params = {
            **self.SHARED_PARAMS,
        }

        json = {
            "startingDateZuluTime": f"{date}T02:00:00.000Z",
            "endingDateZuluTime": f"{date}T22:59:00.000Z",
            "durations": "60,90,120",
            "capacity": 4,
            "center_id": complex_id,
            "bookingType_id": "1",
            "sportType_id": 3,
            "isChannelWeb": True,
        }

        try:
            response = requests.post(self.booking_url, headers=headers, params=params, json=json)
            if response.status_code == 401:  # Token expired or invalid
                self.login()  # Get a new token
                headers = {
                    **headers,
                    "Authorization": f"Bearer {self.token}",
                }
                response = requests.post(self.booking_url, headers=headers, params=params, json=json)
            
            response.raise_for_status()
            data = response.json()

            return self.clean_booking_data(data)
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to fetch booking: {e}")


    def clean_booking_data(self, data):
        """
        Clean the booking data to match the required format, grouping by startingDateZuluTime
        and merging fields with the same id. Fields are ordered by id.
        """

        grouped_data = {}

        # Regrouper les données par startingDateZuluTime
        for data_item in data:
            starting_date = data_item.get("startingDateZuluTime")

            if starting_date not in grouped_data:
                # Initialiser un groupe pour cette date de début
                grouped_data[starting_date] = {
                    "startingDateZuluTime": starting_date,
                    "fields": {}
                }

            # Ajouter les champs dans le groupe correspondant
            for field in data_item.get("fields", []):
                field_id = field.get("id")
                if field_id not in grouped_data[starting_date]["fields"]:
                    # Créer une nouvelle entrée pour cet id
                    grouped_data[starting_date]["fields"][field_id] = {
                        "id": field_id,
                        "name": field.get("name"),
                        "startingDateZuluTime": field.get("startingDateZuluTime"),
                        "durations": []
                    }

                # Ajouter la durée dans la liste des durations
                duration = field.get("duration")
                if duration:
                    grouped_data[starting_date]["fields"][field_id]["durations"].append(duration)

        # Convertir les champs de dictionnaire en liste et structurer les données
        cleaned_data = []
        for starting_date, data_group in grouped_data.items():
            # Trier les champs par id
            sorted_fields = sorted(data_group["fields"].values(), key=lambda x: x["id"])
            cleaned_data.append({
                "startingDateZuluTime": starting_date,
                "fields": sorted_fields
            })

        return cleaned_data
