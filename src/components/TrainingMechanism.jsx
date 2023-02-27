import { useState } from "react";
import getRandomElements from "../utils/GetRandomElements";
import "./flipCard.css";

const TrainingMechanism = (props) => {
  let selectedTrainingCards = [];
  const [flip, setFlip] = useState(false);
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

  return (
    <div className="row parent-element">
      {console.table(selectedTrainingCards)}
      <div className="pt-2 pb-3 rounded-3 ps-3 mt-4 bg-primary text-light">
        <div className="font17 d-flex flex-row justify-content-center fw-bolder mb-2">
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
      <div
        className={` px-0 d-flex flex-column justify-content-center align-items-center mt-3 ${
          flip ? "flip-scale-up-hor" : "flip-scale-up-hor2"
        }`}
      >
        <div class={`flip-card ${!flip ? "" : "flip-card-2"}`}>
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h4 className="fw-bolder mt-4">Front Side</h4>
              <p className="px-4 my-3 text-start textJustified">
                {selectedTrainingCards[cardIndex].front}
              </p>
            </div>
            <div class="flip-card-back">
              <h4 className="fw-bolder mt-4">Back Side</h4>
              <p className="px-4 my-3 text-start textJustified">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و در
                ستون و سطرآنچنان که لازم است
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 p-0 m-0 d-flex justify-content-center">
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            setFlip(!flip);
          }}
        >
          Show back side
        </button>
        <button className="btn btn-danger mt-3 ms-5">Finish</button>
      </div>
      <p className="d-flex justify-content-center mt-4 cursorPointer mx-2 mt-2 smallLinks">
        <small onClick={() => props.setIsTraining(false)}>
          I want to select cards again.
        </small>
      </p>
    </div>
  );
};

export default TrainingMechanism;
