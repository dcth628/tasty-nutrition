import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { currentUserCookbook, getAllCookbook } from "../../store/cookbook";
import DeleteCookbookModal from "../Cookbook/CookbookDelete/CookbookDelete";
import OpenModalButton from "../OpenModalButton";
import Tooltip from '@mui/material/Tooltip';
import DeleteRecipeCookbookModal from "../Cookbook/CookbookDetail/RemoveRecipe";
import './UserCookbook.css'

const UserCookbook = () => {
    const dispatch = useDispatch();
    const cookbooks = useSelector(state => state?.cookbook);
    const sessionUser = useSelector(state => state?.session.user);
    const userCookbook = Object.values(cookbooks).filter(cookbook => cookbook.user_id == sessionUser.id)

    const cooktimeLength = (data) => {
        const min = data % 60
        const hour = (data - min) / 60
        if (min === 0 && hour === 1) {
            return `${hour} hour 00 min`
        }
        if (min < 10 && hour === 1) {
            return `${hour} hour 0${min} min`
        }
        if (min >= 10 && hour === 1) {
            return `${hour} hour ${min} mins`
        }
        if (hour > 1 && min < 10) {
            return `${hour} hours 0${min} min`
        }
        if (hour > 1 && min === 0) {
            return `${hour} hours 00 min`
        }
        if (hour === 0 && min < 10) {
            return `0${min} mins`
        }
        if (hour === 0 && min >= 10) {
            return `${min} mins`
        }
        return `${hour} hours ${min} mins`
    };

    useEffect(() => {
        dispatch(getAllCookbook())
        dispatch(currentUserCookbook())
    }, [dispatch])

    return (
        <div>
            {userCookbook && userCookbook.length > 0 ? (
                <div className="user-cookbook-page">
                    <h2 className="recipe-title">Cookbooks</h2>
                    {userCookbook.map(cookbook => (
                        <div key={cookbook.id}>
                            <div className="cookbook-button">
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
                                <div key={recipe.id}>
                                    <NavLink to={`/recipes/${recipe.id}`}>
                                        <table className="cookbook-table">
                                            <tbody>
                                                <tr>
                                                    <th className="first-column">{recipe.name}</th>
                                                    {/* <th className="last-column">by {recipe.username}</th> */}
                                                    <th>
                                                        {recipe.types.map(type => (
                                                            <>
                                                                <Tooltip title={type.types} arrow>
                                                                    <img className="recipe-type" alt={type.tpyes} id={type.id} src={type.img} width={23} height={23} />
                                                                </Tooltip>
                                                            </>
                                                        ))}
                                                    </th>
                                                    <th className="last-column">Serving: {recipe.serving}</th>
                                                    <th className="last-column"><i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}</th>
                                                    <th className="last-column">
                                                        <OpenModalButton
                                                            buttonText={'Delete Cookbook'}
                                                            modalComponent={<DeleteRecipeCookbookModal recipeId={recipe.id} cookbookId={cookbook.id} />} />
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </NavLink>

                                </div>
                            ))) :
                                <p className="no-recipe">Add Some Recipes</p>}
                        </div>
                    ))}
                </div>
            ) : <h2 className="no-title"> No Cookbook</h2>}
        </div>
    );
};

export default UserCookbook
