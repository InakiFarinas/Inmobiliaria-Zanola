from flask import Blueprint, render_template
from app.models.propiedades import Propiedad

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Opcional: mostrar solo propiedades destacadas
    propiedades = Propiedad.query.limit(6).all()
    return render_template('index.html', propiedades=propiedades)