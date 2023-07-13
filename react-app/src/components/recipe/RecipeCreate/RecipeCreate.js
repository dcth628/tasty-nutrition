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
import './RecipeCreate.css'


const CreateRecipeModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state?.type);
    const selectIngred = useSelector(state=> state?.ingredient)
    const ingredients = Object.values(selectIngred)
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
        const validationErrors = [];
        if (serving.length && /^-?\d+(\.\d+)?$/.test(serving) === false) {
            validationErrors.push("Please enter a number for serving")
        }
        if (cooktime.length && /^-?\d+(\.\d+)?$/.test(cooktime) === false) {
            validationErrors.push("Please enter a number for cook time")
        }
        let quantityValidation = quantity.filter(number => /^-?\d+(\.\d+)?$/.test(number.quantity) === false )
        if (quantityValidation.length > 0) {
            validationErrors.push("Please enter a number for quantity")
        }
        if (serving.length && serving === "0") {
            validationErrors.push("Serving can not be 0")
        }
        if (cooktime.length && cooktime === "0") {
            validationErrors.push("Cook time can not be 0")
        }
        let quantityValidations = quantity.filter(number => number.quantity === "0" )
        if (quantityValidations.length) {
            validationErrors.push("Quantity can not be 0")
        }
        setErrors(validationErrors);
        dispatch(getAllTypes())
        dispatch(getAllIngredients())
    }, [dispatch, serving, cooktime, quantity]);

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

    const handleDelete = (e, i) => {
        e.preventDefault()
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

            const response = await fetch(`/api/recipes/images/url`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let url = await response.json()
                let image = url.url
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
        history.goBack()
    };

    for( var i=ingredients.length - 1; i>=0; i--){
        for( var j=0; j<ingredient.length; j++){
            if(ingredients[i] && (ingredients[i].name === ingredient[j].name)){
                ingredients.splice(i, 1);
            }
        }
    }

    return (
        // <>Test</>
        <form className="recipe-create-page" onSubmit={handleSubmit} >
            <h3>Create Recipe</h3>
            <ul className="error-list">
                {errors.map((error, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul>
            <div>
                <button className="recipe-add" onClick={(e) => handleImageAdd(e)}>Add Images</button>
                {image.map((data, i) => {
                    return (
                        <div className="add-ingredient" key={i}>
                            <input
                                    type="file"
                                    required
                                    onChange={(e) => handleImageChange(e, i)}
                                />
                            {/* <input value={data} placeholder="Images" onChange={e => handleImageChange(e, i)} /> */}
                            <button className="recipe-delete" onClick={() => handleImageDelete(i)}>x</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <button className="recipe-add" onClick={(e) => handleIngredAdd(e)}>Add Ingredient</button>
                {ingredient.map((data, i) => {
                    return (
                        <div className="add-ingredient">
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                size="small"
                                sx={{ width: 300 }}
                                options={ingredients}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="40"
                                            src={option.img}
                                            alt={i}
                                        />
                                        {option.name}    ({option.measurement}g)
                                    </Box>
                                )}
                                renderInput={(params) => <TextField {...params} label="Select Ingredient" />}
                                onChange={(e, type) => handleIngredChange(e, type, i)}
                            />
                            <div className="input-group recipe-create-ingred">
                            <input type='text' required onChange={(e) => handleQuantity(e, i)} />
                            <label>Quantity (100g)</label>
                            </div>

                            <button className="recipe-delete recipe-create-ingred" onClick={() => handleIngredDelete(i)}>x</button>
                        </div>
                    )
                })}
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={name}
                    onChange={updateName} />
                    <label>Name</label>
            </div>
            <div className="input-group">
                <textarea
                    type='text'
                    rows={3}
                    cols={50}
                    required
                    value={description}
                    onChange={updateDescription} />
                    <label>Description</label>
            </div>
            <div>
                <button className="recipe-add" onClick={(e) => handleAdd(e)}>Add Instructions</button>
                {instruction.split('\\').map((data, i) => {
                    return (
                    <div className="add-ingredient" key={data.id}>
                        <p>Step {i + 1}</p>
                        <div className="input-group instruction-list">
                        <textarea
                            type='text'
                            rows={3}
                            cols={50}
                            value={data}
                            required
                            onChange={e => handleChange(e, i)} />
                            <label>Enter Instruction</label>
                        </div>
                        <button className="recipe-delete recipe-create-ingred" onClick={(e) => handleDelete(e, i)}>x</button>
                    </div>)
                })}
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={serving}
                    onChange={updateServing} />
                    <label>Serving</label>
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={cooktime}
                    onChange={updateCooktime} />
                    <label>Cook Time (minute)</label>
            </div>
            <div className="recipes-types">
                {types && (Object.values(types).map((type) => (
                    <div className="type-table">
                        <Checkbox
                            lable={type}
                            value={type.id}
                            required
                            onChange={e => handleTypeClick(e)}
                        />
                        <img alt={type.types} src={type.img} height={30} width={30} />
                        <p className="type-list">{type.type}</p>
                    </div>
                )))}
            </div>
            <div className="form-button">
            <button className='confrim-buttons' type="submit" onClick={handleSubmit}>CREATE</button>
            <button className='create-buttons' type="button" onClick={handleCancelClick}>CANCEL</button>
            </div>
        </form>
    )

};

export default CreateRecipeModal
