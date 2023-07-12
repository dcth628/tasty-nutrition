from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

recipe_1 = Recipe(
    name='Roast beef',
    description='Learn how to cook roast beef with this easy, weight-based formula guide for perfect rare roast beef every time. This is your basic everyday eye round roast cooked to rare or medium-rare. Serve it to family or company. Slice thinly and serve with gravy, mashed potatoes, salad, and veggie of choice. You can add sauteed mushrooms to your favorite canned or jarred beef gravy. Be sure to stir in juices from meat before serving gravy.',
    instruction='Preheat oven to 375 degrees F (190 degrees C).\\Make sure roast is at room temperature. Tie roast at 3-inch intervals with cotton twine; this helps it from drying out and allows it to cook more evenly. Place roast on a rack in a baking pan.\\Mix together salt, garlic powder, and pepper in a small bowl. Rub seasoning mixture into the meat.\\Place in the preheated oven and roast for 60 minutes, or 20 minutes per pound if your roast is larger or smaller. An instant-read thermometer inserted into the center should read 120 to 125 degrees F (49 to 52 degrees C).\\Remove from the oven and transfer to a cutting board. Cover loosely with foil, and let rest so juices can redistribute, 15 to 20 minutes.\\Slice and serve.',
    serving=2,
    cooktime=50,
    user_id=1,
)

recipe_2 = Recipe(
    name='Strawberry jam',
    description='This strawberry jam recipe is by far the easiest recipe I have found for strawberry jam without using pectin. The jam is soft, spreadable, and delicious.',
    instruction='Crush strawberries in a wide bowl in batches until you have 4 cups of mashed berries.\\Combine mashed strawberries, sugar, and lemon juice in a heavy-bottomed saucepan; stir over low heat until sugar is dissolved. Increase heat to high, and bring the mixture to a full rolling boil. Continue to boil, stirring often, until the mixture reaches 220 degrees F (105 degrees C).\\Check doneness after 10 to 15 minutes by dropping a small spoonful of jam onto a frozen plate. Let sit for 1 to 2 minutes; if jam appears to gel, it is ready. Continue cooking if jam appears thin and runny.\\Transfer jam into hot sterile jars, filling to within 1/4 inch of the top. Top with lids and screw rings on tightly.\\Place a rack in the bottom of a large stockpot and fill it halfway with water. Bring to a boil and lower jars 2 inches apart into the boiling water using a holder. Pour in more boiling water to cover jars by at least 1 inch. Bring to a rolling boil, cover, and process for 10 minutes. Remove the jars from the stockpot and let rest, several inches apart, for 12 to 24 hours. Store in a cool, dark area.',
    serving=5,
    cooktime=45,
    user_id=1,
)

recipe_3 = Recipe(
    name='Garlic Sautéed Spinach',
    description='This recipe can be easily customized by adding other ingredients such as diced tomatoes, onions, or a sprinkle of grated Parmesan cheese for added flavor. Enjoy your flavorful and nutritious garlic sautéed spinach!',
    instruction="Rinse the spinach well in cold water to make sure it's very clean. Spin it dry in a salad spinner, leaving just a little water clinging to the leaves.\\In a very large pot or Dutch oven, heat the olive oil and saute the garlic over medium heat for about 1 minute, but not until it's browned. Add all the spinach, the salt, and pepper to the pot, toss it with the garlic and oil, cover the pot, and cook it for 2 minutes. Uncover the pot, turn the heat on high, and cook the spinach for another minute, stirring with a wooden spoon, until all the spinach is wilted. Using a slotted spoon, lift the spinach to a serving bowl and top with the butter, a squeeze of lemon, and a sprinkling of sea or kosher salt. Serve hot.",
    serving=6,
    cooktime=10,
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
    description='Light, crunchy, and savory cheese crackers that have a bit of a kick. Easy recipe with minimal ingredients. Add 4 tablespoons sesame seeds to the batter before kneading for a tasty option. Also, a fun recipe for kids to help with.',
    instruction='Preheat the oven to 300 degrees F (150 degrees C).\\Combine flour, salt, and red pepper flakes in a large bowl; add Cheddar cheese and toss until cheese is coated. Pour in melted butter; stir until mixture is moist and crumbly. Add rice cereal and knead by hand until dough is well-blended.\\Roll dough into 1/2-inch balls; arrange on a baking sheet. Flatten each ball with a fork.\\Bake in the preheated oven until light and crispy, about 30 minutes.',
    serving=5,
    cooktime=45,
    user_id=2,
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
