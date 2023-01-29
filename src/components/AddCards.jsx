import axios from "axios";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import design from "./addCard.module.scss";
import { useNavigate } from "react-router-dom";

const AddCards = () => {
  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const { user } = UserAuth();
  const navigate = useNavigate();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  async function addCard(e) {
    e.preventDefault();
    try {
       await axios.post(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}.json`,
        { front: front, back: back, deck: 0 }
      );
      setFront("");
      setBack("");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container-lg">
        <div className="row mainRowHeight justify-content-center align-items-center">
          <div
            className={`card mx-4 my-5 w-100 border-primary rounded-4 ${design.AddCardForm}`}
          >
            <div className="card-body">
              <h3 className="text-center mb-4 mt-3 text-primary">
                Add New Card
              </h3>
              <form onSubmit={addCard}>
                <label htmlFor="frontSide" className="form-label">
                  Front side:
                </label>
                <textarea
                  id="frontSide"
                  type="text"
                  className="form-control mb-3 border-primary"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                />
                <label htmlFor="backSide" className="form-label">
                  Back side:
                </label>
                <textarea
                  id="backSide"
                  type="text"
                  className="form-control mb-3 border-primary"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                />
                <button className="btn w-100 greenButton mt-3 mb-4">Add</button>
              </form>
              <div className="row">
                <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
                  <button
                    className="btn w-100 btn-primary mt-3 mb-4"
                    onClick={() => navigate("/training")}
                  >
                    Train Now
                  </button>
                </div>
                <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
                  <button
                    className="btn w-100 btn-primary mt-3 mb-4"
                    onClick={() => navigate("/cardsTable")}
                  >
                    Review Cards
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {console.log(front,back)}
    </>
  );
};

export default AddCards;
