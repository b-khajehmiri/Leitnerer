import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import design from "./offCanvas.module.scss";

const OffCanvas = (props) => {
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
    <>
      <div
        className={`offcanvas offcanvas-start offCanvasMain d-lg-none
        ${design.offCanvasMain}
        ${props.offCanvasShow ? "show" : "hiding"}
        `}
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <NavLink className="navbar-brand offCanvasLogo logoFont me-5" to="/">
            Leitnerer
          </NavLink>
          <button
            type="button"
            className="closeButton"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => props.setOffCanvasShow(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body font17">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive ? "activeOffcanvasLink" : "inactiveOffcanvasLink"
                }
                style={{
                  display: props.navsShow.otherLinksShow ? "flex" : "none",
                }}
              >
                Account
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cardsTable"
                className={({ isActive }) =>
                  isActive ? "activeOffcanvasLink" : "inactiveOffcanvasLink"
                }
                style={{
                  display: props.navsShow.otherLinksShow ? "flex" : "none",
                }}
              >
                Cards Table
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/training"
                className={({ isActive }) =>
                  isActive ? "activeOffcanvasLink" : "inactiveOffcanvasLink"
                }
                style={{
                  display: props.navsShow.otherLinksShow ? "flex" : "none",
                }}
              >
                Training
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/addCards"
                className={({ isActive }) =>
                  isActive ? "activeOffcanvasLink" : "inactiveOffcanvasLink"
                }
                style={{
                  display: props.navsShow.otherLinksShow ? "flex" : "none",
                }}
              >
                Add Cards
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item me-4">
              <NavLink
                to="/signUp"
                className={({ isActive }) =>
                  isActive ? "activeOffcanvasLink" : "inactiveOffcanvasLink"
                }
                style={{
                  display: props.navsShow.signUpShow ? "flex" : "none",
                }}
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "activeOffcanvasLink" : "inactiveOffcanvasLink"
                }
                style={{
                  display: props.navsShow.signInShow ? "flex" : "none",
                }}
              >
                Sign In
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <button
                onClick={handleLogout}
                className="offcanvasLogOutButton"
                style={{
                  display: props.navsShow.logOUtShow ? "flex" : "none",
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OffCanvas;
