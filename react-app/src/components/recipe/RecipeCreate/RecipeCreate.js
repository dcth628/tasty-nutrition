import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createRecipe } from "../../../store/recipe";
import { getAllTypes } from "../../../store/type";
import { AddTypesToRecipe } from "../../../store/type";
import { createImageRecipe } from "../../../store/image";
import { Checkbox } from "@mui/material";

const CreateRecipeModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state?.type);
    const sessionUser = useSelector(state=> state.session.user)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [serving, setServing] = useState("");
    const [cooktime, setCooktime] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [type, setType] = useState([]);
    const [image, setImage] = useState("");

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

    useEffect(() => {
        dispatch(getAllTypes())
    },[dispatch]);

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    // const updateInstruction = (e) => setInstruction(e.target.value);
    const updateServing = (e) => setServing(e.target.value);
    const updateCooktime = (e) => setCooktime(e.target.value);

    const handleTypeClick = (e) => {
        const rowId = e.target.value;
        const inputdata = [...type]
        if (!type.includes(e.target.value)) {
            inputdata.push(e.target.value);
            setType(inputdata)
        } else {
            const index = inputdata.indexOf(rowId);
            inputdata.splice(index,1)
            setType(inputdata)
        }
    };

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
            name, description, instruction, serving, cooktime
        };

        let createdRecipe = await dispatch(createRecipe(newRecipe)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          })
          await dispatch(createImageRecipe(image, sessionUser.id, createdRecipe.id))
          await dispatch(AddTypesToRecipe(type, createdRecipe.id))

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
            {/* <div>
                <button onClick={(e) => handleImageAdd(e)}>Add Images</button>
                {image.map((data, i) => {
                    return (
                        <div>
                            <input value={data} placeholder="Images" onChange={e => handleImageChange(e, i)} />
                            <button onClick={()=> handleImageDelete(i)}>x</button>
                        </div>
                    )
                })}
            </div> */}
            <div>
                <input
                    type='text'
                    placeholder="image"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />
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
            <div>
                <button onClick={(e) => handleAdd(e)}>Add Instructions</button>
                {instruction.split('\\').map((data, i) => {
                    return (<div>
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
            <div>
                {Object.values(types).map((type) => (
                    <>
                    <Checkbox
                    lable={type}
                    value={type.id}
                    onChange={e => handleTypeClick(e)}
                    />
                    {type.type}
                    </>
                ))}
            </div>
            <button type="submit" onClick={handleSubmit}>Create</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )

};

export default CreateRecipeModal
