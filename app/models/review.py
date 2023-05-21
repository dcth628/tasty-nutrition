from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)
    star = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    owner = db.relationship('User', back_populates='reviews')

    recipes = db.relationship('Recipe', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "star": self.star,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }
