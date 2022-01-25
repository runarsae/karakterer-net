from config.config import db, cursor
from dbh_client import DBH_CLIENT, FilterType


class Courses:
    client = None

    institution_id = 1150  # NTNU
    table_id = 208  # Courses
    group_by = []
    sort_by = ["Emnekode", "Årstall", "Semester", "Emnenavn"]
    variabler = ["Årstall", "Semester", "Emnekode", "Emnenavn"]
    filters = [
        DBH_CLIENT.create_filter(
            "Institusjonskode", FilterType.ITEM, [institution_id]),
        DBH_CLIENT.create_filter("Årstall", FilterType.ITEM, ["*"]),
        DBH_CLIENT.create_filter(
            "Semester", FilterType.ITEM, ["*"])
    ]

    def __init__(self):
        self.client = DBH_CLIENT()

    def fetch_courses(self):
        print(f"FETCHING COURSE DATA")

        return self.client.query(
            self.table_id, self.group_by, self.sort_by, self.variabler, self.filters)

    def insert_course_data(self, results):
        courses = {}

        if len(results) == 0:
            return

        for result in results:
            code = result.get("Emnekode").rsplit("-", 1)[0]
            name = result.get("Emnenavn")

            if name:
                courses[code] = name

        for code, name in courses.items():
            # Insert/update course data
            sql = """
                INSERT INTO courses
                    (course, name)
                VALUES
                    (%s, %s)
                ON DUPLICATE KEY UPDATE
                    name=%s
            """

            val = (code, name, name)

            cursor.execute(sql, val)

        db.commit()

        print(f"\nINSERTED/UPDATED COURSE NAMES")


if __name__ == '__main__':
    courses = Courses()
    result = courses.fetch_courses()
    courses.insert_course_data(result)
