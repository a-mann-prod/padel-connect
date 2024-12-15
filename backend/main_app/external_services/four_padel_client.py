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

    def get_booking_rules(self, date):
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
            "center_id": 77,
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
        Clean the booking data to match the required format.
        """

        cleaned_data = []

        # Nettoyage des champs "fields"
        for data_item in data:
            cleaned_data_item = {
                "startingDateZuluTime": data_item.get("startingDateZuluTime"),
                "endingDateZuluTime": data_item.get("endingDateZuluTime"),
                "fields": []
            }
            for field in data_item.get("fields", []):
                cleaned_field = {
                    "id": field.get("id"),
                    "name": field.get("name"),
                    "startingDateZuluTime": field.get("startingDateZuluTime"),
                    "endingDateZuluTime": field.get("endingDateZuluTime"),
                    "duration": field.get("duration"),
                    "active": field.get("active")
                }
                cleaned_data_item["fields"].append(cleaned_field)
            cleaned_data.append(cleaned_data_item)
        return cleaned_data