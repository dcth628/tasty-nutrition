import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createCookbook } from "../../../store/cookbook";
import './CookbookCreate.css'

const CreateCookbookFormModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const updateName = (e) => setName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newCookbook = {
            name
        };

        let createdCookbook = await dispatch(createCookbook(newCookbook)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })

        if (createdCookbook) {
            closeModal();
            history.push(`/cookbooks/${createdCookbook.id}`);
        };
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <form className="cookbook-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Create Cookbook</h3>
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
                    <label>Name</label>
            </div>
            <div className="form-button">
            <button className='confrim-buttons' type="submit">CREATE</button>
            <button className='create-buttons' type="button" onClick={handleCancelClick}>CACNEL</button>
            </div>
        </form>
    )
};

export default CreateCookbookFormModal
