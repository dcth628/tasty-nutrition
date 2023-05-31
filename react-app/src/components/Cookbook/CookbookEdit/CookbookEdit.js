import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editCookbook, getCookbookDetail } from "../../../store/cookbook";

const EditCookbookModal = ({cookbook}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState(cookbook.name);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newCookbook = {
            id: cookbook.id,
            name,
        };
        let updatedCookbook = await dispatch(editCookbook(newCookbook))
        if (updatedCookbook) {
            closeModal();
            await dispatch(getCookbookDetail(cookbook.id))
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit cookbook</h1>
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
    );
};

export default EditCookbookModal
