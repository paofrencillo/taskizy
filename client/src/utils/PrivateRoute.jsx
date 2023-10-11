import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenServices from "../services/tokenServices";
import { Nav } from "../components/Navbar/Nav";

export default function PrivateRoute(props) {
  const accessToken = TokenServices.getToken().access;

  setInterval(() => {
    TokenServices.refreshTokens();
  }, 5000);

  if (accessToken) {
    const decodedAccessToken = jwt_decode(accessToken);
    const expDate = new Date(decodedAccessToken.exp * 1000); // JavaScript uses milliseconds, so multiply by 1000
    const first_name = decodedAccessToken.first_name;
    const last_name = decodedAccessToken.last_name;
    const fullName =
      decodedAccessToken.first_name + " " + decodedAccessToken.last_name;
    const userID = decodedAccessToken.user_id;
    const userData = { userID, first_name, last_name, fullName, expDate };

    return (
      <>
        <Nav userFullName={userData.fullName} />
        <Outlet context={userData} />
        {props.children}
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
