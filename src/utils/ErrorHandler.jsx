const ErrorHandler = (err) => {
  if (
    err ===
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    return "Password should be at least 6 characters! Weak password!";
  } else if (err === "Firebase: Error (auth/email-already-in-use).") {
    return "Email already in use!";
  } else if (err === "Firebase: Error (auth/wrong-password).") {
    return "Wrong Password!";
  } else if (err === "Firebase: Error (auth/user-not-found).") {
    return "User not found!";
  } else {
    return err;
  }
};

export default ErrorHandler;
