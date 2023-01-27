import { NavLink } from "react-router-dom";
import design from "./offCanvas.module.scss";

const OffCanvas = (props) => {
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
          <NavLink className="navbar-brand navLogo logoFont me-5" to="/">
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
        <div className="offcanvas-body"></div>
      </div>
    </>
  );
};

export default OffCanvas;
