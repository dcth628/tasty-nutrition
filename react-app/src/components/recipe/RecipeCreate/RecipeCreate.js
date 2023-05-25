import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createRecipe } from "../../../store/recipe";
import AddDynamicInput from "../addInstruction";
import { getAllTypes } from "../../../store/type";
import { AddTypesToRecipe } from "../../../store/type";

const CreateRecipeModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state?.type);

    console.log(types, 'this is types in recipe')
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [serving, setServing] = useState("");
    const [cooktime, setCooktime] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [type, setType] = useState([]);


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
    }

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
                <button onClick={(e) => handleAdd(e)}>Add</button>
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
                    <input
                    type='checkbox'
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
