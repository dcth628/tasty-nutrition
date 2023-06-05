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
        <form className="cookbook-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Edit Cookbook</h3>
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
            <button className='confrim-buttons' type="submit">EDIT</button>
            <button className='create-buttons' type="button" onClick={handleCancelClick}>CANCEL</button>
            </div>
        </form>
    );
};

export default EditCookbookModal
