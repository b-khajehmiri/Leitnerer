import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getRandomElements from "../utils/GetRandomElements";
import "./flipCard.css";
import design from "./trainingMechanism.module.scss";

const TrainingMechanism = (props) => {
  const userId = window.localStorage.getItem("user");
  const [cards, setCards] = useState([]);
  const [flip, setFlip] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [finishModalShow, setFinishModalShow] = useState(false);
  const [modalMode, setModalMode] = useState("completed");
  const navigate = useNavigate();

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

  const onBackSideButtons = (card, answerType) => {
    setFlip((flip) => !flip);
    if (cardIndex < selectedTrainingCards.length - 1) {
      setTimeout(() => {
        setCardIndex((cardIndex) => cardIndex + 1);
      }, 300);
    } else {
      setModalMode("completed");
      setFinishModalShow(true);
    }

    DeckModification(card, answerType);
  };

  async function getCards() {
    try {
      const res = await axios.get(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`
      );
      let keys = Object.keys(res.data);
      let values = Object.values(res.data);
      values.map((v, index) => (v.id = keys[index]));
      setCards(values);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  async function DeckModification(card, answerType) {
    try {
      let currentCard = cards.filter((c) => c.front === card.front)[0];
      if (answerType === "wrong") {
        if (currentCard.deck !== 0) {
          currentCard.deck = currentCard.deck - 1;
          toast.error("The card demoted by a level!", {
            position: "top-left",
          });
        } else {
          toast.error("The card remained in its previous level!", {
            position: "top-left",
          });
        }
      } else if (answerType === "Correct") {
        if (currentCard.deck < 7) {
          toast.success("The card promoted by a level!", {
            position: "top-left",
          });
          currentCard.deck = currentCard.deck + 1;
        } else {
          toast.success("The card remained in its previous level!", {
            position: "top-left",
          });
        }
      } else {
        toast.warning("The card remained in its previous level!", {
          position: "top-left",
        });
      }
      await axios.put(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}/${card.id}.json`,
        currentCard
      );
    } catch (err) {
      console.log(err);
    }
  }

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
              <p className="px-4 my-3 text-start textJustified fs-5">
                {selectedTrainingCards[cardIndex].front}
              </p>
            </div>
            <div class="flip-card-back">
              <h4 className="fw-bolder mt-4">Back Side</h4>
              <p className="px-4 my-3 text-start textJustified fs-5">
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
            class="btn-group mt-3"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              class="btn redButton"
              onClick={() =>
                onBackSideButtons(selectedTrainingCards[cardIndex], "wrong")
              }
            >
              Wrong
            </button>
            <button
              type="button"
              class="btn btn-warning"
              onClick={() =>
                onBackSideButtons(
                  selectedTrainingCards[cardIndex],
                  "DelayedCorrect"
                )
              }
            >
              Delayed correct
            </button>
            <button
              type="button"
              class="btn greenButton"
              onClick={() =>
                onBackSideButtons(selectedTrainingCards[cardIndex], "Correct")
              }
            >
              Correct
            </button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-2 cursorPointer">
        <p
          className="redSmallLinks ms-3"
          onClick={() => {
            setFinishModalShow(true);
            setModalMode("incomplete");
          }}
        >
          Finish!
        </p>
      </div>

      {/* Finish modal */}
      <div
        className={`modal-backdrop bg-light ${
          finishModalShow ? "show" : "fade"
        }`}
        style={{ display: finishModalShow ? "block" : "none" }}
      ></div>
      <div
        className={`modal ${finishModalShow ? "show" : "fade"}`}
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ display: finishModalShow ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className={`modal-content ${
              modalMode === "incomplete" ? design.redModal : design.greenModal
            }`}
          >
            <div className="modal-header modalTopPart">
              <h5
                className={`modal-title ${
                  modalMode === "incomplete" ? "text-danger" : "text-success"
                }`}
                id="exampleModalLongTitle"
              >
                Finish training
              </h5>
              <button
                type="button"
                className={`close text-danger ${design.redCloseButton} ${
                  modalMode === "incomplete" ? "d-block" : "d-none"
                }`}
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setFinishModalShow(false)}
              >
                <span aria-hidden="true" className="text-danger">
                  &times;
                </span>
              </button>
            </div>
            <div
              className={`modal-body pb-0 ${
                modalMode === "incomplete" ? "text-danger" : "text-success"
              }`}
            >
              <p className="mb-3">
                {modalMode === "incomplete"
                  ? "Are you sure?! You want to finish training incomplete?!"
                  : "Congratulations! You finished the training!"}
              </p>
            </div>
            {modalMode === "incomplete" && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-dismiss="modal"
                  onClick={() => window.location.reload()}
                >
                  Yes! Reselect Cards
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-dismiss="modal"
                  onClick={() => navigate("/addCards")}
                >
                  Yes! Let's Add new card
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-dismiss="modal"
                  onClick={() => navigate("/cardsTable")}
                >
                  Yes! Review cards
                </button>
              </div>
            )}
            {modalMode === "completed" && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-dismiss="modal"
                  onClick={() => window.location.reload()}
                >
                  Train again
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-dismiss="modal"
                  onClick={() => navigate("/addCards")}
                >
                  Let's add new card
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-dismiss="modal"
                  onClick={() => navigate("/cardsTable")}
                >
                  Review Cards
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingMechanism;
