from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    imageable_type = db.Column(db.Enum("recipe", 'ingredient', name='imageable_type'), nullable=False)
    imageable_id = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User', back_populates='images')

    ingredients = db.relationship('Ingredient', primaryjoin='and_(Image.imageable_type="ingredient", foregin(Image.imageable_id)==Ingredient.id)')

    recipes = db.relationship('Recipe', primaryjoin='and_(Image.imageable_type="recipe", foregin(Image.imageable_id)==Recipe.id)')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'imageable_type': self.imageable_type,
            'imageable_id': self.imageable_id,
        }
