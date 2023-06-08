import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Navigation.css'
import { useModal } from "../../context/Modal";
import { currentUserCookbook } from "../../store/cookbook";
import { currentUserRecipes } from "../../store/recipe";
import * as seesionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {

      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();
    return dispatch(seesionActions.login('demo@aa.io', 'password'))
    .then(closeModal)
    .then(dispatch(currentUserCookbook()))
    .then(dispatch(currentUserRecipes()))
    .then(history.push('/'))
};

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <div>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <div className="dropdown">
            <div>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>
            <div>
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
            <div>
            <button onClick={demoUserLogin} >Demo User</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
