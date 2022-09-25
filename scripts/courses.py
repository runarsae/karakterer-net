from dbh_client import DBHClient, FilterType
from db_connector import DbConnector


class Courses:

    institution_id = 1150  # NTNU
    table_id = 208  # Courses
    group_by = []
    sort_by = ["Emnekode", "Årstall", "Semester", "Emnenavn"]
    variables = ["Årstall", "Semester", "Emnekode", "Emnenavn"]
    filters = [
        DBHClient.create_filter(
            "Institusjonskode", FilterType.ITEM, [institution_id]),
        DBHClient.create_filter(
            "Årstall", FilterType.ITEM, ["*"]),
        DBHClient.create_filter(
            "Semester", FilterType.ITEM, ["*"])
    ]

    def __init__(self):
        self.db_connector = DbConnector()
        self.db_connection = self.db_connector.db_connection
        self.db_cursor = self.db_connector.cursor

        self.dbh_client = DBHClient()

    def fetch_courses(self):
        print(f"FETCHING COURSE DATA")

        return self.dbh_client.query(
            self.table_id, self.group_by, self.sort_by,
            self.variables, self.filters
        )

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

            self.db_cursor.execute(sql, val)

        self.db_connection.commit()

        print(f"\nINSERTED/UPDATED COURSE NAMES")

    def refresh_courses_with_grades(self):
        sql = "TRUNCATE TABLE courses_with_grades"
        self.db_cursor.execute(sql)

        sql = """
            INSERT INTO courses_with_grades
                (SELECT DISTINCT course, name FROM courses NATURAL JOIN grades)
            """
        self.db_cursor.execute(sql)
        self.db_connection.commit()

        print(f"\nREFRESHED COURSES WITH GRADES")


if __name__ == '__main__':
    courses = Courses()

    result = courses.fetch_courses()
    courses.insert_course_data(result)

    courses.refresh_courses_with_grades()

    courses.db_connector.close_connection()
