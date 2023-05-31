import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCookbook, getAllCookbook} from "../../../store/cookbook";

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
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this cookbook?</p>
            <button onClick={DeleteCookbook}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
};

export default DeleteCookbookModal
