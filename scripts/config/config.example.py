import mysql.connector

db = mysql.connector.connect(
    host="HOST",
    user="USERNAME",
    password="PASSWORD",
    db="DB"
)

cursor = db.cursor()
