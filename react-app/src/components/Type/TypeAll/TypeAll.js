import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTypes } from "../../../store/type";

const AllTypes = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state?.type);


    useEffect(() => {
        dispatch(getAllTypes())
    },[dispatch])

    return(
        <>
        {Object.values(types).map((type) => (
            <p>{type.type}</p>
        ))}
        </>
    )
};

export default AllTypes
