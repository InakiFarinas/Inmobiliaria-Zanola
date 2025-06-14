from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes.main import main_bp
    app.register_blueprint(main_bp)
    from app.routes.propiedades import propiedades_bp
    app.register_blueprint(propiedades_bp)
    from app.routes.contacto import contacto_bp
    app.register_blueprint(contacto_bp)

    return app
