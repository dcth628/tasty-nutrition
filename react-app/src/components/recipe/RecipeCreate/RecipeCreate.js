import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createRecipe } from "../../../store/recipe";
import { getAllTypes } from "../../../store/type";
import { AddTypesToRecipe } from "../../../store/type";
import { createImageRecipe } from "../../../store/image";
import { Checkbox, TextField } from "@mui/material";
import { Autocomplete, Box } from "@mui/material";
import { getAllIngredients } from "../../../store/ingredient";
import { addIngredientRecipe } from "../../../store/recipe";


const CreateRecipeModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state?.type);
    const ingredients = useSelector(state => state?.ingredient);
    const sessionUser = useSelector(state => state.session.user)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instruction, setInstruction] = useState("");
    const [serving, setServing] = useState("");
    const [cooktime, setCooktime] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [type, setType] = useState([]);
    const [image, setImage] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [ingredient, setIngredient] = useState([])
    const [quantity, setQuantity] = useState([])

    const handleIngredAdd = (e) => {
        e.preventDefault()
        const abc = [...ingredient, []]
        setIngredient(abc)
        let newfield = { quantity: "" }
        const bcd = [...quantity, newfield]
        setQuantity(bcd)
    };

    const handleIngredChange = (e, type, i) => {
        e.preventDefault()
        const inputdata = [...ingredient];
        inputdata[i] = type;
        setIngredient(inputdata)
    };

    const handleQuantity = (e, i) => {
        e.preventDefault()
        const inputquantity = [...quantity]
        inputquantity[i].quantity = e.target.value
        setQuantity(inputquantity)
    }

    const handleIngredDelete = (i) => {
        const deleteVal = [...ingredient]
        deleteVal.splice(i, 1)
        setIngredient(deleteVal)
        const deleteQuantity = [...quantity]
        deleteQuantity.splice(i, 1)
        setQuantity(deleteQuantity)
    };

    const handleImageAdd = (e) => {
        e.preventDefault()
        const abc = [...image, []]
        setImage(abc)
    };

    const handleImageChange = (e, i) => {
        e.preventDefault()
        const inputdata = [...image];
        inputdata[i] = e.target.files[0];
        setImage(inputdata)
    };

    const handleImageDelete = (i) => {
        const deleteVal = [...image]
        deleteVal.splice(i, 1)
        setImage(deleteVal)
    };

    useEffect(() => {
        dispatch(getAllTypes())
        dispatch(getAllIngredients())
    }, [dispatch]);

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    // const updateInstruction = (e) => setInstruction(e.target.value);
    const updateServing = (e) => setServing(e.target.value);
    const updateCooktime = (e) => setCooktime(e.target.value);
    // const updateQuantity = (e) => setQuantity(e.target.value)

    const handleTypeClick = (e) => {
        const rowId = e.target.value;
        const inputdata = [...type]
        if (!type.includes(e.target.value)) {
            inputdata.push(e.target.value);
            setType(inputdata)
        } else {
            const index = inputdata.indexOf(rowId);
            inputdata.splice(index, 1)
            setType(inputdata)
        }
    };

    const handleAdd = (e) => {
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
        let deletVal = instruction.split('\\')
        deletVal.splice(i, 1)
        let bcd = deletVal.join('\\')
        setInstruction(bcd)
    };

    const mergedArray = [];
    for (let i = 0; i < ingredient.length; i++) {
        mergedArray.push({ ...ingredient[i], ...quantity[i] });
    }
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
        // await dispatch(createImageRecipe(image, sessionUser.id, createdRecipe.id))
        await dispatch(AddTypesToRecipe(type, createdRecipe.id))
        await dispatch(addIngredientRecipe(mergedArray, createdRecipe.id))
        for (let i = 0; i < image.length; i++) {
            let file = image[i];

            const formData = new FormData();
            formData.append('image',file)

            // let formEntries = formData.entries()
            // for (let entrie of formEntries) {
            //     console.log(entrie, '--entrie')
            // }
            const response = await fetch(`/api/recipes/images/url`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let url = await response.json()
                let image = url.url
                console.log(image)
                await dispatch(createImageRecipe(image, sessionUser.id, createdRecipe.id))
            }
            else {
                setImageLoading(false);
                // a real app would probably use more advanced
                // error handling
                console.log("error");
            }
        }

        if (createdRecipe) {
            closeModal();
            history.push(`/recipes/${createdRecipe.id}`)
        };
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    // console.log(image, '--image')
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
                <button onClick={(e) => handleImageAdd(e)}>Add Images</button>
                {image.map((data, i) => {
                    return (
                        <div>
                            <input
                                    type="file"
                                    onChange={(e) => handleImageChange(e, i)}
                                />
                            {/* <input value={data} placeholder="Images" onChange={e => handleImageChange(e, i)} /> */}
                            <button onClick={() => handleImageDelete(i)}>x</button>
                        </div>
                    )
                })}
            </div>

            {/* <div>
                <input
                    type='text'
                    placeholder="image"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />
            </div> */}
            <div>
                <button onClick={(e) => handleIngredAdd(e)}>Add Ingredient</button>
                {ingredient.map((data, i) => {
                    return (
                        <>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                size="small"
                                sx={{ width: 300 }}
                                options={Object.values(ingredients)}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="40"
                                            src={option.img}
                                            alt=""
                                        />
                                        {option.name}    ({option.measurement}g)
                                    </Box>
                                )}
                                renderInput={(params) => <TextField {...params} label="Ingredient" />}
                                onChange={(e, type) => handleIngredChange(e, type, i)}
                            />
                            <input type='text' placeholder="Quantity" onChange={(e) => handleQuantity(e, i)}></input>
                            <button onClick={() => handleIngredDelete(i)}>x</button>
                            {/* <div>Calories: {data.calorie * quantity}</div>
                        <div>carb: {data.carb * quantity}</div>
                        <div>Protein: {data.protein * quantity}</div>
                        <div>Fat: {data.fat * quantity}</div> */}
                        </>
                    )
                })}
                {/* <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            // value={ingredient}
                            options={Object.values(ingredients)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Ingredient" />}
                            onChange={(e, type) => setIngredient(type.id)}
                        /> */}
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
                    return (<div key={data.id}>
                        Step {i + 1}<input
                            value={data}
                            required
                            placeholder="Steps"
                            onChange={e => handleChange(e, i)} />
                        <button onClick={() => handleDelete(i)}>x</button>
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
                {types && (Object.values(types).map((type) => (
                    <>
                        <Checkbox
                            lable={type}
                            value={type.id}
                            onChange={e => handleTypeClick(e)}
                        />
                        <img src={type.img} height={30} width={30} />
                        {type.type}
                    </>
                )))}
            </div>
            <button type="submit" onClick={handleSubmit}>Create</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )

};

export default CreateRecipeModal
