from config.config import db, cursor


def refresh_top_visits():
    # Call SQL procedure
    sql = "CALL refresh_top_visits()"
    cursor.execute(sql)
    db.commit()


if __name__ == '__main__':
    refresh_top_visits()
