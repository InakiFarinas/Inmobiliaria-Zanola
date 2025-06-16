from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_scss import Scss
from flask_migrate import Migrate
from dotenv import load_dotenv

import os
load_dotenv()

app = Flask(__name__)
Scss(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

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

#Añade las rutas al template para que el host pueda renderizarlo
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/propiedades')
def propiedades():
    return render_template('propiedades.html')
