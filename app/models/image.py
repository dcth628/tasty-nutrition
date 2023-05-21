from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    owner = db.relationship('User', back_populates='images')

    recipes = db.relationship('Recipe', back_populates='images')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipe_id': [recipe.id for recipe in self.recipes] if self.recipes else []
        }
