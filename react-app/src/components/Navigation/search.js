import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Search } from "@mui/icons-material";
import { search } from "../../store/search";
import './Search.css'

const SearchBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [input , setInput ] = useState("");

    const results = useSelector(state => state.search);
    // const ingredients = results.ingredients;
    const recipes = results.recipes;
    const cookbooks = results.cookbooks;

    useEffect(() => {
        if (input.length > 0) {
            dispatch(search(input));
        };
    }, [dispatch, input]);

    const show = () => {
        document.querySelector(".search-results").classList.remove('hidden');
    };

    const hide = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelector(".search-results").classList.add('hidden');
        };
    };

    const reset1 = (id) => {
        document.querySelector(".search-results").classList.add("hidden");
        history.push(`/recipes/${id}`);
        setInput("")
    };

    const reset2 = (id) => {
        document.querySelector(".search-results").classList.add("hidden");
        history.push(`/cookbooks/${id}`);
        setInput("")
    };

    console.log(cookbooks, '--cookbook')
    return (
        <div className="search-bar">
            <input
            type="text"
            className="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => show()}
            placeholder="Search..."
             />
            <div className="search-container" onBlur={(e) => hide(e)}>
                <div className="search-results hidden" >
                    {recipes && (recipes.length > 0 && input?.length > 0 ?
                    <div>
                        <div className="search-card-title" onMouseDown={(e) => hide(e)}>Recipes</div>
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="search-card" onMouseDown={() => reset1(recipe.id)}>
                                {recipe.name}
                            </div>
                        ))}
                    </div>
                    : (input?.length > 0 ? <div className="search-none">No Recipe Match</div> :
                    <div className="search-none hidden"> No Recipe Match</div>)
                        )}
                    {cookbooks && (cookbooks.length > 0 && input?.length > 0 ?
                    <div>
                        <div className="search-card-title" onMouseDown={(e) => hide(e)}>Cookbooks</div>
                    {cookbooks.map((cookbook) => (
                        <div key={cookbook.id} className="search-card" onMouseDown={() => reset2(cookbook.id)}>
                            {cookbook.name}
                        </div>
                    )) }
                    </div>
                    : (input?.length > 0 ? <div className="search-none">No Cookbook Match</div> :
                    <div className="search-none hidden">No Cookbook Match</div>)
                    )}
                </div>
            </div>
        </div>
    )

};

export default SearchBar
