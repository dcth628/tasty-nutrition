import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createCookbook } from "../../../store/cookbook";

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
        <form onSubmit={handleSubmit}>
            <h1>Create Cookbook</h1>
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
            <button type="submit">Create</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    )
};

export default CreateCookbookFormModal
