import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateIngredientFormModal from '../Ingredient/IngredientCreate/IngredientCreate';
import OpenModalButton from '../OpenModalButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
					<div>
						<OpenModalButton
							buttonText="Ingredient"
							modalComponent={<CreateIngredientFormModal />}
						/> Create Ingredient
					</div>
				</>
			)}
		</ul>
	);
}

export default Navigation;
