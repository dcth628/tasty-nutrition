from app.models import db, Image, SCHEMA, environment
from sqlalchemy.sql import text

image_1 = Image(
    image="https://res.cloudinary.com/ddxewbhmy/image/upload/v1684732197/download_2_jt2gqy.jpg",
    recipe_id = 1,
    user_id = 1
)

image_2 = Image(
    image="https://res.cloudinary.com/ddxewbhmy/image/upload/v1684732265/download_3_fbdfpe.jpg",
    recipe_id = 2,
    user_id= 1
)

image_3 = Image(
    image="https://res.cloudinary.com/ddxewbhmy/image/upload/v1684732316/download_4_wd8tm5.jpg",
    recipe_id = 3,
    user_id= 2
)

image_4 = Image(
    image="https://res.cloudinary.com/ddxewbhmy/image/upload/v1684732367/perfect-stovetop-oatmeal-photo_yptnvn.webp",
    recipe_id = 4,
    user_id= 3
)

image_5 = Image(
    image="https://res.cloudinary.com/ddxewbhmy/image/upload/v1684732433/download_5_ntut4j.jpg",
    recipe_id = 5,
    user_id= 1
)

def seed_images():
    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.add(image_4)
    db.session.add(image_5)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(image_1)
        db.session.delete(image_2)
        db.session.delete(image_3)
        db.session.delete(image_4)
        db.session.delete(image_5)
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
