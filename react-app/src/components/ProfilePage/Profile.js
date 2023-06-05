import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
    const history = useHistory()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)

    const handleRedirect = (e) => {
        e.preventDefault();
        history.push('/recipes/create')
    };

    return (
        <div className="profile-page">
            <div className="create-button">

                <span>
                    <OpenModalButton
                        buttonText="CREATE INGREDIENT"
                        modalComponent={<CreateIngredientFormModal />}
                    />
                </span>
                <span>
                    <button className="create-buttons"
                    onClick={handleRedirect}>CREATE RECIPE</button>
                </span>
                {/* <span>
                    <OpenModalButton
                        buttonText="CREATE RECIPE"
                        modalComponent={<CreateRecipeModal />}
                    />
                </span> */}
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
