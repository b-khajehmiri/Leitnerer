import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const CardsTable = () => {

  const { user } = UserAuth();
  const [rawData, setRawData] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      try {
        const res = await axios.get(
          `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}.json`
        );
    
        setRawData(res);
        let keys = Object.keys(res.data);
        let values = Object.values(res.data);
        values.map((v, index) => (v.id = keys[index]));
        console.log("all cards got");
        setCards(values);
        console.log(values);
      } catch (err) {
        console.log(err)
      }
    }

    getCards()
  }, []);

  return <h3>Cards Table</h3>;
};

export default CardsTable;
