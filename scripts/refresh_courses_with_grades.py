from config.config import db, cursor


def refresh_courses_with_grades():
    sql = "CALL refresh_courses_with_grades()"
    cursor.execute(sql)
    db.commit()

    print(f"\nREFRESHED COURSES WITH GRADES")


if __name__ == '__main__':
    refresh_courses_with_grades()
