import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editRecipe } from "../../../store/recipe";
import { getRecipeDetail } from "../../../store/recipe";
import { getAllTypes } from "../../../store/type";
import { createImageRecipe, deleteImage} from "../../../store/image";


const EditRecipeModal = ({recipe}) => {
    const dispatch = useDispatch();
    const types = useSelector(state => state?.type)
    const sessionUser = useSelector(state=> state.session.user)


    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [instruction, setInstruction] = useState(recipe.instruction);
    const [serving, setServing] = useState(recipe.serving);
    const [cooktime, setCooktime] = useState(recipe.cooktime);
    // const [type, setType] = useState(recipe.types);
    const [image, setImage] = useState(recipe.images)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleImageAdd = (e) => {
        e.preventDefault()
        const abc = [...image,[]]
        setImage(abc)
    };

    const handleImageChange = (e, i) => {
        e.preventDefault()
        const inputdata = [...image];
        inputdata[i] = e.target.value;
        setImage(inputdata)
    };

    const handleImageDelete = (i) => {
        const deleteVal = [...image]
        deleteVal.splice(i, 1)
        setImage(deleteVal)
    };

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateInstruction = (e) => setInstruction(e.target.value);
    const updateServing = (e) => setServing(e.target.value);
    const updateCooktime = (e) => setCooktime(e.target.value);

    const handleAdd =(e) => {
        e.preventDefault()
        const abc = instruction + "\\"
        setInstruction(abc)
    };

    const handleChange = (e, i) => {
        e.preventDefault()
        const inputdata = instruction.split('\\')
        inputdata[i] = e.target.value;
        const abc = inputdata.join('\\')
        setInstruction(abc)
    };

    const handleDelete = (i) => {
        let deletVal= instruction.split('\\')
        deletVal.splice(i, 1)
        let bcd = deletVal.join('\\')
        setInstruction(bcd)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newRecipe = {
            id: recipe.id,
            name, description, instruction, serving, cooktime
        };
        let updatedRecipe = await dispatch(editRecipe(newRecipe))
        await dispatch(deleteImage(recipe.images))
        await dispatch(createImageRecipe(image, sessionUser.id, updatedRecipe.id));
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
                {/* <button onClick={(e) => handleImageAdd(e)}>Add Images</button> */}
                {image.map((data, i) => {
                    return (
                        <div key={data.id}>
                            <input value={data.image} placeholder="Images" onChange={e => handleImageChange(e, i)} />
                            {/* <button onClick={()=> handleImageDelete(i)}>x</button> */}
                        </div>
                    )
                })}
            </div>
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
            {/* <div>
                <input
                    type='text'
                    placeholder="Instructions"
                    required
                    value={instruction}
                    onChange={updateInstruction} />
            </div> */}
            <div>
                <button onClick={(e) => handleAdd(e)}>Add Instructions</button>
                {instruction.split('\\').map((data, i) => {
                    return (<div key={data.id}>
                        Step {i +1}<input
                            value={data}
                            required
                            placeholder="Steps"
                            onChange={e=>handleChange(e,i)}/>
                        <button onClick={()=>handleDelete(i)}>x</button>
                    </div>)
                })}
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
            {/* <div>
                {Object.values(types).map((ty) => (

                    <>
                    <input type='checkbox' value={ty} defaultChecked={type.filter(type => type.type_id === ty.id)}/>{ty.type}
                    </>
                ))}
            </div> */}
            <button type="submit">Update</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )
};

export default EditRecipeModal
