from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Recipe, Type, Image, Like, Ingredient, IngredientRecipe, Review, Cookbook, RecipeCookbook
from app.models.recipe_type import RecipeType
from app.forms.recipe_form import CreateRecipeForm
from app.forms.image_form import CreateImageForm
from app.forms.review_form import CreateReviewForm
from app.forms.quantity_form import CreateQuantityForm
from app.aws_helpers import ( upload_file_to_s3, get_unique_filename)

recipes_routes = Blueprint('recipes', __name__)

#Get all recipes
@recipes_routes.route('')
def all_recipes():
    recipes = Recipe.query.all()
    return {recipe.id : recipe.to_dict() for recipe in recipes}

#Get all recipes for the current user
@recipes_routes.route('/current')
@login_required
def user_recipes():
    """
    Queries for all recipes for the user and return in a list
    """
    user_id = current_user.get_id()
    recipes = Recipe.query.filter_by(user_id = user_id)
    return {recipe.id: recipe.to_dict() for recipe in recipes}

#Get details of a recipe by the id
@recipes_routes.route('/<int:id>')
def recipe_detail(id):
    recipe = Recipe.query.filter(Recipe.id == id).first()
    if recipe:
        return recipe.to_dict()
    return jsonify({"error": "Recipe not found"}), 404

#Create a recipe
@recipes_routes.route('', methods=['POST'])
@login_required
def create_recipe():
    form = CreateRecipeForm()
    user_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_recipe = Recipe(
            name = form.data['name'],
            description = form.data['description'],
            instruction = form.data['instruction'],
            serving = form.data['serving'],
            cooktime = form.data['cooktime'],
            user_id = user_id
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()

#Edit a recipe
@recipes_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_recipe(id):
    form = CreateRecipeForm()
    recipe = Recipe.query.get(id)
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.data['name']
        description = form.data['description']
        instruction = form.data['instruction']
        serving = form.data['serving']
        cooktime = form.data['cooktime']

        recipe.name = name
        recipe.description = description
        recipe.instruction = instruction
        recipe.serving = serving
        recipe.cooktime = cooktime

        db.session.commit()
        return recipe.to_dict()


#Delete a recipe
@recipes_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404
    db.session.delete(recipe)
    db.session.commit()

    return jsonify({'message':'Sucessfully Deleted'})


#Add an ingredient to a recipe
@recipes_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['POST'])
@login_required
def add_ingred_recipe(recipe_id, ingredient_id):
    recipe = Recipe.query.get(recipe_id)
    ingredient = Ingredient.query.get(ingredient_id)
    form = CreateQuantityForm()

    if not recipe or not ingredient:
        return jsonify({'error': 'Recipe or ingredient not found'}), 404

    recipe_ingred = IngredientRecipe.query.filter_by(
        recipe_id=recipe_id, ingredient_id=ingredient_id
    ).first()

    if recipe_ingred:
        return jsonify({"error": "Ingredient was already added"})

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_ingredient = IngredientRecipe(
            recipe_id = recipe_id,
            ingredient_id = ingredient_id,
            quantity = form.data['quantity']
        )
        db.session.add(new_ingredient)
        db.session.commit()
        return recipe.to_dict()

#Delete an ingredient from a recipe
@recipes_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=["DELETE"])
@login_required
def delete_ingred_recipe(recipe_id, ingredient_id):
    recipe_ingred = IngredientRecipe.query.filter_by(
        recipe_id=recipe_id, ingredient_id=ingredient_id
    ).first()

    if not recipe_ingred:
        return jsonify({"error": "Ingredient was not found"}), 404
    db.session.delete(recipe_ingred)
    db.session.commit()
    return jsonify({'message':'Sucessfully Deleted'})

#Add types to a recipe
@recipes_routes.route('/<int:recipe_id>/types/<int:type_id>', methods=["POST"])
@login_required
def add_type_recipe(recipe_id, type_id):
    recipe = Recipe.query.get(recipe_id)
    type = Type.query.get(type_id)

    if not recipe or not type:
        return jsonify({"error": "Recipe or type not found"}), 404

    recipe_type = RecipeType.query.filter_by(
        recipe_id = recipe_id, type_id = type_id
    ).first()

    if recipe_type:
        return jsonify({"error": "Type was already added"})

    new_type = RecipeType(
        recipe_id = recipe_id,
        type_id = type_id
    )

    db.session.add(new_type)
    db.session.commit()
    return new_type.to_dict()

#Delete type from a recipe
@recipes_routes.route('/<int:recipe_id>/types/<int:type_id>', methods=["DELETE"])
@login_required
def delete_type_recipe(recipe_id, type_id):
    recipe_type = RecipeType.query.filter_by(
        recipe_id = recipe_id, type_id = type_id
    ).first()

    if not recipe_type:
        return jsonify({"error":"Type was not found"}), 404
    db.session.delete(recipe_type)
    db.session.commit()
    return jsonify({'message':'Sucessfully Deleted'})


#Add an image to a recipe
@recipes_routes.route('/<int:recipe_id>/images/', methods=["POST"])
@login_required
def add_image(recipe_id):
    form = CreateImageForm()
    user_id = current_user.get_id()
    recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
    if not recipe:
        return jsonify({"error":"Recipe not found"}), 404

    form['csrf_token'].data = request.cookies['csrf_token']
    if form:
        image = form.data['image']
        print(image,' !!!!!!!!!!!!!!!!!')
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return jsonify({"error": "no url"}), 404
        url = upload['url']
        new_image = Image(
            url = url,
            user_id = user_id,
            recipe_id = recipe_id
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    return {"error":"can't read"}


#Delete an image
@recipes_routes.route('/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
    image = Image.query.get(image_id)
    if not image:
        return jsonify({"error":"Image not found"}), 404
    db.session.delete(image)
    db.session.commit()

    return jsonify({'message':'Sucessfully Deleted'})

#Create a review
@recipes_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    user_id = current_user.get_id()
    recipe = Recipe.query.get(id)
    form = CreateReviewForm()

    if not recipe:
        return jsonify({"error":"Recipe not found"}), 404

    new_review = Review.query.filter_by(
        recipe_id = id, user_id = user_id
    ).first()

    if new_review:
        return jsonify({"error": "Review was already exist"})
    else:
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_review = Review(
                review = form.data['review'],
                star = form.data['star'],
                recipe_id = id,
                user_id = user_id
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict()

#Add recipe to a cookbook
@recipes_routes.route('/<int:recipe_id>/cookbooks/<int:cookbook_id>', methods=['GET', 'POST'])
@login_required
def add_to_cookbook(recipe_id, cookbook_id):
    recipe = Recipe.query.get(recipe_id)
    cookbook = Cookbook.query.get(cookbook_id)

    if not recipe or not cookbook:
        return jsonify({"error": "Recipe or cookbook not found"}), 404

    recipe_cookbook = RecipeCookbook.query.filter_by(
        recipe_id = recipe_id, cookbook_id = cookbook_id
        ).first()

    if recipe_cookbook and request.method == "GET":
        return recipe_cookbook.to_dict()

    if recipe_cookbook and request.method == "POST":
        return jsonify({"error": "Recipe already added in the cookbook"})

    recipe_cookbook = RecipeCookbook(
        recipe_id = recipe_id,
        cookbook_id = cookbook_id
    )

    db.session.add(recipe_cookbook)
    db.session.commit()
    return recipe_cookbook.to_dict()

#Delete a recipe from cookbook
@recipes_routes.route('/<int:recipe_id>/cookbooks/<int:cookbook_id>', methods=['DELETE'])
@login_required
def delete_recipe_cookbook(recipe_id, cookbook_id):
    recipe_cookbook = RecipeCookbook.query.filter_by(
        recipe_id = recipe_id, cookbook_id = cookbook_id
    ).first()

    if not recipe_cookbook:
        return jsonify({"error":"Recipe was not found"}), 404
    db.session.delete(recipe_cookbook)
    db.session.commit()
    return jsonify({'message':'Sucessfully Deleted'})
