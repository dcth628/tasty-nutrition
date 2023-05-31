from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from flask_wtf.file import FileRequired, FileAllowed, FileField
from wtforms.validators import data_required
from app.aws_helpers import ALLOWED_EXTENSIONS

class CreateImageForm(FlaskForm):
    image = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')
