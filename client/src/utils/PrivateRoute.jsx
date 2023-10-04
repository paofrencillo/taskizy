import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenServices from "../services/tokenServices";
import Navbar from "../components/Navbar/Navbar";

export default function PrivateRoute(props) {
  const accessToken = TokenServices.getToken().access;

  setInterval(() => {
    TokenServices.refreshTokens();
  }, 5000);

  if (accessToken) {
    const decodedAccessToken = jwt_decode(accessToken);
    const expDate = new Date(decodedAccessToken.exp * 1000); // JavaScript uses milliseconds, so multiply by 1000
    const fullName =
      decodedAccessToken.first_name + " " + decodedAccessToken.last_name;
    const userID = decodedAccessToken.user_id;
    const userData = { userID, fullName, expDate };

    return (
      <>
        <Navbar name={userData.fullName} />
        <Outlet context={userData} />
        {props.children}
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
