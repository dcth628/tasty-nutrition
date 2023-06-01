import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editRecipe } from "../../../store/recipe";
import { getRecipeDetail, deleteIngredientRecipe, addIngredientRecipe } from "../../../store/recipe";
import { getAllTypes } from "../../../store/type";
import { getAllIngredients } from "../../../store/ingredient";
import { createImageRecipe, deleteImage} from "../../../store/image";
import { Checkbox, TextField } from "@mui/material";
import { Autocomplete, Box } from "@mui/material";


const EditRecipeModal = ({recipe}) => {
    const dispatch = useDispatch();
    const types = useSelector(state => state?.type)
    const sessionUser = useSelector(state=> state.session.user)
    const ingredients = useSelector(state=> state?.ingredient)

    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [instruction, setInstruction] = useState(recipe.instruction);
    const [serving, setServing] = useState(recipe.serving);
    const [cooktime, setCooktime] = useState(recipe.cooktime);
    // const [type, setType] = useState(recipe.types);
    const [image, setImage] = useState(recipe.images)
    const [editImage, setEditImage ] = useState([])
    const [ingredient, setIngredient ] = useState(recipe.ingredients)
    const [editIngredient, setEditIngredient] = useState([])
    const [quantity, setQuantity] = useState([])
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllTypes())
        dispatch(getAllIngredients())
    }, [dispatch, recipe]);

    const DeleteImage = async (e) =>{
        e.preventDefault();
        await dispatch(deleteImage(e.target.value));
    };
    const handleImageAdd = (e) => {
        e.preventDefault()
        const abc = [...editImage,[]]
        setEditImage(abc)
    };

    const handleImageChange = (e, i) => {
        e.preventDefault()
        const inputdata = [...editImage];
        inputdata[i] = e.target.files[0];
        setEditImage(inputdata)
    };

    const handleImageDelete = (i) => {
        const deleteVal = [...editImage]
        deleteVal.splice(i, 1)
        setEditImage(deleteVal)
    };

    const DeleteIngredient = async (e) =>{
        e.preventDefault();
        await dispatch(deleteIngredientRecipe(e.target.value));
    };

    const handleIngredAdd = (e) => {
        e.preventDefault()
        const abc = [...editIngredient, []]
        setEditIngredient(abc)
        let newfield = { quantity: "" }
        const bcd = [...quantity, newfield]
        setQuantity(bcd)
    };

    const handleIngredChange = (e, type, i) => {
        e.preventDefault()
        const inputdata = [...editIngredient];
        inputdata[i] = type;
        setEditIngredient(inputdata)
    };

    const handleQuantity = (e, i) => {
        e.preventDefault()
        const inputquantity = [...quantity]
        inputquantity[i].quantity = e.target.value
        setQuantity(inputquantity)
    }

    const handleIngredDelete = (i) => {
        const deleteVal = [...editIngredient]
        deleteVal.splice(i, 1)
        setEditIngredient(deleteVal)
        const deleteQuantity = [...quantity]
        deleteQuantity.splice(i, 1)
        setQuantity(deleteQuantity)
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

    const mergedArray = [];
    for (let i = 0; i < ingredient.length; i++) {
        mergedArray.push({ ...editIngredient[i], ...quantity[i] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newRecipe = {
            id: recipe.id,
            name, description, instruction, serving, cooktime
        };
        let updatedRecipe = await dispatch(editRecipe(newRecipe)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        await dispatch(addIngredientRecipe(mergedArray, updatedRecipe.id))
        for (let i = 0; i < editImage.length; i++) {
            let file = editImage[i];

            const formData = new FormData();
            formData.append('image',file)
            const response = await fetch(`/api/recipes/images/url`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let url = await response.json()
                let image = url.url
                await dispatch(createImageRecipe(image, sessionUser.id, updatedRecipe.id))
            }
            else {
                // a real app would probably use more advanced
                // error handling
                console.log("error");
            }
        }
        if (updatedRecipe) {
            closeModal();
            await dispatch(getRecipeDetail(recipe.id))
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };
    console.log(ingredients, '--ingredient')

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
            {image.map((image) => (
                <span key={image.id}>
                    <img src={image.image} alt={image.id} height={200} width={200} value={image.id} />
                    <button onClick={DeleteImage} value={image.id}>Delete</button>
                </span>
            ))}
            </div>
            <div>
                <button onClick={(e) => handleImageAdd(e)}>Add Images</button>
                {editImage.map((data, i) => {
                    return (
                        <div key={i}>
                            <input
                                    type="file"
                                    onChange={(e) => handleImageChange(e, i)}
                                />
                            <button onClick={() => handleImageDelete(i)}>x</button>
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
            <div>
                {ingredient.map((ingredient) => (
                    <div>
                        <p>{ingredient.name}</p>
                        <button onClick={DeleteIngredient} value={ingredient.id}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={(e) => handleIngredAdd(e)}>Add Ingredient</button>
                {editIngredient.map((data, i) => {
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
                        </>
                    )
                })}
            </div>
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
