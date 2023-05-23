from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import data_required

class CreateImageForm(FlaskForm):
    url = StringField('Image Url', validators=[data_required()])
    submit = SubmitField('Submit')
