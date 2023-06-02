import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCookbook, getAllCookbook} from "../../../store/cookbook";
import './CookbookDelete.css'

const DeleteCookbookModal = ({cookbookId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const DeleteCookbook = async (e) => {
        e.preventDefault();
        await dispatch(deleteCookbook(cookbookId));
        closeModal();
        await dispatch(getAllCookbook());
        await history.push('/cookbooks')
    };

    return (
        <div className="delete-form">
            <h1 className="delete-title">Confirm Delete</h1>
            <p>Are you sure you want to delete this cookbook?</p>
            <div>
            <button className='create-buttons' onClick={DeleteCookbook}>DELETE</button>
            <button className='create-buttons' onClick={closeModal}>CANCEL</button>
            </div>
        </div>
    );
};

export default DeleteCookbookModal
