import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateIngredientFormModal from '../Ingredient/IngredientCreate/IngredientCreate';
import CreateCookbookFormModal from '../Cookbook/CookbookCreate/CookbookCreate';
import OpenModalButton from '../OpenModalButton';
import './Navigation.css';
import CreateRecipeModal from '../recipe/RecipeCreate/RecipeCreate';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='header'>
			<h3 className='logo'>Tasty Nutrition</h3>
			<div className='nav-bar'>
				{/* <div>
					<NavLink exact to="/">Home</NavLink>
				</div> */}
				{isLoaded && (
					<>
						<div>
							<NavLink exact to='/profile'>Profile</NavLink>
						</div>
						<div>
							<NavLink exact to="/recipes">Recipes</NavLink>
						</div>
						<div>
							<NavLink exact to="/ingredients">Ingredients</NavLink>
						</div>
						<div>
							<NavLink exact to="/cookbooks">Cookbooks</NavLink>
						</div>
						<div>
							<ProfileButton user={sessionUser} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Navigation;
