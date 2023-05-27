from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import data_required

class CreateQuantityForm(FlaskForm):
    quantity = IntegerField('Quantity', validators=[data_required()])
    submit = SubmitField('Submit')
