import axios from "axios";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import design from "./addCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AddCardsValidationSchema } from "../utils/AddCardsValidationSchema";

const AddCards = () => {
  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const { user } = UserAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [getHandler, setGetHandler] = useState(true);
  const [duplication, setDuplication] = useState(false);

  const formik = useFormik({
    initialValues: {
      front: "",
      back: "",
    },
    onSubmit: (values, { resetForm }) => {
      addCard(values, { resetForm });
    },
    validationSchema: AddCardsValidationSchema,
  });

  async function addCard(card, { resetForm }) {
    if (cards.some((card) => card.front === formik.values.front)) {
      setDuplication(true);
      setTimeout(() => {
        setDuplication(false);
      }, 2500)
    } else {
      try {
        await axios.post(
          `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}.json`,
          card
        );
        resetForm({ values: "" });
      } catch (e) {
        console.log(e);
      }
    }

    setGetHandler(!getHandler);
  }

  async function getCards() {
    const res = await axios.get(
      `https://leitnerer-e8694-default-rtdb.firebaseio.com/${user.uid}.json`
    );

    let keys = Object.keys(res.data);
    let values = Object.values(res.data);
    values.map((v, index) => (v.id = keys[index]));
    console.log("all cards got");
    setCards(values);
    console.log(values);
  }

  useEffect(() => {
    getCards();
  }, [getHandler]);

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container-lg">
        <div className="row mainRowHeight justify-content-center align-items-center">
          <div className="col col-12 d-flex justify-content-center align-items-center">
            <div
              className={`card mx-2 my-5 w-100 border-primary rounded-4 ${design.AddCardForm}`}
            >
              <div className="card-body">
                <h3 className="text-center mb-4 mt-3 text-primary">
                  Add New Card
                </h3>
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="frontSide" className="form-label">
                    Front side:
                  </label>
                  <textarea
                    name="front"
                    id="frontSide"
                    type="text"
                    className="form-control mb-3 border-primary"
                    value={formik.values.front}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.front && formik.errors.front ? (
                    <div className="formikError">
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      {formik.errors.front}
                    </div>
                  ) : null}
                  {duplication ? (
                    <div className="formikError">
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      There is another card with this front content!
                    </div>
                  ) : null}
                  <label htmlFor="backSide" className="form-label">
                    Back side:
                  </label>
                  <textarea
                    name="back"
                    id="backSide"
                    type="text"
                    className="form-control mb-3 border-primary"
                    value={formik.values.back}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.back && formik.errors.back ? (
                    <div className="formikError">
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      {formik.errors.back}
                    </div>
                  ) : null}
                  <button className="btn w-100 greenButton mt-3 mb-4">
                    Add
                  </button>
                </form>
                <div className="row">
                  <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
                    <button
                      className="btn w-100 btn-primary mt-3 mb-4"
                      onClick={() => navigate("/training")}
                    >
                      Train Now
                    </button>
                  </div>
                  <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
                    <button
                      className="btn w-100 btn-primary mt-3 mb-4"
                      onClick={() => navigate("/cardsTable")}
                    >
                      Review Cards
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {console.log(card)} */}
    </>
  );
};

export default AddCards;
