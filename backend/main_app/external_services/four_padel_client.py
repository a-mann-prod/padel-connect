import requests
from django.conf import settings
from main_app.models import CustomUser, Match
from rest_framework.exceptions import ValidationError
from main_app.exceptions import ErrorCode
from datetime import timedelta
import pytz
from enum import Enum
import logging

logger = logging.getLogger('django')

class FourPadelBooking(Enum):
    COMPLETE = "COMPLETE"
    CANCELLED = "CANCELLED"
    PAYABLE = "PAYABLE"
    PRE_BOOKED = "PRE_BOOKED"

def get_booking_status(status, participations):
    if status != 'Cancelled': 
        total_slots_paid = sum(participation.get("nb_slot_paid") for participation in participations)
        if total_slots_paid < 1:
            return FourPadelBooking.PRE_BOOKED.value
        if total_slots_paid < 4:
            return FourPadelBooking.PAYABLE.value
        return FourPadelBooking.COMPLETE.value
    return FourPadelBooking.CANCELLED.value


class FourPadelAPIClient:
    def __init__(self, user: CustomUser = None):
        self.user = user
        self.base_url = settings.FOUR_PADEL["BASE_URL"]
        self.login_url = f"{self.base_url}{settings.FOUR_PADEL['LOGIN_ENDPOINT']}"
        self.google_login_url = f"{self.base_url}{settings.FOUR_PADEL['LOGIN_ENDPOINT']}/google"
        self.field_url = f"{self.base_url}{settings.FOUR_PADEL['FIELD_ENDPOINT']}"
        self.booking_url = settings.FOUR_PADEL['BOOKING_URL']

    SHARED_PARAMS = {
        "appId": 2
    }
    

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

            # Vérifie si l'utilisateur existe localement, sinon le crée
            user, created = CustomUser.objects.get_or_create(
                four_padel_id=data.get('id'),
                defaults={
                    "email": data.get('email')
                }
            )
            user.set_four_padel_token(data.get('access_token'))
            user.save() 

            self.user = user     
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
            
            user, created = CustomUser.objects.get_or_create(
                four_padel_id=data.get('id'),
                defaults={
                    "email": data.get('email')
                }
            )
            user.set_four_padel_token(data.get('access_token'))
            user.save() 

            self.user = user     
            return user                   

        # Lever une exception si la connexion échoue
        response.raise_for_status()

    def get_fields(self, complex_id, date):
        """
        Fetch booking rules with the token. Retry login if token is expired.
        """

        headers = {
            "Authorization": f"Bearer {self.user.get_four_padel_token()}",
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
            response = requests.post(self.field_url, headers=headers, params=params, json=json)
            if response.status_code == 401:  # Token expired or invalid
                self.login()  # Get a new token
                headers = {
                    **headers,
                    "Authorization": f"Bearer {self.user.get_four_padel_token()}",
                }
                response = requests.post(self.field_url, headers=headers, params=params, json=json)
            
            response.raise_for_status()
            data = response.json()

            return self.clean_fields_data(data)
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to fetch booking: {e}")

    def clean_fields_data(self, data):
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
                        "extras": [],   
                    }

                # Ajouter la durée dans la liste des durations
                extra = {
                    "duration": field.get("duration"),
                    "price": field.get("webPrice")
                }
                grouped_data[starting_date]["fields"][field_id]["extras"].append(extra)

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

    def book_field(self, match: Match):
        """
        Fetch booking rules with the token. Retry login if token is expired.
        """

        headers = {
            "Authorization": f"Bearer {self.user.get_four_padel_token()}",
            "accept": "text/plain, */*",
            "content-type": "application/json"
        }

        params = {
            **self.SHARED_PARAMS,
        }

        # Use french tz to get localtz
        paris_tz = pytz.timezone('Europe/Paris')
        start_datetime_local = match.datetime.astimezone(paris_tz)
        end_datetime_local = start_datetime_local + timedelta(minutes=match.duration)

        formatted_start = start_datetime_local.strftime('%Y-%m-%dT%H:%M')
        formatted_end = end_datetime_local.strftime('%Y-%m-%dT%H:%M')

        json = {
            "startingDate": f"{formatted_start}:00.000+00:00",
	        "localStartingDate": f"{formatted_start}:00.000Z",
	        "endingDate": f"{formatted_end}:00.000+00:00",
            "duration": match.duration,
            "capacity": 4,
            "price": match.four_padel_field_price,
            "deposit": 0,
            "center": {
                "id": match.complex.four_padel_id
            },
            "owner": {
                "id": self.user.four_padel_id
            },
            "bookingType": {
                "id": "1"
            },
            "sportType": {
                "id": 3
            },
            "field": {
                "id": match.four_padel_field_id
            },
            "paymentMethod": {
                "id": "2"
            },
            "categoryBooking": {
                "id": 1
            },
            "paidCredit": 0,
            "isChannelWeb": True,
            "channel": 1,
            "promoCode": None,
            "booking_status": "Pending"
        }

        try:
            response = requests.put(self.booking_url, headers=headers, params=params, json=json)
            if response.status_code == 401:  # Token expired or invalid
                self.login()  # Get a new token
                headers = {
                    **headers,
                    "Authorization": f"Bearer {self.user.get_four_padel_token()}",
                }
                response = requests.post(self.booking_url, headers=headers, params=params, json=json)
            
            if response.status_code != 200:
                logger.error(data)

            data = response.json()

            cleaned_data = {
                "id": data.get('id'),
                "payment_link": data.get('paymentLink')
            }
            return cleaned_data

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to book: {e}")

    def get_book_detail(self, pk):
        headers = {
            "accept": "text/plain, */*",
            "content-type": "application/json"
        }

        try:
            response = requests.get(f"{self.booking_url}/{pk}", headers=headers)
            data = response.json()

            logger.info("booking details")
            logger.info(data)

            cleaned_data = self.clean_book_detail_data(data, pk)
            return cleaned_data

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to book: {e}")
        
    def clean_book_detail_data(self, data, pk):
        participations = []

        for participation in data.get("participations"):
            if participation.get('paied') is False:
                continue

            participations.append({
                "id": participation.get('id'),
                "user": CustomUser.objects.filter(four_padel_id=participation.get('userId')).first().pk,
                "nb_slot_paid": participation.get('nbSlotPaid')
            })

        booking_status = get_booking_status(data.get('booking_status'), participations)

        # update match status if necessary
        match = Match.objects.filter(four_padel_booking_id=pk).first()
        if match and not match.is_booked and booking_status == FourPadelBooking.PAYABLE:
            match.is_booked = True
            match.save()


        return {
            "id": data.get('id'),
            "participations": participations,
            "booking_status": booking_status,
            "payment_link": data.get('paymentLink')
        }