const LOAD_RECIPE = 'recipe/LOAD_RECIPE'
const GETONE_RECIPE = 'recipe/GETONE_RECIPE'
const CREATE_RECIPE = 'recipe/CREATE_RECIPE'
const EDIT_RECIPE = 'recipe/EDIT_RECIPE'
const REMOVE_RECIPE = 'recipe/REMOVE_RECIPE'
const ADD_INGREDIENT = 'recipe/ADD_INGREDIENT'
const REMOVE_INGREDIENT = 'recipe/REMOVE_INGREDIENT'

const load = (recipe) => ({
    type: LOAD_RECIPE,
    recipe
})

const getone = (recipe) => ({
    type: GETONE_RECIPE,
    recipe
})

const create = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
})

const edit = (recipe) => ({
    type: EDIT_RECIPE,
    recipe
})

const remove = (recipeId) => ({
    type: REMOVE_RECIPE,
    recipeId
})

const addIngred = (recipeId, ingredientId, quantity) => ({
    type: ADD_INGREDIENT,
    recipeId, ingredientId, quantity
})

const removeIngred = (ingredientRecipeId) => ({
    type: REMOVE_INGREDIENT,
    ingredientRecipeId
})

export const getAllRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes')

    if (response.ok) {
        const recipes = await response.json();
        dispatch(load(recipes))
        return recipes
    };
};

export const currentUserRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes/current')

    if (response.ok) {
        const recipes = await response.json();
        dispatch(load(recipes));
        return recipes
    };
};

export const getRecipeDetail = (recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}`)

    if (response.ok) {
        const recipe = await response.json();
        dispatch(getone(recipe));
        return recipe
    };
};

export const createRecipe = (recipe) => async (dispatch) => {
    const { name, description, instruction, serving, cooktime } = recipe;

    const response = await fetch('/api/recipes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name, description, instruction, serving, cooktime
        })
    });

    if (response.ok) {
        const new_recipe = await response.json();
        dispatch(create(new_recipe));
        return new_recipe
    };
};

export const editRecipe = (recipe) => async (dispatch) => {
    const { id, name, description, instruction, serving, cooktime } = recipe;

    const response = await fetch(`/api/recipes/${recipe.id}/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            name, description, instruction, serving, cooktime
        })
    });

    if (response.ok) {
        const recipe = await response.json();
        dispatch(edit(recipe));
        return recipe
    };
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/`, {
        method: "DELETE"
    });

    if (response.ok) {
        const recipe = await response.json();
        dispatch(remove(recipeId));
        return recipe
    }
}

export const addIngredientRecipe = (ingredientArr, recipeId) => async (dispatch) => {
    console.log(ingredientArr,'ingredient array')
    ingredientArr.forEach(async (ingredient) =>{
        const response = await fetch(`/api/recipes/${recipeId}/ingredients/${ingredient.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipe_id: recipeId,
                ingredient_id : ingredient.id,
                quantity: Number(ingredient.quantity)
            })
        });
        if (response.ok) {
            const ingredient = response.json();
            dispatch(addIngred(ingredient));
            return ingredient
        };
    })
};

export const deleteIngredientRecipe = (ingredientRecipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/ingredients/${ingredientRecipeId}`, {
        method:"DELETE"
    });
    if (response.ok) {
        const ingredient = await response.json()
        dispatch(removeIngred(ingredientRecipeId))
        return ingredient
    };
};


const initialState = {}

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RECIPE:
            return {...state, ...action.recipe}
        case GETONE_RECIPE:
            return {...state, [action.recipe.id]: action.recipe}
        case CREATE_RECIPE:
            return {...state, [action.recipe.id]: action.recipe}
        case EDIT_RECIPE:
            return {...state, [action.recipe.id]: action.recipe}
        case REMOVE_RECIPE:
            const newState= {...state};
            delete newState[action.recipeId]
            return newState
        default:
            return state
    }
};

export default recipeReducer
