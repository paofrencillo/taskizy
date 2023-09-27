const saveToken = (token) => {
  localStorage.setItem("refresh", token.refresh);
  localStorage.setItem("access", token.access);
  console.log(localStorage.getItem("refresh"));
  console.log(localStorage.getItem("access"));
};

const verifyToken = (refreshToken) => {
  return;
};

const TokenServices = {
  saveToken,
  verifyToken,
};

export default TokenServices;
