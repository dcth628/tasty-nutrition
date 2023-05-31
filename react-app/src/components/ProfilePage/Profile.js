import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import UserRecipe from "./UserRecipe";
import UserCookbook from "./UserCookbook";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)


    return (
        <div>
            <UserCookbook />
            <UserRecipe />
        </div>
    )
};

export default ProfilePage
