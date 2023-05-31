import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCookbook } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteCookbookModal from "../CookbookDelete/CookbookDelete";
import OpenModalButton from "../../OpenModalButton";

const AllCookbooks = () => {
    const dispatch = useDispatch();
    const cookbooks = useSelector(state => state?.cookbook);
    const sessionUser = useSelector(state => state?.session.user);


    useEffect(() => {
        dispatch(getAllCookbook())
    }, [dispatch])

    return (
        <>
        {Object.values(cookbooks).map(cookbook => (
            <div>
                <NavLink to={`/cookbooks/${cookbook.id}`}>
                    {cookbook.name}
                </NavLink>
                <OpenModalButton
                buttonText={'Delete Cookbook'}
                modalComponent={<DeleteCookbookModal cookbookId={cookbook.id} />} />
            </div>
        ))}
        </>
    )
};

export default AllCookbooks
