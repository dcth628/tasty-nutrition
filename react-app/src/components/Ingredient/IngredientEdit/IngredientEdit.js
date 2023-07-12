import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editIngredient } from "../../../store/ingredient";
import { getIngredientDetail } from "../../../store/ingredient";
import { Autocomplete, Button, TextField } from "@mui/material";


const EditIngredientModal = ({ingredient}) => {
    const dispatch = useDispatch()
    // const history = useHistory()

    const [name, setName] = useState(ingredient.name)
    const [type, setType] = useState(ingredient.type)
    const [measurement, setMeasurement] = useState(ingredient.measurement)
    const [img, setImg] = useState(ingredient.img)
    const [calorie, setCalorie] = useState(ingredient.calorie)
    const [carb, setCarb] = useState(ingredient.carb)
    const [protein, setProtein] = useState(ingredient.protein)
    const [fat, setFat] = useState(ingredient.fat)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updateType = (e) => setType(e.target.value);
    const updateMeasurement = (e) => setMeasurement(e.target.value)
    const updateImg = (e) => setImg(e.target.value);
    const updateCalorie = (e) => setCalorie(e.target.value);
    const updateCarb = (e) => setCarb(e.target.value);
    const updateProtein = (e) => setProtein(e.target.value);
    const updateFat = (e) => setFat(e.target.value);

    const types = [
        { value: "Fruit",},
        { value: "Vegetable",},
        { value: "Protein",},
        { value: "Grains",},
        { value: "Dairy",},
        { value: "Other",},
    ];

    useEffect(() => {
        const validationErrors = [];
        if (measurement.length && /^-?\d+(\.\d+)?$/.test(measurement) === false ) {
            validationErrors.push("Please enter correct info for measurement")
        }
        if (carb.length && /^-?\d+(\.\d+)?$/.test(carb) === false) {
            validationErrors.push("Please enter correct info for carbs")
        }
        if (calorie.length && /^-?\d+(\.\d+)?$/.test(calorie) === false) {
            validationErrors.push("Please enter correct info for calories")
        }
        if (protein.length && /^-?\d+(\.\d+)?$/.test(protein) === false) {
            validationErrors.push("Please enter correct info for protein")
        }
        if (fat.length && /^-?\d+(\.\d+)?$/.test(fat) === false) {
            validationErrors.push("Please enter correct info for fats")
        }
        if (measurement.length && measurement === "0") {
            validationErrors.push("Measurement can not be 0")
        }
        if (carb.length && carb === "0") {
            validationErrors.push("Carbs can not be 0")
        }
        if (calorie.length && calorie === "0") {
            validationErrors.push("Calories can not be 0")
        }
        if (protein.length && protein === "0") {
            validationErrors.push("Protein can not be 0")
        }
        if (fat.length && fat === "0") {
            validationErrors.push("Fats can not be 0")
        }
        setErrors(validationErrors);
    }, [carb, calorie, protein, fat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newIngredient = {
            id: ingredient.id,
            name,
            type,
            measurement,
            img,
            calorie,
            carb,
            protein,
            fat
        };
        let updatedIngredient = await dispatch(editIngredient(newIngredient))
        if (updatedIngredient) {
            closeModal();
            await dispatch(getIngredientDetail(ingredient.id))
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        // <>Test</>
        <form className="ingredient-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Edit Ingredient</h1>
            <ul>
                {errors.map((error, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={name}
                    onChange={updateName} />
                    <label>
                    Name
                    </label>
            </div>
            <div>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={(types).map(type => type.value)}
                    value={type}
                    sx={{ width: 320}}
                    size='small'
                    onChange={((event, type) => {setType(type)})}
                    renderInput={(params) => <TextField {...params} label="Type" />}
                />
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={img}
                    onChange={updateImg} />
                    <label>Image</label>
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={measurement}
                    onChange={updateMeasurement} />
                    <label>Measurement</label>
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={calorie}
                    onChange={updateCalorie} />
                    <label>Calories</label>
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={carb}
                    onChange={updateCarb} />
                    <label>Carbs</label>
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={protein}
                    onChange={updateProtein} />
                    <label>Protein</label>
            </div>
            <div className="input-group">
                <input
                    type='text'
                    required
                    value={fat}
                    onChange={updateFat} />
                    <label>Fats</label>
            </div>
            <div className="form-button">
            <button className='confrim-buttons' type="submit">EDIT</button>
            <button className='create-buttons' onClick={handleCancelClick}>CANCEL</button>
            </div>
        </form>
    )
};

export default EditIngredientModal
