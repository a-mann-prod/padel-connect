import requests
from django.conf import settings
from django.core.cache import cache

class FourPadelAPIClient:
    SHARED_PARAMS = {
        "appId": 2
    }
    
    TOKEN_CACHE_KEY = "four_padel_api_token"  # Clé pour le token dans le cache
    TOKEN_CACHE_TIMEOUT = 3600 * 24 * 30  # Durée de vie du token dans le cache (30j)

    def __init__(self):
        self.base_url = settings.FOUR_PADEL["BASE_URL"]
        self.login_url = f"{self.base_url}{settings.FOUR_PADEL['LOGIN_ENDPOINT']}"
        self.booking_url = f"{self.base_url}{settings.FOUR_PADEL['BOOKING_ENDPOINT']}"
        self.username = settings.FOUR_PADEL["USERNAME"]
        self.password = settings.FOUR_PADEL["PASSWORD"]
        self.token = None

    def login(self):
        """
        Perform login to get a new token.
        """

        headers = {
            "accept": "text/plain, */*",
            "content-type": "application/x-www-form-urlencoded"
        }

        params = {
            **self.SHARED_PARAMS
        }

        payload = {
                "email": self.username,
                "password": self.password,
            }

        try:
            response = requests.post(self.login_url, data=payload, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            self.token = data.get("access_token")
            cache.set(self.TOKEN_CACHE_KEY, self.token, timeout=self.TOKEN_CACHE_TIMEOUT)
            return self.token
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Login failed: {e}")
        
    def get_token(self):
        """
        Get the token from cache or perform a login if not available.
        """
        self.token = cache.get(self.TOKEN_CACHE_KEY)
        if not self.token:  # If the token is not in the cache
            self.token = self.login()
        return self.token

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
