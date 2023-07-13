import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push('/')
    }
  };

  return (
    <div className="signup">
      <div className="login-img">
        <img src="https://res.cloudinary.com/ddxewbhmy/image/upload/v1689050385/Savory-Cottage-Cheese-Bowl-2_yzhg9q.webp" alt="food pic"></img>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Log In</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button className='sign-up' type="submit">Log In</button>
        <div>Don't have an account? <OpenModalButton buttonText="SIGN UP" modalComponent={<SignupFormModal />}/></div>
      </form>
    </div>
  );
}

export default LoginFormModal;
