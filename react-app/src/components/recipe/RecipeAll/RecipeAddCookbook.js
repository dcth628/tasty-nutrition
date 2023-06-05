import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { currentUserCookbook, addRecipeCookbook } from "../../../store/cookbook";
import { Checkbox, TextField } from "@mui/material";
import { Autocomplete, Box } from "@mui/material";

const AddRecipeToCookbook = ({ recipeId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const cookbooks = useSelector(state => state?.cookbook)
    const sessionUser = useSelector(state=> state?.session.user)
    const userCookbooks = Object.values(cookbooks).filter(cookbook => cookbook.user_id === sessionUser.id)

    const [cookbook, setCookbook] = useState(0)

    useEffect(() => {
        dispatch(currentUserCookbook())
    }, [dispatch])

    const AddRecipeCookbook = async (e) => {
        e.preventDefault();
        await dispatch(addRecipeCookbook(recipeId, cookbook))
        closeModal()
    }
    let userCookbook = Object.values(userCookbooks).map(cookbook => cookbook.recipes)


    return (
        <div className="delete-form">
            <h3>Select A Cookbook</h3>
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
                renderInput={(params) => <TextField {...params} label="Cookbook" />}
                onChange={(e, type) => setCookbook(type.id)}
            />
            <div>
            <button className='confrim-buttons' onClick={AddRecipeCookbook}>YES</button>
            <button className='create-buttons' onClick={closeModal}>CANCEL</button>
            </div>
        </div>
    )
};

export default AddRecipeToCookbook
