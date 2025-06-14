import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'clave-secreta')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql://usuario:password@localhost/inmobiliaria_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False