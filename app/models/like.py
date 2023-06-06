from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    likable_type = db.Column(db.Enum('recipe', 'review', name='likable_type'), nullable=False)
    likable_id = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User', back_populates='likes')

    recipes = db.relationship(
        'Recipe', primaryjoin='and_(Like.likable_type=="recipe", foreign(Like.likable_id)==Recipe.id)')

    reviews = db.relationship(
        'Review', primaryjoin='and_(Like.likable_type=="review", foreign(Like.likable_id)==Review.id)')

    def to_recipe(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_type': self.likable_type,
            'likable_id': self.likable_id,
            'recipe_id': self.recipes.id
        }

    def to_review(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'likable_type': self.likable_type,
            'likable_id': self.likable_id,
            'review_id': self.reviews.id
        }
