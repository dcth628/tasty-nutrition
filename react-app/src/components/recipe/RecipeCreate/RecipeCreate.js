import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createRecipe } from "../../../store/recipe";

const CreateRecipeModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [serving, setServing] = useState("");
    const [cooktime, setCooktime] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateInstruction = (e) => setInstruction(e.target.value);
    const updateServing = (e) => setServing(e.target.value);
    const updateCooktime = (e) => setCooktime(e.target.value);

    const handleSubmit =async (e) => {
        e.preventDefault();
        setErrors([]);

        const newRecipe = {
            name, description, instruction, serving, cooktime
        };

        let createdRecipe = await dispatch(createRecipe(newRecipe)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          })

        if (createdRecipe) {
            closeModal();
            history.push(`/recipes/${createdRecipe.id}`)
        };
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        // <>Test</>
        <form onSubmit={handleSubmit} >
            <h1>Create Recipe</h1>
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
            <button type="submit">Create</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )

};

export default CreateRecipeModal
