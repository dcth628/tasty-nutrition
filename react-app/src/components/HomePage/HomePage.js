import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCookbook } from "../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import { getAllTypes } from "../../store/type";
import { getAllIngredients } from "../../store/ingredient";
import { getAllRecipes } from "../../store/recipe";
import AllCookbooks from "../Cookbook/CookbookAll/CookbookAll";

const HomePage = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(state => state?.ingredient)
    const cookbooks = useSelector(state => state?.cookbook);
    const recipes = useSelector(state => state?.recipe);
    const types = useSelector(state => state?.type)
    const fruits = Object.values(ingredients).filter(ingredient => ingredient.type === "Fruit")
    const proteins = Object.values(ingredients).filter(ingredient => ingredient.type === "Protein")
    const vegetables = Object.values(ingredients).filter(ingredient => ingredient.type === "Vegetable")
    const grains = Object.values(ingredients).filter(ingredient => ingredient.type === "Grains")
    const dairy = Object.values(ingredients).filter(ingredient => ingredient.type === "Dairy")
    useEffect(() => {
        dispatch(getAllIngredients())
        dispatch(getAllCookbook())
        dispatch(getAllRecipes())
        dispatch(getAllTypes())
    }, [dispatch])

    return (
        <>

        </>

    )
};

export default HomePage
