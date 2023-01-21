import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import bannerImg from "../images/bannerImg.png"
import design from "./signIn.module.scss"

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
          <div className={`card mx-4 ${design.signInForm}`}>
            <div className="card-body">
              <div>
                <h1>Sign in to your account</h1>
                <p>
                  Don't have an account yet? <Link to="/signUp">Sign up.</Link>
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-warning">Sign In</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
          <img src={bannerImg} alt="banner" className={`img-fluid px-5 px-md-0 figure-img ${design.bbb}`} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
