const CREATE_IMAGE = 'image/CREATE_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';

const create = (image) => ({
    type: CREATE_IMAGE,
    image
});

const remove = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
})

export const createImageRecipe = (url, userId,recipeId) => async dispatch => {
    // imageArray.forEach( async (image) => {

        const response = await fetch(`/api/recipes/${recipeId}/images/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: url,
                user_id: userId,
                recipe_id: recipeId
            })
        });
        const newImage = await response.json();
        dispatch(create(newImage));
    // })
};

export const deleteImage = (imageId) => async dispatch => {
        const response = await fetch(`/api/recipes/images/${imageId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const image = await response.json();
            dispatch(remove(imageId));
            return image
        };

};

const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_IMAGE:
            const newState = {
                ...state,
                [action.image.id]: action.image
            };
            return newState;
        case DELETE_IMAGE:
            const deleteState = {...state}
            delete deleteState[action.imageId]
            return deleteState
        default:
            return state
    }
};

export default imageReducer;
