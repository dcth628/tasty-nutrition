import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCookbook } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteCookbookModal from "../CookbookDelete/CookbookDelete";
import OpenModalButton from "../../OpenModalButton";

const AllCookbooks = () => {
    const dispatch = useDispatch();
    const cookbooks = useSelector(state => state?.cookbook);
    const sessionUser = useSelector(state => state?.session.user);

    useEffect(() => {
        dispatch(getAllCookbook())
    }, [dispatch])

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

    return (
        <div>
            {cookbooks &&  (
                <div className="cookbook-page">
                    <h2 className="cookbook-page-title">Cookbooks</h2>
                    {Object.values(cookbooks).map(cookbook => (
                        <div>
                            <div key={cookbook.id} className="cookbook-button">
                                <div>
                                    <NavLink to={`/cookbooks/${cookbook.id}`}>
                                        <h3 className="cookbook-title">{cookbook.name}</h3>
                                    </NavLink>
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
                                            <tbody>
                                            <tr className="recipe-list">
                                                <th>{recipe.name}</th>
                                                {/* <th className="last-column">by {recipe.username}</th> */}
                                                <th>
                                                    {recipe.types.map(type => <img className="recipe-type" id={type.id}src={type.img} width={30} height={30} />)}
                                                </th>
                                                <th className="last-column">Serving: {recipe.serving}</th>
                                                <th className="last-column"><i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}</th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </NavLink>

                                </>
                            ))) :
                                <p className="no-recipe">Add Some Recipes</p>}
                        </div>
                    ))}
                </div>
            ) }
        </div>
    )
};

export default AllCookbooks
