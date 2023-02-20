import { useState } from "react";
import "./flipCard.css";

const FlipCard = () => {
  const [flip, setFlip] = useState(false);

  return (
    <>
      <div className={flip ? "flip-scale-up-hor" : "flip-scale-up-hor2"}>
        <div className="text-flipped">
          {flip ? (
            <h5 className="text-light">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
              obcaecati suscipit cumque, sed itaque ab necessitatibus doloremque
              consectetur autem. Sint, eum. Hic voluptatum fugiat, eligendi nam
              iure sed asperiores animi.pit cumque, sed itaque ab necessitatibus doloremque
              consectetur autem. Sint, eum. Hic voluptatum fugiat, eligendi nam
              iure sed asperiores animi.
            </h5>
          ) : (
            <h5 className="text-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
            obcaecati suscipit cumi.</h5>
          )}
        </div>
      </div>
      <button onClick={() => setFlip(!flip)}>flip</button>
    </>
  );
};

export default FlipCard;
