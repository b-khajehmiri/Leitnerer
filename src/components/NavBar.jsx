import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <div className="container-lg">
        <a className="navbar-brand navLogo logoFont me-5" href="#">
          Leitnerer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item me-4">
              <NavLink
                to="/signUp"
                className={({ isActive }) =>
                  isActive ? "activeNavLink" : "inactiveNavLink"
                }
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
              >
                Sign In
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
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
