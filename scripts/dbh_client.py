from enum import Enum
import requests


class Semester(Enum):
    SPRING = 1
    AUTUMN = 3


class FilterType(Enum):
    TOP = "top"
    ALL = "all"
    ITEM = "item"
    BETWEEN = "between"
    LIKE = "like"
    LESSTHAN = "lessthan"


class DBH_CLIENT:

    session = None

    url = "https://api.nsd.no/dbhapitjener/Tabeller/hentJSONTabellData"
    api_version = 1
    status_line = False
    code_text = False
    decimal_separator = "."
    institution_id = 1150  # NTNU
    limit = "*"

    def __init__(self):
        self.session = requests.session()
        self.session.headers.update({"Content-type": "application/json"})

    @staticmethod
    def create_filter(name: str, filter_type: FilterType, values):
        return {
            "variabel": name,
            "selection": {"filter": filter_type.value, "values": values, "exclude": [""]},
        }

    def query(self, table_id: int, group_by, sort_by, variables, filters):
        query = {
            "tabell_id": table_id,
            "api_versjon": self.api_version,
            "statuslinje": "J" if self.status_line else "N",
            "begrensning": self.limit,
            "kodetekst": "J" if self.code_text else "N",
            "desimal_separator": self.decimal_separator,
            "groupBy": group_by,
            "sortBy": sort_by,
            "variabler": variables,
            "filter": filters,
        }

        print("\nFETCHING DATA FROM DBH")

        try:
            response = self.session.post(self.url, json=query)
            print(f"STATUS CODE: {response.status_code}")

            results = response.json()
        except Exception as e:
            results = []
            print("ERROR: Could not fetch data from DBH or convert it to JSON")
            print(e)

        return results
