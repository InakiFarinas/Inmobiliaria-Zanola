from flask import Blueprint, render_template, request, flash, redirect, url_for

contacto_bp = Blueprint('contacto', __name__)

@contacto_bp.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        # Aquí procesas el formulario (puedes agregar lógica de envío de email, etc.)
        flash('¡Tu consulta fue enviada con éxito!', 'success')
        return redirect(url_for('contacto.contacto'))
    return render_template('contacto.html')