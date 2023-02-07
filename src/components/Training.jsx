import NavBar from "./NavBar";
import design from "./training.module.scss";
import bannerImg from "../images/training.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Training = () => {
  const userId = window.localStorage.getItem("user");

  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const [cards, setCards] = useState([]);
  const [deck0, setDeck0] = useState([]);
  const [deck1, setDeck1] = useState([]);
  const [deck2, setDeck2] = useState([]);
  const [deck3, setDeck3] = useState([]);
  const [deck4, setDeck4] = useState([]);
  const [deck5, setDeck5] = useState([]);
  const [deck6, setDeck6] = useState([]);
  const [deck7, setDeck7] = useState([]);

  async function getCards() {
    try {
      const res = await axios.get(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`
      );
      let keys = Object.keys(res.data);
      let values = Object.values(res.data);
      values.map((v, index) => (v.id = keys[index]));
      setCards(values);
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

  const orderedCards = [deck0,deck1,deck2,deck3,deck4,deck5,deck6,deck7]

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div
        className="container-lg d-flex flex-column justify-content-between"
      >
        <h5 className="mt-4 mb-4">Before training, there were:</h5>
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
        </div>
        <div
          className={`row justify-content-center align-items-center ${design.bottomContainer}`}
        >
          <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quibusdam facilis, quod sunt numquam vitae fuga commodi dolorem.
              Porro quas placeat sint qui rem voluptatum mollitia, sunt voluptas
              saepe perspiciatis?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. S numquam vitae fuga
              commodi dolorem. Porro quas placeat sint qui rem voluptatum
              mollitia, sunt voluptas saepe perspiciatis?Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Soluta quibusdam facilis, quod
              sunt numquam vitae fuga commodi dolorem. Porro quas placeat sint
              qui rem voluptatum mollitia, sunt voluptas saepe perspiciatis?
            </p>
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
    </>
  );
};

export default Training;
