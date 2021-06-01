export default (key) => {
  switch (key) {
    case "name":
      return "account-tie";
    case "phone":
      return "cellphone";
    case "address":
      return "home-outline";
    case "company":
      return "home-modern";
    case "email":
      return "email";
    case "gender":
      return "gender-male-female";
    default:
      return "";
  }
};
