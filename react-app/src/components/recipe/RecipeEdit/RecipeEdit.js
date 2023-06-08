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
import './RecipeEdit.css'

const EditRecipeModal = ({recipe}) => {
    const dispatch = useDispatch();
    const types = useSelector(state => state?.type)

    const recipes = useSelector(state => state?.recipe[recipe.id]);
    const sessionUser = useSelector(state=> state.session.user)
    const ingredients = useSelector(state=> state?.ingredient)

    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [instruction, setInstruction] = useState(recipe.instruction);
    const [serving, setServing] = useState(recipe.serving);
    const [cooktime, setCooktime] = useState(recipe.cooktime);
    // const [type, setType] = useState(recipe.types);
    const [image, setImage] = useState(recipes.images)
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
        let imageId = e.target.value
        let id = Number(imageId)
        await dispatch(deleteImage(id));
        await dispatch(getRecipeDetail(recipe.id))
        closeModal();
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
    console.log(image ,'--image')

    return (
        <form className="recipe-edit-page" onSubmit={handleSubmit} >
            <div className="recipe-edit-body">
            <h3 className="form-title">Edit Recipe</h3>
            <ul>
                {errors.length > 1 ?
                    <li>{errors}</li> :
                    errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
            </ul>
            <div className="recipe-edit-image-box">
            {image.map((image) => (
                <div className="edit-image-box" key={image.id}>
                    <div>
                    <img className="recipe-edit-image" src={image.image} alt={image.id} value={image.id} />
                    </div>
                    <div>
                    <button className="delete-button" onClick={DeleteImage} value={image.id}>Delete</button>
                    </div>
                </div>
            ))}
            </div>
            <div>
                <button className="recipe-add" onClick={(e) => handleImageAdd(e)}>Add Images</button>
                {editImage.map((data, i) => {
                    return (
                        <div className="add-ingredient" key={i}>
                            <input
                                    type="file"
                                    required
                                    onChange={(e) => handleImageChange(e, i)}
                                />
                            <button className="recipe-delete" onClick={() => handleImageDelete(i)}>x</button>
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
            <div className="recipe-edit-delete">
                {ingredient.map((ingredient) => (
                    <div className="recipe-edit-ingred">
                        <p>{ingredient.name} {ingredient.measurement * ingredient.quantity}g</p>
                        <button className="delete-button" onClick={DeleteIngredient} value={ingredient.id}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <button className="recipe-add" onClick={(e) => handleIngredAdd(e)}>Add Ingredient</button>
                {editIngredient.map((data, i) => {
                    return (
                        <div className="add-ingredient">
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
                            <div className="input-group recipe-create-ingred">
                            <input type='text' required onChange={(e) => handleQuantity(e, i)} />
                            <label>Quantity (g)</label>
                            </div>
                            <button className="recipe-delete recipe-create-ingred" onClick={() => handleIngredDelete(i)}>x</button>
                        </div>
                    )
                })}
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
                            placeholder="Steps"
                            onChange={e=>handleChange(e,i)}/>
                        </div>
                        <button className="recipe-delete recipe-create-ingred" onClick={()=>handleDelete(i)}>x</button>
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
                    <label>Cook Time</label>
            </div>
            {/* <div>
                {Object.values(types).map((ty) => (

                    <>
                    <input type='checkbox' value={ty} defaultChecked={type.filter(type => type.type_id === ty.id)}/>{ty.type}
                    </>
                ))}
            </div> */}
            <div className="form-button">
            <button className='confrim-buttons' type="submit">UPDATE</button>
            <button className='create-buttons' type="button" onClick={handleCancelClick}>CANCEL</button>
            </div>
            </div>
        </form>
    )
};

export default EditRecipeModal
