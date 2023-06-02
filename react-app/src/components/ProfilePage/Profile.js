import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import UserRecipe from "./UserRecipe";
import UserCookbook from "./UserCookbook";
import CreateIngredientFormModal from '../Ingredient/IngredientCreate/IngredientCreate';
import CreateCookbookFormModal from '../Cookbook/CookbookCreate/CookbookCreate';
import CreateRecipeModal from '../recipe/RecipeCreate/RecipeCreate';
import OpenModalButton from '../OpenModalButton';
import './Profile.css'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)


    return (
        <div>
            <div className="profile-button">

                <span>
                    <OpenModalButton
                        buttonText="CREATE INGREDIENT"
                        modalComponent={<CreateIngredientFormModal />}
                    />
                </span>
                <span>
                    <OpenModalButton
                        buttonText="CREATE RECIPE"
                        modalComponent={<CreateRecipeModal />}
                    />
                </span>
                <span>
                    <OpenModalButton
                        buttonText="CREATE COOKBOOK"
                        modalComponent={<CreateCookbookFormModal />}
                    />
                </span>
            </div>
            <UserCookbook />
            <UserRecipe />
        </div>
    )
};

export default ProfilePage
