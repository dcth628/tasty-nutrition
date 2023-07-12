import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './search';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
			<div className='header'>
				<h3 className='logo'>Tasty Nutrition</h3>
				<div className='nav-title'>
					<SearchBar />
				</div>
				<div className='nav-bar'>
					{isLoaded && (
						<>
							<div className='nav-title'>
								<NavLink exact to='/'>Profile</NavLink>
							</div>
							<div className='nav-title'>
								<NavLink exact to="/recipes">Recipes</NavLink>
							</div>
							<div className='nav-title'>
								<NavLink exact to="/ingredients">Ingredients</NavLink>
							</div>
							<div className='nav-title'>
								<NavLink exact to="/cookbooks">Cookbooks</NavLink>
							</div>
							<div>
								<ProfileButton user={sessionUser} />
							</div>
						</>
					)}
				</div>
			</div>
			<div className="footer">
				<div>
					<a href='https://github.com/dcth628/' target="_blank">
						<i className='fab fa-github'></i>
					</a>
					<a href='https://www.linkedin.com/in/deanhsieh/' target="_blank">
						<i className='fab fa-linkedin-in'></i>
					</a>
				</div>
				<div>Term of Use ・ Privacy Policy</div>
				<p>&copy; 2023 Copyright Dean Hsieh </p>
			</div>
		</div>
	);
}

export default Navigation;
