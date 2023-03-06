import NavBar from "./NavBar";
import design from "./training.module.scss";
import bannerImg from "../images/training.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainingMechanism from "./TrainingMechanism";

const Training = () => {
  // === HOOKS ===

  const userId = window.localStorage.getItem("user");

  const navigate = useNavigate();

  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const [getter, setGetter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deck0Cards, setDeck0Cards] = useState([]);
  const [deck1Cards, setDeck1Cards] = useState([]);
  const [deck2Cards, setDeck2Cards] = useState([]);
  const [deck3Cards, setDeck3Cards] = useState([]);
  const [deck4Cards, setDeck4Cards] = useState([]);
  const [deck5Cards, setDeck5Cards] = useState([]);
  const [deck6Cards, setDeck6Cards] = useState([]);
  const [deck7Cards, setDeck7Cards] = useState([]);
  const [cardsInSelectedDecks, setCardsInSelectedDecks] = useState(0);
  const [IsTraining, setIsTraining] = useState(false);

  const CardClassifier = (cards) => {
    setDeck0Cards(cards.filter((c) => c.deck === 0));
    setDeck1Cards(cards.filter((c) => c.deck === 1));
    setDeck2Cards(cards.filter((c) => c.deck === 2));
    setDeck3Cards(cards.filter((c) => c.deck === 3));
    setDeck4Cards(cards.filter((c) => c.deck === 4));
    setDeck5Cards(cards.filter((c) => c.deck === 5));
    setDeck6Cards(cards.filter((c) => c.deck === 6));
    setDeck7Cards(cards.filter((c) => c.deck === 7));
  };

  const orderedDecks = [
    { name: "deck 0", cards: deck0Cards, checked: false, weight: 16 },
    { name: "deck 1", cards: deck1Cards, checked: false, weight: 8 },
    { name: "deck 2", cards: deck2Cards, checked: false, weight: 8 },
    { name: "deck 3", cards: deck3Cards, checked: false, weight: 4 },
    { name: "deck 4", cards: deck4Cards, checked: false, weight: 4 },
    { name: "deck 5", cards: deck5Cards, checked: false, weight: 2 },
    { name: "deck 6", cards: deck6Cards, checked: false, weight: 2 },
    { name: "deck 7", cards: deck7Cards, checked: false, weight: 1 },
  ];

  const [checkedDecks, setCheckedDecks] = useState(orderedDecks);
  const [desiredDecks, setDesiredDecks] = useState(orderedDecks); //IT IS SAME AS "checkedDecks" BUT DEFINED AS checkedDecks CHANGES.

  const [oneCardSelected, setOneCardSelected] = useState(false);

  const checkboxes = useRef();

  // === FUNCTIONS ===

  async function getCards() {
    try {
      const res = await axios.get(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`
      );
      let keys = Object.keys(res.data);
      let values = Object.values(res.data);
      values.map((v, index) => (v.id = keys[index]));
      setCardsInSelectedDecks(values.length);
      CardClassifier(values);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCards();
  }, [getter]);

  function decksCheckStatusHandler() {
    setOneCardSelected(true);
    for (let i = 0; i <= 7; i++) {
      orderedDecks[i].checked =
        checkboxes.current.elements[orderedDecks[i].name].checked;
    }

    setCheckedDecks(orderedDecks.filter((deck) => deck.checked === true));
    setDesiredDecks(orderedDecks.filter((deck) => deck.checked === true));

    let sum = 0;
    for (let i = 0; i <= 7; i++) {
      if (orderedDecks[i].checked === true)
        sum = sum + orderedDecks[i].cards.length;
      setCardsInSelectedDecks(sum);
    }
  }

  function trainingCardDistributer(numberOfCardsToTrain) {
    if (numberOfCardsToTrain == checkedDecks.length) {
      for (let i = 0; i < checkedDecks.length; i++) {
        checkedDecks[i].selectedCards = 1;
      }
    } else if (numberOfCardsToTrain == cardsInSelectedDecks) {
      for (let i = 0; i < checkedDecks.length; i++) {
        checkedDecks[i].selectedCards = checkedDecks[i].cards.length;
      }
    } else {
      let totalWeight = 0;
      for (let i = 0; i < checkedDecks.length; i++) {
        totalWeight = totalWeight + checkedDecks[i].weight;
      }
      let factor = Math.floor((numberOfCardsToTrain / totalWeight) * 100) / 100;
      for (let i = 0; i < checkedDecks.length; i++) {
        checkedDecks[i].selectedCards = factor * checkedDecks[i].weight;
      }
      for (let i = 0; i < checkedDecks.length; i++) {
        if (checkedDecks[i].selectedCards < 2) {
          checkedDecks[i].selectedCards =
            Math.floor(checkedDecks[i].selectedCards) + 1;
        } else {
          checkedDecks[i].selectedCards = Math.round(
            checkedDecks[i].selectedCards
          );
        }
      }
      for (let i = 0; i < checkedDecks.length; i++) {
        if (checkedDecks[i].selectedCards > desiredDecks[i].cards.length) {
          checkedDecks[i].selectedCards = desiredDecks[i].cards.length;
        }
      }
      let totalCardsBeforeCorrection = 0;
      for (let i = 0; i < checkedDecks.length; i++) {
        totalCardsBeforeCorrection =
          totalCardsBeforeCorrection + checkedDecks[i].selectedCards;
      }
      while (totalCardsBeforeCorrection < numberOfCardsToTrain) {
        for (let i = 0; i < checkedDecks.length; i++) {
          if (
            checkedDecks[i].selectedCards < desiredDecks[i].cards.length &&
            totalCardsBeforeCorrection < numberOfCardsToTrain
          ) {
            checkedDecks[i].selectedCards = checkedDecks[i].selectedCards + 1;
            totalCardsBeforeCorrection++;
          }
        }
      }
    }
  }

  return (
    <>
      <div
        className={`modal-backdrop bg-primary ${IsTraining ? "fade" : "show"}`}
        style={{ display: IsTraining ? "none" : "block" }}
      ></div>
      <NavBar navsShow={navsShow} />
      <div
        className={`container-lg d-flex justify-content-center align-item-center`}
      >
        <div
          className={`row justify-content-center align-items-center ${design.mainContainer}`}
        >
          <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
            {IsTraining && (
              <TrainingMechanism
                checkedDecks={checkedDecks}
                setIsTraining={setIsTraining}
              />
            )}
          </div>
          <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
            <img
              src={bannerImg}
              alt="banner"
              className={`img-fluid px-5 px-md-0 figure-img`}
            />
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${IsTraining ? "fade" : "show"}`}
        id="TrainingModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="TrainingModalTitle"
        aria-hidden="true"
        style={{ display: IsTraining ? "none" : "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className={`modal-content text-primary ${design.trainingModal}`}>
            <div className="modal-header modalTopPart">
              <h5 className="modal-title=" id="exampleModalLongTitle">
                Training
              </h5>
              <div className="d-flex flex-row">
                <p
                  onClick={() => navigate("/account")}
                  className="cursorPointer mx-2 mt-2 blueSmallLinks"
                >
                  <small>Account</small>
                </p>
                <p
                  onClick={() => navigate("/cardsTable")}
                  className="cursorPointer mx-2 mt-2 blueSmallLinks"
                >
                  <small>Cards table</small>
                </p>
              </div>
            </div>
            <div className="modal-body">
              <form
                ref={checkboxes}
                id="TrainingForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  trainingCardDistributer(
                    e.target.elements.TrainingCardNumber.value
                  );
                  setIsTraining(true);
                }}
              >
                <p className="text-primary">
                  Select decks you want to be included:
                </p>
                <div className="row mb-4">
                  {orderedDecks.map((deck, index) => (
                    <div
                      className={`col-6 ${deck.cards.length !== 0 ? design["deckInfo" + index] : "text-secondary"}`}
                      key={deck.name}
                    >
                      <input
                        className="m-2 form-check-input trainingChecks"
                        type="checkbox"
                        id={deck.name}
                        name={deck.name}
                        value={deck.name}
                        onChange={decksCheckStatusHandler}
                        disabled={deck.cards.length === 0}
                      />
                      <label htmlFor={deck.name} className="my-1">
                        Deck {index} which has{" "}
                        {loading ? (
                          <div
                            className={`spinner-border spinner-border-sm ${
                              design["deckInfo" + index]
                            }`}
                            role="status"
                          />
                        ) : (
                          deck.cards.length
                        )}{" "}
                        cards.
                      </label>
                    </div>
                  ))}
                </div>
                {oneCardSelected && checkedDecks.length != 0 && (
                  <>
                    <div className="ms-2">
                      <i className="fa-solid fa-circle-info me-2 mb-4"></i>
                      There are <b>{cardsInSelectedDecks}</b>
                      cards in selected decks.
                    </div>
                    <div className="ms-2 my-1 d-inline">
                      How many cards do you want to train?
                    </div>
                    <input
                      id="TrainingCardNumber"
                      className={`form-control border-primary ms-3 w-25 d-inline text-primary`}
                      type="number"
                      min={checkedDecks.length}
                      max={cardsInSelectedDecks}
                      defaultValue={8}
                    />
                  </>
                )}
                <div className="row justify-content-center mt-4">
                  <input
                    className="btn btn-primary w-25"
                    type="submit"
                    value="Start"
                    disabled={!oneCardSelected || checkedDecks.length == 0}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Training;
