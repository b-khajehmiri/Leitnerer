import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import bannerImg from "../images/bannerTop.png";
import design from "./signIn.module.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="container-lg">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
          <div
            className={`card mx-4 my-5 w-100 border-primary rounded-4 ${design.signInForm}`}
          >
            <div className="card-body">
              <div>
                <h3 className="text-center mb-4 text-primary">Sign in</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control mb-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn w-100 btn-primary mt-4 mb-4">
                  Sign In
                </button>
                <p className="text-center">
                  Don't have an account yet?{" "}
                  <Link to="/signUp">Sign up now!</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
          <div className="px-4 pb-4 px-md-0">
            <h2  className={`${design.explain}`}>Leitnerer</h2>
            <p className={`${design.explain}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
              quidem qui? Provident sed voluptates exercitationem similique id
              autem, reprehenderit eum facilis corrupti voluptate? Impedit earum
              tempora molestias necessitatibus, laboriosam voluptatibus.
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
  );
};

export default SignIn;
