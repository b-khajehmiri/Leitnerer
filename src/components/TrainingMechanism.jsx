import { useState, useMemo } from "react";
import getRandomElements from "../utils/GetRandomElements";
import "./flipCard.css";

const TrainingMechanism = (props) => {
  console.log("rendered");
  const [flip, setFlip] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const selectedTrainingCards = useMemo(() => {
    let cards = [];
    for (let i = 0; i < props.checkedDecks.length; i++) {
      cards = cards.concat(
        getRandomElements(
          props.checkedDecks[i].cards,
          props.checkedDecks[i].selectedCards
        )
      );
    }
    return getRandomElements(cards, cards.length);
  }, [props.checkedDecks]);

  const onBackSideButtons = () => {
    setFlip((flip) => !flip);
    setTimeout(() => {
      setCardIndex((index) => index + 1);
    }, 300);
  };

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
        className={` px-0 d-flex flex-column justify-content-center align-items-center mt-5 ${
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
                {selectedTrainingCards[cardIndex].back}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 p-0 m-0 d-flex justify-content-center">
        {!flip && (
          <button
            className="btn btn-primary mt-3 w-50"
            onClick={() => {
              setFlip((flip) => !flip);
            }}
          >
            Show back side
          </button>
        )}
        {flip && (
          <div
            class="btn-group w-50 mt-3"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              class="btn redButton"
              onClick={onBackSideButtons}
            >
              Wrong
            </button>
            <button
              type="button"
              class="btn btn-warning"
              onClick={onBackSideButtons}
            >
              Delayed correct
            </button>
            <button
              type="button"
              class="btn greenButton"
              onClick={onBackSideButtons}
            >
              Correct
            </button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4 cursorPointer">
        <p
          className="blueSmallLinks me-3"
          onClick={() => props.setIsTraining(false)}
        >
          I want to select cards again.
        </p>
        <p className="redSmallLinks ms-3">Finish!</p>
      </div>
    </div>
  );
};

export default TrainingMechanism;
