const CREATE_IMAGE = 'image/CREATE_IMAGE';

const create = (image) => ({
    type: CREATE_IMAGE,
    image
});

export const createImageRecipe = (imageArray, userId,recipeId) => async dispatch => {
    // imageArray.forEach( async (image) => {
        console.log(imageArray, 'in the thunk')
        const response = await fetch(`/api/recipes/${recipeId}/images/`, {
            method: 'POST',
            body: JSON.stringify({
                url: imageArray,
                recipe_id: recipeId,
                user_id: userId
            })
        });
        console.log(response, 'this is respone')
        const newImage = await response.json();
        dispatch(create(newImage));
    // })
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
            default:
                return state
    }
};

export default imageReducer;
