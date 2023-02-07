import NavBar from "./NavBar";
import design from "./training.module.scss";
import bannerImg from "../images/training.png";

const navsShow = {
  signUpShow: false,
  signInShow: false,
  otherLinksShow: true,
  logOUtShow: true,
};

const Training = () => {
  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container-lg d-flex flex-column justify-content-between" style={{minHeight:"40rem"}}>
        <h5 className="mt-5 mb-2">Before training, there were:</h5>
        <div className="row justify-content-center align-items-center">
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo0}`}
          >
            12345 cards in deck 0
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo1}`}
          >
            453 cards in deck 1
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo2}`}
          >
            4532 cards in deck 2
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo3}`}
          >
            8655 cards in deck 3
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo4}`}
          >
            44 cards in deck 4
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo5}`}
          >
            124 cards in deck 5
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo6}`}
          >
            2 cards in deck 6
          </p>
          <p
            className={`col col-md-2 col-12 decksInfo ${design.decksInfo} ${design.deckInfo7}`}
          >
            142 cards in deck 7
          </p>
        </div>
        <div className="row justify-content-center align-items-center" style={{marginTop:"4rem"}}>
          <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quibusdam facilis, quod sunt numquam vitae fuga commodi dolorem.
              Porro quas placeat sint qui rem voluptatum mollitia, sunt voluptas
              saepe perspiciatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quibusdam facilis, quod sunt numquam vitae fuga commodi dolorem.
              Porro quas placeat sint qui rem voluptatum mollitia, sunt voluptas
              saepe perspiciatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quibusdam facilis, quod sunt numquam vitae fuga commodi dolorem.
              Porro quas placeat sint qui rem voluptatum mollitia, sunt voluptas
              saepe perspiciatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quibusdam facilis, quod sunt numquam vitae fuga commodi dolorem.
              Porro quas placeat sint qui rem voluptatum mollitia, sunt voluptas
              saepe perspiciatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quibusdam facilis, quod sunt numquam vitae fuga commodi dolorem.
              Porro quas placeat sint qui rem voluptatum mollitia, sunt voluptas
              saepe perspiciatis?
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
