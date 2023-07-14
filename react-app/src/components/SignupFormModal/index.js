import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { currentUserCookbook } from "../../store/cookbook";
import { currentUserRecipes } from "../../store/recipe";
import * as seesionActions from '../../store/session'
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [image, setImage] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName, image));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const demoUserLogin = async (e) => {
		e.preventDefault();
		return dispatch(seesionActions.login('demo@aa.io', 'password'))
		.then(closeModal)
		.then(dispatch(currentUserCookbook()))
		.then(dispatch(currentUserRecipes()))
		.then(history.push('/'))
	};

	return (
		<div className="signup">
			<div className="signup-img">
		<img src="https://res.cloudinary.com/ddxewbhmy/image/upload/v1689048389/Spicy-Vodka-Chicken-Parmesan-8_dvytmj.jpg" alt="food pic"></img>
			</div>
			<form className="signup-form" onSubmit={handleSubmit}>
			<h3 className="form-title">Sign Up</h3>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="input-group">
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
					<label>First Name</label>
				</div>
				<div className="input-group">
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
					<label>Last Name</label>
				</div>
				{/* <div className="input-group">
					<input
						type="text"
						value={image}
						required
						onChange={(e) => setImage(e.target.value)}
					/>
					<label>Profile Photo</label>
				</div> */}
				<div className="input-group">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label>Email</label>
				</div>
				<div className="input-group">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label>Username</label>
				</div>
				<div className="input-group">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<label>Password</label>
				</div>
				<div className="input-group">
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<label>Confirm Password</label>
				</div>
				<button className='sign-up' type="submit">Sign Up</button>
			<div>Have an account? <OpenModalButton buttonText="LOG IN" modalComponent={<LoginFormModal />}/></div>
			<div >Log in as a <button className="demo" onClick={demoUserLogin} >Demo User</button></div>
			</form>
		</div>
	);
}

export default SignupFormModal;
