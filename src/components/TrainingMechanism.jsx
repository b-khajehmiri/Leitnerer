import { useNavigate } from "react-router-dom";
import design from "./trainingMechanism.module.scss";

const TrainingMechanism = (props) => {
  const navigate = useNavigate();

  return (
    <div className="row">
      <div
        className="pt-2 pb-3 rounded-3 ps-3 text-dark mt-4 border-1 border border-dark"
        style={{ backgroundColor: "#FFDB13" }}
      >
        <div className="mb-3 font17 d-flex flex-row justify-content-center fw-bolder">
          <i className="fa-solid fa-circle-info mt-1 me-1"></i>
          Smart Leitnerer selected cards for training as below:
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {props.checkedDecks.map((deck) => (
            <div key={deck.name}>
              <li className="noBullet me-3">
                <i className="fa-solid fa-check"></i>
                <span className="ms-1">
                  {deck.cardsNumber} cards from {deck.name}
                </span>
              </li>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 px-0 d-flex flex-row justify-content-center">
        <div className="card w-75 border-primary">
          <div className="card-header bg-primary text-light fw-bolder">
            Front side:
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
              mollitia alias assumenda rerum facilis, illum officiis tempora,
              fugit reiciendis dolorum quis aut quod corporis ad corrupti minima
              expedita velit ipsum.
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary mb-2 mt-5 w-50">
                  Show back side
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p
        className="d-flex justify-content-center mt-4 cursorPointer mx-2 mt-2 smallLinks"
        onClick={() => props.setIsTraining(false)}
      >
        <small>I want to select cards again.</small>
      </p>
    </div>
  );
};

export default TrainingMechanism;
