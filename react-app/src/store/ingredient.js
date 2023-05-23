const LOAD_INGREDIENTS = 'ingredient/LOAD_INGREDIENT'
const GETONE_INGREDIENT = 'ingredient/GETONE_INGREDIENT'
const CREATE_INGREDIENT = 'ingredient/CREATE_INGREDIENT'
const EDIT_INGREDIENT = 'ingredient/EDIT_INGREDIENT'
const REMOVE_INGREDIENT = 'ingredient/REMOVE_INGREDIENT'

const load = (ingredients) => ({
    type: LOAD_INGREDIENTS,
    ingredients
});

const getone = (ingredient) => ({
    type: GETONE_INGREDIENT,
    ingredient
});

const create = (ingredient) => ({
    type: CREATE_INGREDIENT,
    ingredient
});

const edit = (ingredient) => ({
    type: EDIT_INGREDIENT,
    ingredient
});

const remove = (ingredientId) => ({
    type: REMOVE_INGREDIENT,
    ingredientId
});

export const getAllIngredients = () => async (dispatch) => {
    const response = await fetch('/api/ingredients')

    if (response.ok) {
        const ingredients = await response.json();
        dispatch(load(ingredients))
        return ingredients
    };
};

export const getIngredientDetail = (ingredientId) => async (dispatch) => {

    const response = await fetch(`/api/ingredients/${ingredientId}`)

    if (response.ok) {
        const ingredient = await response.json()
        dispatch(getone(ingredient))
        return ingredient
    };
};

export const createIngredient = (ingredient) => async (dispatch) => {
    const { name, type, img, measurement, calorie, carb, protein , fat} = ingredient;

    const response = await fetch('/api/ingredients', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name, type, img, measurement, calorie, carb, protein, fat
        })
    });

    if (response.ok) {
        const new_ingredient = await response.json();
        dispatch(create(new_ingredient))
        return new_ingredient
    };
};

export const editIngredient = (ingredient) => async (dispatch) => {
    const { id, name, type, img, measurement, calorie, carb, protein , fat} = ingredient;

    const response = await fetch(`/api/ingredients/${ingredient.id}/`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id : id,
            name, type, img, measurement, calorie, carb, protein, fat
        })
    });

    if (response.ok) {
        const ingredient = await response.json();
        dispatch(edit(ingredient))
        return ingredient
    };
};

export const deleteIngredient = (ingredientId) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${ingredientId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const ingredient = await response.json()
        dispatch(remove(ingredientId))
        return ingredient
    }
}

const initialState = {}

const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS:
            return {...state, ...action.ingredients}
        case GETONE_INGREDIENT:
            return {...state, [action.ingredient.id]: action.ingredient}
        case CREATE_INGREDIENT:
            return {...state, [action.ingredient.id]: action.ingredient}
        case EDIT_INGREDIENT:
            return {...state, [action.ingredient.id]: action.ingredient}
        case REMOVE_INGREDIENT:
            const newState = {...state};
            delete newState[action.ingredientId]
            return newState
        default:
            return state
    }
};

export default ingredientReducer
