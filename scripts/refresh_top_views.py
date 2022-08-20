from config.config import db, cursor


def refresh_top_views():
    # Call SQL procedure
    sql = "CALL refresh_top_views()"
    cursor.execute(sql)
    db.commit()


if __name__ == '__main__':
    refresh_top_views()
