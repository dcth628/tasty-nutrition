from app.models import db, Review, SCHEMA, environment
from sqlalchemy.sql import text

review_1 = Review(
    review = "I like it",
    star = 5,
    user_id = 1,
    recipe_id = 4
)

review_2 = Review(
    review = "Very easy to make",
    star = 4,
    user_id = 2,
    recipe_id = 5
)

review_3 = Review(
    review = "I made this very often. Highly recommend!",
    star = 5,
    user_id = 3,
    recipe_id = 3
)

review_4 = Review(
    review = "Who doesn't like beef!?",
    star = 5,
    user_id = 2,
    recipe_id = 1
)

review_5 = Review(
    review = "Easy snack",
    star = 3,
    user_id = 3,
    recipe_id = 2
)

review_6 = Review(
    review = "Easier way to make the beef",
    star = 5,
    user_id = 3,
    recipe_id = 1
)

def seed_review():
    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.commit()

def undo_review():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(review_1)
        db.session.delete(review_2)
        db.session.delete(review_3)
        db.session.delete(review_4)
        db.session.delete(review_5)
        db.session.delete(review_6)
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
