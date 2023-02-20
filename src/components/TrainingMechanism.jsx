import { useState } from "react";
import getRandomElements from "../utils/GetRandomElements";
import FlipCard from "./FlipCard";

const TrainingMechanism = (props) => {
  let selectedTrainingCards = [];
  const [cardIndex, setCardIndex] = useState(0);

  for (let i = 0; i < props.checkedDecks.length; i++) {
    selectedTrainingCards = selectedTrainingCards.concat(
      getRandomElements(
        props.checkedDecks[i].cards,
        props.checkedDecks[i].selectedCards
      )
    );
  }

  selectedTrainingCards = getRandomElements(
    selectedTrainingCards,
    selectedTrainingCards.length
  );

  // console.table(props.checkedDecks);
  console.log(selectedTrainingCards);

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
                  {deck.selectedCards} cards from {deck.name}
                </span>
              </li>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mt-4 px-0 d-flex flex-row justify-content-center">
        <div className="card w-75 border-primary">
          <div className="card-header bg-primary text-light fw-bolder">
            Front side:
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div>{selectedTrainingCards[cardIndex].front}</div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary mb-1 mt-5"
                  onClick={() => {
                    setCardIndex(cardIndex + 1);
                  }}
                >
                  Show back side
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
      <FlipCard/>
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
