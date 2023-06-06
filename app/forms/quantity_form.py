from flask_wtf import FlaskForm
from wtforms import DecimalField, IntegerField, SubmitField
from wtforms.validators import data_required

class CreateQuantityForm(FlaskForm):
    quantity = DecimalField('Quantity', validators=[data_required()])
    submit = SubmitField('Submit')
