from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import data_required

class CreateReviewForm(FlaskForm):
    review = StringField('Review', validators=[data_required()])
    star = IntegerField('Star', validators=[data_required()])
    submit = SubmitField('Submit')
