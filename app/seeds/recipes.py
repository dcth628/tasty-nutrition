from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

recipe_1 = Recipe(
    name='Roast beef',
    description='Roast beef is a classic dish made from a beef roast that is seasoned, seared, and then cooked in the oven until tender and flavorful.',
    instruction='Preheat your oven to 325°F\\Take the beef roast out of the refrigerator and let it sit at room temperature for about 30 minutes.\\Pat the roast dry with paper towels, then season it generously with salt and pepper on all sides.\\Slice the roast beef against the grain into thin slices. Serve it with your favorite side dishes and enjoy!',
    serving=2,
    cooktime=50,
    user_id=1,
)

recipe_2 = Recipe(
    name='Strawberry jam',
    description='Strawberry jam is a delicious sweet spread made from fresh strawberries, sugar, and lemon juice.',
    instruction='Place the strawberries in a large pot or saucepan and mash them slightly with a potato masher or fork to release their juices.\\Add the sugar and lemon juice to the pot and stir well to combine.\\Once the jam has thickened, remove the pot from heat and skim off any foam that may have formed on the surface.',
    serving=5,
    cooktime=45,
    user_id=1,
)

recipe_3 = Recipe(
    name='Garlic Sautéed Spinach',
    description='This recipe can be easily customized by adding other ingredients such as diced tomatoes, onions, or a sprinkle of grated Parmesan cheese for added flavor. Enjoy your flavorful and nutritious garlic sautéed spinach!',
    instruction='Rinse the spinach leaves thoroughly under cold water to remove any dirt or debris. Pat them dry or use a salad spinner to remove excess moisture.\\Heat olive oil in a large skillet or pan over medium heat.\\Add the minced garlic to the pan and sauté for about 1 minute until fragrant, being careful not to burn it.',
    serving=2,
    cooktime=25,
    user_id=2,
)

recipe_4 = Recipe(
    name='Stovetop Oatmeal',
    description='Oatmeal is a versatile and nutritious breakfast dish made from oats that have been cooked with water or milk. It is a popular choice due to its simplicity, health benefits, and the ability to customize it with various toppings and flavors.',
    instruction='In a saucepan, combine the rolled oats, water or milk, and a pinch of salt.\\Place the saucepan over medium heat and bring the mixture to a gentle boil.\\Reduce the heat to low and simmer the oatmeal, stirring occasionally, for about 5 to 7 minutes or until it reaches your desired consistency. If you prefer a thicker oatmeal, cook it for a bit longer.',
    serving=2,
    cooktime=15,
    user_id=3,
)

recipe_5 = Recipe(
    name='Cheese Cracker',
    description='Cheese crackers are savory and crispy baked snacks that are made with a combination of cheese, flour, butter, and seasonings.',
    instruction='In a food processor, combine the flour, grated cheddar cheese, salt, and paprika (if using). Pulse a few times to mix the ingredients.\\Add the cold butter pieces to the food processor and pulse until the mixture resembles coarse crumbs.\\Gradually add the ice water, one tablespoon at a time, while pulsing the food processor. Continue until the dough comes together and forms a ball. You may not need to use all of the water.',
    serving=1,
    cooktime=10,
    user_id=1,
)


def seed_recipes():
    db.session.add(recipe_1)
    db.session.add(recipe_2)
    db.session.add(recipe_3)
    db.session.add(recipe_4)
    db.session.add(recipe_5)
    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(recipe_1)
        db.session.delete(recipe_1)
        db.session.delete(recipe_1)
        db.session.delete(recipe_1)
        db.session.delete(recipe_1)
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
