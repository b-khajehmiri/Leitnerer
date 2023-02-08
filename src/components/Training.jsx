import NavBar from "./NavBar";
import design from "./training.module.scss";
import bannerImg from "../images/training.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Training = () => {
  const userId = window.localStorage.getItem("user");

  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const checkboxes = useRef();
  const [getter, setGetter] = useState(false);
  const [deck0, setDeck0] = useState([]);
  const [deck1, setDeck1] = useState([]);
  const [deck2, setDeck2] = useState([]);
  const [deck3, setDeck3] = useState([]);
  const [deck4, setDeck4] = useState([]);
  const [deck5, setDeck5] = useState([]);
  const [deck6, setDeck6] = useState([]);
  const [deck7, setDeck7] = useState([]);

  const [IsTraining, setIsTraining] = useState(false);
  const [trainMode, setTrainMode] = useState("single");

  async function getCards() {
    try {
      const res = await axios.get(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`
      );
      let keys = Object.keys(res.data);
      let values = Object.values(res.data);
      values.map((v, index) => (v.id = keys[index]));
      CardClassifier(values);
    } catch (err) {
      console.log(err);
    }
  }

  const CardClassifier = (cards) => {
    setDeck0(cards.filter((c) => c.deck === 0));
    setDeck1(cards.filter((c) => c.deck === 1));
    setDeck2(cards.filter((c) => c.deck === 2));
    setDeck3(cards.filter((c) => c.deck === 3));
    setDeck4(cards.filter((c) => c.deck === 4));
    setDeck5(cards.filter((c) => c.deck === 5));
    setDeck6(cards.filter((c) => c.deck === 6));
    setDeck7(cards.filter((c) => c.deck === 7));
  };

  const decks = [
    "deck0",
    "deck1",
    "deck2",
    "deck3",
    "deck4",
    "deck5",
    "deck6",
    "deck7",
  ];
  const orderedCards = [deck0, deck1, deck2, deck3, deck4, deck5, deck6, deck7];

  useEffect(() => {
    getCards();
  }, [getter]);

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
        {/* <h5 className="mt-4 mb-4">Before training, there were:</h5>
        <div className="row justify-content-center align-items-center container-lg">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((deckNo) => (
            <p
              className={`col col-md-2 col-sm-4 col-12 decksInfo py-1 ${
                design.decksInfo
              } ${design["deckInfo" + deckNo]}`}
            >
              {orderedCards[deckNo].length} cards in deck {deckNo}
            </p>
          ))}
        </div> */}
        <div
          className={`row justify-content-center align-items-center ${design.mainContainer}`}
        >
          <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
            <div className={`${design.trainingContainer}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, quo exercitationem at accusamus earum, odio ducimus
              excepturi autem impedit quas, cupiditate voluptate? Nemo debitis
              quia aliquam repellat ex voluptates esse!
            </div>
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
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ display: IsTraining ? "none" : "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className={`modal-content text-primary ${design.trainingModal}`}>
            <div className="modal-header modalTopPart">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Training
              </h5>
              <button
                type="button"
                className={`close ${design.trainingCloseButton}`}
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsTraining(true)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-light">
              <form
                ref={checkboxes}
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(checkboxes.current.deck4.checked);
                }}
                >
                <p className="text-primary">Select decks you want to be included:</p>
                <div className="row">
                  {decks.map((deck, index) => (
                    <div className="col-3">
                      <input
                        className="mx-2 form-check-input trainingChecks"
                        type="checkbox"
                        id={decks[index]}
                        name={decks[index]}
                        value={decks[index]}
                      />
                      <label for={decks[index]} className="text-primary">
                        Deck {index}
                      </label>
                    </div>
                  ))}
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Training;
