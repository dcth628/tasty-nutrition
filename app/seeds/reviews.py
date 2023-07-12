from app.models import db, Review, SCHEMA, environment
from sqlalchemy.sql import text

review_1 = Review(
    review = "Oat groats are the whole oat, not steel cut – they cut up oat groats to make steel cut oats. Oat groats fill you up more than any other kind in my opinion. I cook them for 2 hours and have forgotten and they’ve cooked even longer and have been fine",
    star = 4,
    user_id = 1,
    recipe_id = 4
)

review_2 = Review(
    review = "I made this recipe for a crowd of people who all loved them. I used the other reviewers suggestions for substitute ingredients I didn't have to hand: oil instead of butter, 1/4 tsp Cayenne in place of Chilli flakes & crushed potato chips instead of Rice Cereal. I'd add more Chilli or Cayenne next time as I like more zing but will def add this to the snacks menu at ours.",
    star = 4,
    user_id = 2,
    recipe_id = 5
)

review_3 = Review(
    review = "Just made this. I add chill flakes to the sauté garlic.used pre washed spinach. Used a turn of fresh pepper and salt. Add the unsalted butter left out the lemon. Came out really good.",
    star = 5,
    user_id = 3,
    recipe_id = 3
)

review_4 = Review(
    review = "I added cut up red potatoes, carrots& onion to the Pyrex under the roast and all the drippings made them the BEST roasted veggies I’ve ever had! The roast was yummy too!",
    star = 5,
    user_id = 2,
    recipe_id = 1
)

review_5 = Review(
    review = "My grandmother roasted beef this way and it was fantastic. I do the same and it works great. The key is to place the lower rack with the pan just under the roast so that it's just a few inches away. A elevated rack in a pan has the same effect.",
    star = 4,
    user_id = 3,
    recipe_id = 1
)

review_6 = Review(
    review = "I am only giving this 3 stars because I feel the instructions are lacking for those who have never made jam. I was left with a lot of questions and had to find the answers elsewhere.",
    star = 3,
    user_id = 3,
    recipe_id = 2
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
