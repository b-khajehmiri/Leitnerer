import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavBar = (props) => {
  
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top" style={{fontSize:"17px"}}>
      <div className="container-lg">
        <NavLink className="navbar-brand navLogo logoFont me-5" to="/">
          Leitnerer
        </NavLink>
        <button className="d-lg-none hamburgerMenu">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item me-4">
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
                style={{display: props.navsShow.otherLinksShow ? "flex" : "none"}}
              >
                Account
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/cardsTable"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
                style={{display: props.navsShow.otherLinksShow ? "flex" : "none"}}
              >
                Cards Table
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/training"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
                style={{display: props.navsShow.otherLinksShow ? "flex" : "none"}}
              >
                Training
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/addCards"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
                style={{display: props.navsShow.otherLinksShow ? "flex" : "none"}}
              >
                Add Cards
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item me-4">
              <NavLink
                to="/signUp"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
                style={{display: props.navsShow.signUpShow ? "flex" : "none"}}
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
                style={{display: props.navsShow.signInShow ? "flex" : "none"}}
              >
                Sign In
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <button
                onClick={() => handleLogout()}
                className="logOutButton"
                style={{display: props.navsShow.logOUtShow ? "flex" : "none"}}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
