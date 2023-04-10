import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import design from "./addCard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AddCardsValidationSchema } from "../utils/ValidationSchemas";
import { toast } from "react-toastify";
import bannerImg from "../images/bannerBottom.png";
import { UserAuth } from "../context/AuthContext";
import ErrorHandler from "../utils/ErrorHandler";

const AddCards = () => {
  const { user } = UserAuth();
  window.localStorage.setItem("user", user.uid);
  const userId = window.localStorage.getItem("user");
  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [onAdd, setOnAdd] = useState(true);
  const [duplication, setDuplication] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      }, 2500);
    } else {
      try {
        setLoading(true);
        await axios.post(
          `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`,
          { ...card, deck: 0 }
        );
        toast.success("Card added successfully!");
        resetForm({ values: "" });
        setLoading(false);
        setError("");
      } catch (e) {
        setError(e.message);
      }
    }

    setOnAdd(!onAdd);
  }

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
    document.getElementById("frontSide").focus();
  }, [onAdd]);

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container-lg">
        <div className="row mainRowHeight justify-content-center align-items-center">
          <div className="col col-md-6 col col-12 d-flex justify-content-center align-items-center">
            <div
              className={`card mx-2 my-5 w-100 border-primary rounded-4 ${design.AddCardForm}`}
            >
              <div className="card-body">
                <h3 className="text-center mb-4 mt-3 text-primary">
                  Add New Card
                </h3>
                <form onSubmit={formik.handleSubmit}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      {ErrorHandler(error)}
                    </div>
                  )}
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
                  <button
                    className={`btn w-100 greenButton mt-1 mb-4 ${
                      loading && error === "" ? "disabledButton" : ""
                    }`}
                  >
                    {loading && error === "" && (
                      <span
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {loading && error === "" ? "Adding..." : "Add"}
                  </button>
                </form>
                <div className="row">
                  <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
                    <button
                      className="btn w-100 btn-primary mb-1 mb-4"
                      onClick={() => navigate("/training")}
                    >
                      Train Now
                    </button>
                  </div>
                  <div className="col col-md-6 col-12 d-flex justify-content-center align-items-center">
                    <button
                      className="btn w-100 btn-primary mb-1 mb-4"
                      onClick={() => navigate("/cardsTable")}
                    >
                      Review Cards
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-6 col-12 d-flex flex-column justify-content-center align-items-center px-5">
            <div className="px-4 pb-4 px-md-0">
              <h2 className={`${design.explain} logoFont`}>Leitnerer</h2>
              <p className={`${design.explain}`}>
                Welcome to the "Add Card" page of Leitnerer! Here you can create
                new flashcards to practice and memorize any language or subject
                using the Leitner Method. Simply fill front and back side of
                flash card, its meaning or definition, and any additional
                information that may be helpful, then it will be added to the
                deck 0. You can practice them smartly in
                <Link to="/training" className="text-decoration-none ms-2">
                  Training page!
                </Link>

              </p>
            </div>
            <img
              src={bannerImg}
              alt="banner"
              className={`img-fluid px-5 px-md-0 figure-img`}
              style={{ height: "20rem" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCards;
