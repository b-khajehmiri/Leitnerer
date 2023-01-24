import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [rawData, setRawData] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  async function addCard() {
    const res = await axios.post(
      `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}.json`,
      { f: "test1", b: "امتحان" }
    );
    console.log(res);
  }

  function selectCard() {
    setSelectedCard(cards.filter((c) => c.f === "test1"));
    console.log("cart selected");
  }

  async function changeCard() {
    await axios.put(
      `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}/${selectedCard[0].id}.json`,
      { f: "gfgg", b: "125عوض شد" }
    );
    console.log("selected card was:", selectedCard[0]);
  }

  async function deleteCard() {
    await axios.delete(
      `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}/${selectedCard[0].id}.json`
    );
    console.log("selected card deleted");
  }

  async function getCards() {
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
  }

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container-lg">
          <h1>Account</h1>
          <p>User Email: {user && user.email}</p>

          <button onClick={handleLogout}>Logout</button>

          <button onClick={addCard}>add card</button>

          <button onClick={getCards}>get cards</button>

          <button onClick={changeCard}>change cards</button>

          <button onClick={selectCard}>select card</button>

          <button onClick={deleteCard}>delete card</button>
        </div>
    </>
  );
};

export default Account;
