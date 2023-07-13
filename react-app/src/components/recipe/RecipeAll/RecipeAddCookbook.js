import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { currentUserCookbook, addRecipeCookbook } from "../../../store/cookbook";
import { TextField } from "@mui/material";
import { Autocomplete, Box } from "@mui/material";

const AddRecipeToCookbook = ({ recipeId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const cookbooks = useSelector(state => state?.cookbook)
    const sessionUser = useSelector(state=> state?.session.user)
    const recipe = useSelector(state=> state?.recipe[recipeId])
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

    for( var i=userCookbooks.length - 1; i>=0; i--){
        for( var j=0; j<recipe.cookbook.length; j++){
            if(userCookbooks[i] && (userCookbooks[i].name === recipe.cookbook[j].name)){
                userCookbooks.splice(i, 1);
            }
        }
    }

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
