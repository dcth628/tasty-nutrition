import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editIngredient } from "../../../store/ingredient";
import { getIngredientDetail } from "../../../store/ingredient";


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
        { label: "--Select--", value: "--Select--", },
        { label: "Fruit", value: "Fruit",},
        { label: "Vegetable", value: "Vegetable",},
        { label: "Protein", value: "Protein",},
        { label: "Grains", value: "Grains",},
        { label: "Dairy",value: "Dairy",},
    ];

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
        <form onSubmit={handleSubmit}>
            <h1>Edit Ingredient</h1>
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
                <select value={type} onChange={updateType}>
                    {types.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
            </div>
            {/* <div>
                <input
                    type='text'
                    placeholder="Type"
                    required
                    value={type}
                    onChange={updateType} />
            </div> */}
            <div>
                <input
                    type='text'
                    placeholder="Image"
                    required
                    value={img}
                    onChange={updateImg} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Measurement"
                    required
                    value={measurement}
                    onChange={updateMeasurement} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Calorie"
                    required
                    value={calorie}
                    onChange={updateCalorie} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Protein"
                    required
                    value={protein}
                    onChange={updateProtein} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Carb"
                    required
                    value={carb}
                    onChange={updateCarb} />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Fat"
                    required
                    value={fat}
                    onChange={updateFat} />
            </div>
            <button type="submit">Create</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )
};

export default EditIngredientModal
