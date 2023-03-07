function IsValidEmail(email) {
  // Check if the email contains exactly one "@"
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || email.indexOf("@", atIndex + 1) !== -1) {
    return false;
  }

  // Check if there is exactly one "." after the "@"
  const dotIndex = email.indexOf(".", atIndex + 1);
  if (dotIndex === -1 || email.indexOf(".", dotIndex + 1) !== -1) {
    return false;
  }

  // Check if there is at least one character before and after the "@"
  if (atIndex === 0 || dotIndex === email.length - 1) {
    return false;
  }

  return true;
}

export default IsValidEmail;