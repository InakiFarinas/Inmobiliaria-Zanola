from flask import Blueprint, render_template
from app.models.propiedades import Propiedad
from app import db

propiedades_bp = Blueprint('propiedades', __name__)

@propiedades_bp.route('/')
def index():
    propiedades = Propiedad.query.all()
    return render_template('index.html', propiedades=propiedades)

@propiedades_bp.route('/propiedad/<int:id>')
def detalle(id):
    propiedad = Propiedad.query.get_or_404(id)
    return render_template('detalle.html', propiedad=propiedad)