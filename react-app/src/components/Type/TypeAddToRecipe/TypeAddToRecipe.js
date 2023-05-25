import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AddTypesToRecipe } from "../../../store/type";

const AddTypesRecipe = () => {
    const dispatch = useDispatch();

    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [type3, setType3] = useState("");
    const [type4, setType4] = useState("");
    const [type5, setType5] = useState("");
    const [type6, setType6] = useState("");
    const [type7, setType7] = useState("");
    const [type8, setType8] = useState("");
    const [type9, setType9] = useState("");
    const [type10, setType10] = useState("");
    const [type11, setType11] = useState("");
    const [type12, setType12] = useState("");
};

export default AddTypesRecipe
