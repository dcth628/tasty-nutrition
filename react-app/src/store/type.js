const LOAD_TYPE = 'type/LOAD_TYPE'
const ADD_TYPE = 'type/ADD_TYPE'

const load = (types) => ({
    type: LOAD_TYPE,
    types
});

const add = (types) => ({
    type: ADD_TYPE,
    types
})

export const getAllTypes = () => async (dispatch) => {
    const response = await fetch('/api/types')

    if (response.ok) {
        const types = await response.json();
        dispatch(load(types))
        return types
    };
};

export const AddTypesToRecipe = (typeArr, recipeId) => async (dispatch) => {
    console.log(typeArr, 'this is typearr')
    typeArr.forEach( async(type) => {
        const response = await fetch(`/api/recipes/${recipeId}/types/${type}`, {
            method: 'POST',
            body: JSON.stringify({
                type_id: Number(type),
                recipe_id: recipeId
            })
        });
        const addType = await response.json();
        dispatch(add(addType))

    })
}

const initialState = {}

const typeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TYPE:
            return {...state, ...action.types}
        case ADD_TYPE:
            return {...state, [action.types.id]: action.types}
        default:
            return state
    };
};

export default typeReducer
