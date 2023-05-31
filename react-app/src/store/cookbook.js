const LOAD_COOKBOOK = 'cookbook/LOAD_COOKBOOK'
const GETONE_COOKBOOK = 'cookbook/GETONE_COOKBOOK'
const CREATE_COOKBOOK = 'cookbook/CREATE_COOKBOOK'
const EDIT_COOKBOOK = 'cookbook/EDIT_COOKBOOK'
const REMOVE_COOKBOOK = 'cookbook/REMOVE_COOKBOOK'
const ADD_RECIPE = 'cookbook/ADD_RECIPE'
const REMOVE_RECIPE = 'cookbook/RECIPE'

const load = (cookbook) => ({
    type: LOAD_COOKBOOK,
    cookbook
})

const getone = (cookbook) => ({
    type: GETONE_COOKBOOK,
    cookbook
})

const create = (cookbook) => ({
    type: CREATE_COOKBOOK,
    cookbook
})

const edit = (cookbook) => ({
    type: EDIT_COOKBOOK,
    cookbook
})

const remove = (cookbookId) => ({
    type: REMOVE_COOKBOOK,
    cookbookId
})

const addRecipe = (recipeId, cookbookId) => ({
    type: ADD_RECIPE,
    recipeId, cookbookId
})

export const getAllCookbook = () => async (dispatch) => {
    const response = await fetch('/api/cookbooks')

    if (response.ok) {
        const cookbooks = await response.json();
        dispatch(load(cookbooks))
        return cookbooks
    };
};

export const currentUserCookbook = () => async (dispatch) => {
    const response = await fetch('/api/cookbooks/current')

    if (response.ok) {
        const cookbooks = await response.json();
        dispatch(load(cookbooks));
        return cookbooks
    };
};

export const getCookbookDetail = (cookbookId) => async dispatch => {
    const response = await fetch(`/api/cookbooks/${cookbookId}`)

    if (response.ok) {
        const cookbook = await response.json();
        dispatch(getone(cookbook));
        return cookbook
    };
};

export const createCookbook = (cookbook) => async (dispatch) => {
    const { name } = cookbook;

    const response = await fetch('/api/cookbooks', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name
        })
    });

    if (response.ok) {
        const new_cookbook = await response.json();
        dispatch(create(new_cookbook));
        return new_cookbook
    };
};

export const editCookbook = (cookbook) => async (dispatch) => {
    const { id, name } = cookbook;

    const response = await fetch('/api/cookbooks', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:id ,name
        })
    });

    if (response.ok) {
        const cookbook = await response.json();
        dispatch(edit(cookbook));
        return cookbook
    };
};

export const deleteCookbook = (cookbookId) => async (dispatch) => {
    const response = await fetch(`/api/cookbooks/${cookbookId}/`, {
        method: "DELETE"
    });

    if (response.ok) {
        const cookbook = await response.json();
        dispatch(remove(cookbookId));
        return cookbook
    };
};

export const addRecipeCookbook = (recipeId, cookbookId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/cookbooks/${cookbookId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            recipe_id : recipeId,
            cookbook_id : cookbookId
        })
    });

    if (response.ok) {
        const recipeCookbook = response.json();
        dispatch(addRecipe(recipeCookbook))
        return recipeCookbook
    };
};

export const deleteRecipeCookbook = (recipeId, cookbookId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/cookbooks/${cookbookId}`, {
        method:"DELETE"
    });
    if (response.ok) {
        const recipeCookbook = response.json();
        dispatch(remove(recipeCookbook))
        return recipeCookbook
    };
};

const initialState = {}

const cookbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COOKBOOK:
            return {...state, ...action.cookbook}
        case GETONE_COOKBOOK:
            return {...state, [action.cookbook.id]: action.cookbook}
        case CREATE_COOKBOOK:
            return {...state, [action.cookbook.id]: action.cookbook}
        case EDIT_COOKBOOK:
            return {...state, [action.cookbook.id]: action.cookbook}
        case REMOVE_COOKBOOK:
            const newState= {...state};
            delete newState[action.cookbookId]
            return newState
        default:
            return state
    }
};

export default cookbookReducer
