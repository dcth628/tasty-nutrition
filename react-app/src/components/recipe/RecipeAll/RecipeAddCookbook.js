import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { currentUserCookbook, addRecipeCookbook } from "../../../store/cookbook";
import { Checkbox, TextField } from "@mui/material";
import { Autocomplete, Box } from "@mui/material";

const AddRecipeToCookbook = ({ recipeId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userCookbooks = useSelector(state => state?.cookbook)

    const [cookbook, setCookbook] = useState(0)

    useEffect(() => {
        dispatch(currentUserCookbook)
    }, [dispatch])

    const AddRecipeCookbook = async (e) => {
        e.preventDefault();
        await dispatch(addRecipeCookbook(recipeId, cookbook))
        closeModal()
    }
    let userCookbook = Object.values(userCookbooks).map(cookbook => cookbook.recipes)


    return (
        <>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                size="small"
                sx={{ width: 300 }}
                options={Object.values(userCookbooks)}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Cookbooks" />}
                onChange={(e, type) => setCookbook(type.id)}
            />
            <button onClick={AddRecipeCookbook}>Yes</button>
            <button onClick={closeModal}>No</button>
        </>
    )
};

export default AddRecipeToCookbook
