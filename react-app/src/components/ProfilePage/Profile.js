import { useSelector } from "react-redux";
import {  useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserRecipe from "./UserRecipe";
import UserCookbook from "./UserCookbook";
import CreateIngredientFormModal from '../Ingredient/IngredientCreate/IngredientCreate';
import CreateCookbookFormModal from '../Cookbook/CookbookCreate/CookbookCreate';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Profile.css'

const ProfilePage = () => {
    const history = useHistory()
    const sessionUser = useSelector((state) => state?.session.user);
    // const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)

    const handleRedirect = (e) => {
        e.preventDefault();
        history.push('/recipes/create')
    };

    return (
        <div>
            {sessionUser ? (
                <div>
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
                        <span>
                            <OpenModalButton
                                buttonText="CREATE COOKBOOK"
                                modalComponent={<CreateCookbookFormModal />}
                            />
                        </span>
                    </div>
                    <div>
                        <UserCookbook />
                    </div>
                    <div className="userrecipe">
                        <UserRecipe />
                    </div>
                </div>) :
                <p className="profile-page">Please <OpenModalButton
                buttonText="LOG IN"
                modalComponent={<LoginFormModal />}
              /> or <OpenModalButton
              buttonText="SIGN UP"
              modalComponent={<SignupFormModal />}
            /></p>}
        </div>
    )
};

export default ProfilePage
