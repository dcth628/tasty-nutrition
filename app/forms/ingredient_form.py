from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DecimalField
from wtforms.validators import data_required

class CreateIngredientForm(FlaskForm):
    name = StringField('Ingredient Name', validators=[data_required()])
    img = StringField('Image Url')
    type = StringField('Type of Ingredient', validators=[data_required()])
    measurement = IntegerField('Ingredient Measurement', validators=[data_required()])
    calorie = DecimalField('Calorie', validators=[data_required()])
    carb = DecimalField('Carb', validators=[data_required()])
    protein = DecimalField('Protein', validators=[data_required()])
    fat = DecimalField('Fat', validators=[data_required()])
    submit = SubmitField('Submit')
