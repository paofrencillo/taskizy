import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TokenServices from "../services/tokenServices";
import { Nav } from "../components/Navbar/Nav";
import { useEffect, useState } from "react";

export default function PrivateRoute(props) {
  const [accessToken, setAccessToken] = useState(
    TokenServices.getToken().access
  );
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const refreshTokens = () => {
      TokenServices.refreshTokens();
      setAccessToken(TokenServices.getToken().access);
      const decodedAccessToken = jwt_decode(accessToken);

      // Decode the token and update the user data
      const { first_name, last_name, user_id, user_image } = decodedAccessToken;
      setUserData({
        userID: user_id,
        first_name,
        last_name,
        fullName: `${first_name} ${last_name}`,
        userImg: user_image,
      });
    };
    const tokenRefreshInterval = setInterval(() => {
      refreshTokens();
    }, 5000);

    return () => clearInterval(tokenRefreshInterval); // Cleanup to clear the interval on unmount
  }, [accessToken, userData]); // Empty dependency array to run this effect once

  if (accessToken) {
    const decodedAccessToken = jwt_decode(accessToken);
    const expDate = new Date(decodedAccessToken.exp * 1000);
    const { first_name, last_name, user_id, user_image } = decodedAccessToken;

    const userData = {
      userID: user_id,
      first_name,
      last_name,
      fullName: `${first_name} ${last_name}`,
      userImg: user_image,
      expDate,
    };

    return (
      <>
        <Nav userFullName={userData.fullName} userImg={userData.userImg} />
        <Outlet context={userData} />
        {props.children}
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
