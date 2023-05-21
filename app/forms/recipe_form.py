from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DecimalField
from wtforms.validators import data_required

class CreateRecipeForm(FlaskForm):
    name = StringField('Recipe Name', validators=[data_required()])
    instruction = StringField('Instructions', validators=[data_required()])
    description = StringField('Description', validators=[data_required()])
    serving = IntegerField('Serving', validators=[data_required()])
    cooktime = IntegerField('Cooking time', validators=[data_required()])
    submit = SubmitField('Submit')
