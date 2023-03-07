import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import design from "./signUp.module.scss";
import bannerImg from "../images/bannerTop.png";
import ErrorHandler from "../utils/ErrorHandler";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [hiddenPass, setHiddenPass] = useState(true);
  const [loading, setLoading] = useState(false)


  const navsShow = {
    signUpShow: false,
    signInShow: true,
    otherLinksShow: false,
    logOUtShow: false,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        setLoading(true)
        await createUser(email, password);
        navigate("/account");
        toast.success("New user created and signed in.")
        setLoading(false)
      } catch (e) {
        setError(e.message);
        console.log(error);
      }
    } else {
      setError("Those passwords didn’t match. Try again.");
    }
  };

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container-lg">
        <div className="row mainRowHeight justify-content-center align-items-center">
          <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
            <div
              className={`card mx-4 my-5 w-100 border-primary rounded-4 ${design.signUpForm}`}
            >
              <div className="card-body">
                <div>
                  <h3 className="text-center mb-4 mt-3 text-primary">
                    Sign Up
                  </h3>
                </div>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      {ErrorHandler(error)}
                    </div>
                  )}
                  <label htmlFor="email" className="form-label">
                    Email Address:
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control mb-3 border-primary"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <div className="input-group mb-3">
                    <input
                      id="password"
                      type={hiddenPass ? "password" : "text"}
                      className="form-control border-primary"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                      className={`fa-solid ${hiddenPass ? "fa-eye" : "fa-eye-slash"} input-group-text d-flex text-primary border-primary ${design.passwordIcon}`}
                      onClick={() => setHiddenPass(!hiddenPass)}
                    ></i>
                  </div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                  </label>
                  <div className="input-group">
                    <input
                      id="confirmPassword"
                      type={hiddenPass ? "password" : "text"}
                      className="form-control border-primary"
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                    <i
                      className={`fa-solid ${hiddenPass ? "fa-eye" : "fa-eye-slash"} input-group-text d-flex text-primary border-primary ${design.passwordIcon}`}
                      onClick={() => setHiddenPass(!hiddenPass)}
                    ></i>
                  </div>
                  <button className="btn w-100 btn-primary mt-4 mb-4" disabled={loading}>
                    Sign Up
                  </button>
                  <p className="text-center mt-4">
                    Do you have an account?
                    <Link to="/" className="text-decoration-none ms-2">
                      Sign in!
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
            <div className="px-4 pb-4 px-md-0">
              <h2 className={`${design.explain} logoFont`}>Leitnerer</h2>
              <p className={`${design.explain}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                quidem qui? Provident sed voluptates exercitationem similique id
                autem, reprehenderit eum facilis corrupti voluptate? Impedit
                earum tempora molestias necessitatibus, laboriosam voluptatibus.
              </p>
            </div>
            <img
              src={bannerImg}
              alt="banner"
              className={`img-fluid px-5 px-md-0 figure-img ${design.LeitnerBox}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
