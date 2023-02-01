import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

const CardsTable = () => {
  const userId = window.localStorage.getItem("user");
  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const [cards, setCards] = useState([]);

  async function getCards() {
    const res = await axios.get(
      `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`
    );

    let keys = Object.keys(res.data);
    let values = Object.values(res.data);
    values.map((v, index) => (v.id = keys[index]));
    setCards(values);
    console.log(values);
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <NavBar navsShow={navsShow} />
    </>
  );
};

export default CardsTable;
