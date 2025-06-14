from flask import Blueprint, render_template
from app.models.propiedades import Propiedad
from app import db

propiedades_bp = Blueprint('propiedades', __name__)

@propiedades_bp.route('/propiedades')
def propiedades():
    propiedades = Propiedad.query.all()
    return render_template('propiedades.html', propiedades=propiedades)
