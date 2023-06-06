import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { currentUserCookbook } from "../../store/cookbook";
import DeleteCookbookModal from "../Cookbook/CookbookDelete/CookbookDelete";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeCookbookModal from "../Cookbook/CookbookDetail/RemoveRecipe";
import './UserCookbook.css'

const UserCookbook = () => {
    const dispatch = useDispatch();
    const cookbooks = useSelector(state => state?.cookbook);
    const sessionUser = useSelector(state => state?.session.user);
    const userCookbook = Object.values(cookbooks).filter(cookbook => cookbook.user_id == sessionUser.id)

    useEffect(() => {
        dispatch(currentUserCookbook())
    }, [dispatch])

    return (
        <div>
            {userCookbook && userCookbook.length > 0 ? (
                <div className="user-cookbook-page">
                    <h2 className="recipe-title">Cookbooks</h2>
                    {userCookbook.map(cookbook => (
                        <div>
                            <div key={cookbook.id} className="cookbook-button">
                                <div>
                                    <NavLink to={`/cookbooks/${cookbook.id}`}>
                                        <h3 className="cookbook-title">{cookbook.name}</h3>
                                    </NavLink>
                                </div>
                                <div className="delete-cookbook">
                                    <OpenModalButton
                                        buttonText={'Delete Cookbook'}
                                        modalComponent={<DeleteCookbookModal cookbookId={cookbook.id} />} />
                                </div>
                            </div>
                            {/* <tr>
                                    <th>Recipe Name</th>
                                    <th>By</th>
                                    <th>Serving</th>
                                    <th>Cook Time</th>
                                </tr> */}
                            {cookbook.recipes.length > 0 ? (cookbook.recipes.map(recipe => (
                                <>
                                            <NavLink to={`/recipes/${recipe.id}`}>
                                    <table className="cookbook-table">

                                        <tr>
                                                <th className="first-column">{recipe.name}</th>
                                                {/* <th className="last-column">by {recipe.username}</th> */}
                                                <th>
                                                    {recipe.types.map(type => <img className="recipe-type" id={type.id} src={type.img} width={23} height={23} />)}
                                                </th>
                                                <th className="last-column">Serving: {recipe.serving}</th>
                                                <th className="last-column"><i className="far fa-clock"></i> {recipe.cooktime} mins</th>
                                            <th className="last-column">
                                                <OpenModalButton
                                                    buttonText={'Delete Cookbook'}
                                                    modalComponent={<DeleteRecipeCookbookModal recipeId={recipe.id} cookbookId={cookbook.id} />} />
                                            </th>
                                        </tr>
                                    </table>
                                                    </NavLink>

                                </>
                            ))) :
                                <p className="no-recipe">Add Some Recipes</p>}
                        </div>
                    ))}
                </div>
            ) : <> no cookbook</>}
        </div>
    );
};

export default UserCookbook
