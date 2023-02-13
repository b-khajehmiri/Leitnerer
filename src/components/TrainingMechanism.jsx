import design from "./trainingMechanism.module.scss";

const TrainingMechanism = (props) => {
  return (
    <div className="row">
      <div className="py-2 rounded-3 ps-3 bg-primary">
        <div className="mb-3 text-light font17 fontWeight500">
          Smart <span className="logoFont yellowText font18">Leitnerer</span> selected cards for training as below:
        </div>
        <div className="d-flex flex-wrap justify-content-between text-light px-4">
          {props.checkedDecks.map((deck) => (
            <>
              <li className="noBullet ">
                <i class="fa-solid fa-check me-2"></i>
                <span className="me-4">
                  {deck.cardsNumber} cards from {deck.name}
                </span>
              </li>
            </>
          ))}
        </div>
      </div>
      <div className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        molestias ducimus labore, consequatur dicta soluta reiciendis tenetur
        quae velit modi itaque laborum mollitia fuga asperiores officia id esse
        repudiandae debitis.
      </div>
    </div>
  );
};

export default TrainingMechanism;
