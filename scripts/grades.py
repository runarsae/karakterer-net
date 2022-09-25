from pprint import pprint
import sys
from dbh_client import DBHClient, FilterType, Semester
from db_connector import DbConnector


class Grades:

    institution_id = 1150  # NTNU
    table_id = 308  # Grades
    group_by = ["Emnekode", "Karakter"]
    sort_by = ["Emnekode", "Karakter"]
    variables = ["*"]

    def __init__(self):
        self.db_connector = DbConnector()
        self.db_connection = self.db_connector.db_connection
        self.db_cursor = self.db_connector.cursor

        self.dbh_client = DBHClient()

    def get_filters(self, year: int, semester: Semester):
        return [
            DBHClient.create_filter(
                "Institusjonskode", FilterType.ITEM, [self.institution_id]),
            DBHClient.create_filter(
                "Årstall", FilterType.ITEM, [year]),
            DBHClient.create_filter(
                "Semester", FilterType.ITEM, [semester.value])
        ]

    def fetch_grades(self, year: int, semester: Semester):
        print(f"FETCHING DATA FOR {semester.name} {year}")

        return self.dbh_client.query(
            self.table_id, self.group_by, self.sort_by,
            self.variables, self.get_filters(year, semester)
        )

    def get_grade(self, grade: str, grades):
        grade_dict = grades.get(grade, {})
        total = grade_dict.get("total", 0)
        men = grade_dict.get("male", 0)
        women = grade_dict.get("female", 0)

        return total, men, women

    def insert_grade_data(self, results, year: int, semester: Semester):
        grades = {}

        if len(results) == 0:
            return

        for result in results:
            code = result.get("Emnekode").rsplit("-", 1)[0]
            grade = result.get("Karakter")
            candidates = int(result.get("Antall kandidater totalt"))
            candidates_male = int(result.get("Antall kandidater menn"))
            candidates_female = int(result.get("Antall kandidater kvinner"))

            if candidates != 0:
                if code not in grades:
                    grades[code] = {}

                if grade not in grades[code]:
                    grades[code][grade] = {
                        "total": candidates,
                        "male": candidates_male,
                        "female": candidates_female
                    }
                else:
                    print(f"""\n
                        ACTION REQUIRED for {code} - grade {grade}:
                        Found more than a single grade entry
                        """)

                    print(f"""
                        Tried to insert {candidates} candidates for grade
                        {grade}, but already found an entry:
                        """)

                    print(f"{grade} - {grades[code][grade]['total']}")

                    print(f"""\n
                        0: Choose already inserted value
                            ({grades[code][grade]['total']})\n
                        1: Choose new value ({candidates})\n
                        2: Combine the values
                            (total {grades[code][grade]['total'] + candidates})
                        """)

                    choice = int(input("\nEnter a number: "))

                    if (choice == 1):
                        grades[code][grade] = {
                            "total": candidates,
                            "male": candidates_male,
                            "female": candidates_female
                        }
                    elif (choice == 2):
                        grades[code][grade] = {
                            "total": grades[code][grade]["total"]
                            + candidates,
                            "male": grades[code][grade]["male"]
                            + candidates_male,
                            "female": grades[code][grade]["female"]
                            + candidates_female
                        }

        for code, course_grades in grades.items():
            a, a_male, a_female = self.get_grade("A", course_grades)
            b, b_male, b_female = self.get_grade("B", course_grades)
            c, c_male, c_female = self.get_grade("C", course_grades)
            d, d_male, d_female = self.get_grade("D", course_grades)
            e, e_male, e_female = self.get_grade("E", course_grades)
            f, f_male, f_female = self.get_grade("F", course_grades)
            g, g_male, g_female = self.get_grade("G", course_grades)
            h, h_male, h_female = self.get_grade("H", course_grades)

            has_genders = False
            is_pass_fail = any(map(lambda number: number != 0, [g, h]))
            is_graded = any(
                map(lambda number: number != 0, [a, b, c, d, e, f]))

            if not (is_pass_fail or is_graded):
                continue

            if is_pass_fail and is_graded:
                print(f"""\n
                    ACTION REQUIRED for {code}:
                    Course is both pass/fail and graded by letters
                    """)
                pprint(course_grades)
                print("\n0: SKIP\n1: Choose pass/fail\n2: Choose grades")
                choice = int(input("\nEnter a number: "))

                if (choice == 1):
                    is_graded = False
                elif (choice == 2):
                    is_pass_fail = False
                else:
                    continue

            if is_graded:
                g = g_male = g_female = h = h_male = h_female = None

                students = a + b + c + d + e + f
                males = a_male + b_male + c_male + d_male + e_male + f_male
                females = (
                    a_female + b_female +
                    c_female + d_female +
                    e_female + f_female
                )

                if males + females == students:
                    has_genders = True
                else:
                    males = females = a_male = a_female = b_male = b_female = \
                        c_male = c_female = d_male = d_female = e_male = \
                        e_female = f_male = f_female = None
            else:
                a = a_male = a_female = b = b_male = b_female = c = \
                    c_male = c_female = d = d_male = d_female = e = \
                    e_male = e_female = f = f_male = f_female = None

                students = g + h
                males = g_male + h_male
                females = g_female + h_female

                if males + females == students:
                    has_genders = True
                else:
                    males = females = g_male = g_female = h_male = h_female = \
                        None

            sql = """
                INSERT INTO grades (
                    course, year, semester, is_graded, has_genders,
                    students, males, females,
                    a, a_male, a_female, b, b_male, b_female,
                    c, c_male, c_female, d, d_male, d_female,
                    e, e_male, e_female, f, f_male, f_female,
                    g, g_male, g_female, h, h_male, h_female
                ) VALUES (
                    %s, %s, %s, %s, %s,
                    %s, %s, %s,
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s
                ) ON DUPLICATE KEY UPDATE
                    is_graded=%s, has_genders=%s,
                    students=%s, males=%s, females=%s,
                    a=%s, a_male=%s, a_female=%s, b=%s, b_male=%s, b_female=%s,
                    c=%s, c_male=%s, c_female=%s, d=%s, d_male=%s, d_female=%s,
                    e=%s, e_male=%s, e_female=%s, f=%s, f_male=%s, f_female=%s,
                    g=%s, g_male=%s, g_female=%s, h=%s, h_male=%s, h_female=%s
            """

            val = (
                code, year, semester.value, int(is_graded), int(has_genders),
                students, males, females,
                a, a_male, a_female, b, b_male, b_female,
                c, c_male, c_female, d, d_male, d_female,
                e, e_male, e_female, f, f_male, f_female,
                g, g_male, g_female, h, h_male, h_female,
                int(is_graded), int(has_genders),
                students, males, females,
                a, a_male, a_female, b, b_male, b_female,
                c, c_male, c_female, d, d_male, d_female,
                e, e_male, e_female, f, f_male, f_female,
                g, g_male, g_female, h, h_male, h_female
            )

            self.db_cursor.execute(sql, val)

        self.db_connection.commit()

        print(f"\nINSERTED/UPDATED COURSE GRADES FOR {semester.name} {year}")


if __name__ == '__main__':
    try:
        grades = Grades()

        year = None
        semester = None

        args = sys.argv[1:]

        if len(args) == 4:
            if args[0] == '-year':
                year = int(args[1])

            if args[2] == '-semester':
                semester = Semester[args[3].upper()]

        if year is None or semester is None:
            print('Could not get year/semester combination from arguments')

        result = grades.fetch_grades(year, semester)
        grades.insert_grade_data(result, year, semester)
    finally:
        grades.db_connector.close_connection()
