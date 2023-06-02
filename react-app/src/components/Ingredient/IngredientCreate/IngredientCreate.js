import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createIngredient } from "../../../store/ingredient";
import './IngredientCreate.css'
import { Autocomplete, Button } from "@mui/material";
import { TextField } from "@mui/material";

const CreateIngredientFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [measurement, setMeasurement] = useState("");
    const [img, setImg] = useState("");
    const [calorie, setCalorie] = useState("");
    const [carb, setCarb] = useState("");
    const [protein, setProtein] = useState("");
    const [fat, setFat] = useState("");
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
        {
            value: "Fruit",
        },
        {
            value: "Vegetable",
        },
        {
            value: "Protein",
        },
        {
            value: "Grains",
        },
        {
            value: "Dairy",
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newIngredient = {
            name, type, measurement, img, calorie, carb, protein, fat
        };

        let createdIngredient = await dispatch(createIngredient(newIngredient)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })

        if (createdIngredient) {
            closeModal();
            history.push(`/ingredients/${createdIngredient.id}`);

        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    console.log(type, '--type')
    return (
        // <>Test</>
        <form className="ingredient-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Create Ingredient</h1>
            <ul>
                {errors.length > 1 ?
                    <li>{errors}</li> :
                    errors.map((error, idx) =>
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
                {/* <select value={type} onChange={updateType}>
                    {types.map((type) => (
                        <option key={type.value} value={type.value}>{type.value}</option>
                        ))}
                </select>
                <label>Type</label> */}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={(types).map(type => type.value)}
                    value={type}
                    sx={{ width: 340 }}
                    size='small'
                    onChange={((event, type) => { setType(type) })}
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
                    value={protein}
                    onChange={updateProtein} />
                    <label>Protein</label>
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
                    value={fat}
                    onChange={updateFat} />
                    <label>Fats</label>
            </div>
            <div className="form-button">
            <button className='create-buttons' type="submit">CREATE</button>
            <button className='create-buttons' onClick={handleCancelClick}>CANCEL</button>
            </div>
        </form>
    )

};

export default CreateIngredientFormModal
