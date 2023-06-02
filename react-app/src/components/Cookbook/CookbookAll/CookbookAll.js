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

    console.log(Object.values(cookbooks), '--cookbooks')

    useEffect(() => {
        dispatch(getAllCookbook())
    }, [dispatch])

    return (
        <div>
            {cookbooks &&  (
                <div className="cookbook-page">
                    <h1 className="cookbook-page-title">Cookbooks</h1>
                    {Object.values(cookbooks).map(cookbook => (
                        <div>
                            <div key={cookbook.id} className="cookbook-button">
                                <div>
                                    <NavLink to={`/cookbooks/${cookbook.id}`}>
                                        <h2 className="cookbook-title">{cookbook.name}</h2>
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

                                            <tr className="recipe-list">
                                                <th>{recipe.name}</th>
                                                {/* <th className="last-column">by {recipe.username}</th> */}
                                                <th>
                                                    {recipe.types.map(type => <img className="recipe-type" id={type.id}src={type.img} width={30} height={30} />)}
                                                </th>
                                                <th className="last-column">Serving: {recipe.serving}</th>
                                                <th className="last-column"><i className="far fa-clock"></i> {recipe.cooktime} mins</th>
                                            </tr>
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
