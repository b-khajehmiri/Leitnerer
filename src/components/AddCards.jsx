import NavBar from "./NavBar";

const AddCards = () => {
  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  return (
    <>
      <NavBar navsShow={navsShow} />
      <h3>AddCards</h3>
    </>
  );
};

export default AddCards;
