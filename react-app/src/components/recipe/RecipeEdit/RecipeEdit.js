import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editRecipe } from "../../../store/recipe";
import { getRecipeDetail } from "../../../store/recipe";

const EditRecipeModal = ({recipe}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [instruction, setInstruction] = useState(recipe.instruction);
    const [serving, setServing] = useState(recipe.serving);
    const [cooktime, setCooktime] = useState(recipe.cooktime);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateInstruction = (e) => setInstruction(e.target.value);
    const updateServing = (e) => setServing(e.target.value);
    const updateCooktime = (e) => setCooktime(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newRecipe = {
            id: recipe.id,
            name, description, instruction, serving, cooktime
        };
        let updatedRecipe = await dispatch(editRecipe(newRecipe))
        if (updatedRecipe) {
            closeModal();
            await dispatch(getRecipeDetail(recipe.id))
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} >
            <h1>Edit Recipe</h1>
            <ul>
                {errors.length > 1 ?
                    <li>{errors}</li> :
                    errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
            </ul>
            <div>
                <input
                    type='text'
                    placeholder="Name"
                    required
                    value={name}
                    onChange={updateName} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Description"
                    required
                    value={description}
                    onChange={updateDescription} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Instructions"
                    required
                    value={instruction}
                    onChange={updateInstruction} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Serving"
                    required
                    value={serving}
                    onChange={updateServing} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Cooktime"
                    required
                    value={cooktime}
                    onChange={updateCooktime} />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )
};

export default EditRecipeModal
