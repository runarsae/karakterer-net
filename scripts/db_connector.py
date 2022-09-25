import mysql.connector as mysql
from decouple import config

DB_HOST = config('DB_HOST')
DB_NAME = config('DB_NAME')
DB_USER = config('DB_USER')
DB_PASSWORD = config('DB_PASSWORD')


class DbConnector:

    def __init__(self,
                 HOST=DB_HOST,
                 DATABASE=DB_NAME,
                 USER=DB_USER,
                 PASSWORD=DB_PASSWORD):

        # Connect to the database
        try:
            self.db_connection = mysql.connect(
                host=HOST,
                database=DATABASE,
                user=USER,
                password=PASSWORD,
                port=3306)
        except Exception as e:
            print("ERROR: Failed to connect to db:", e)

        # Get the database cursor
        self.cursor = self.db_connection.cursor()

        print("Connected to:", self.db_connection.get_server_info())

        # Get database information
        self.cursor.execute("select database();")
        database_name = self.cursor.fetchone()
        print("You are connected to the database:", database_name)
        print("-----------------------------------------------\n")

    def close_connection(self):
        # Close the cursor
        self.cursor.close()

        # Close the DB connection
        self.db_connection.close()

        print("\n-----------------------------------------------")
        print("Connection to %s is closed" %
              self.db_connection.get_server_info())
