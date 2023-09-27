import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navbar from "./components/Layout/Navbar";
import PageContainer from "./components/Layout/PageContainer";

export default function App() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const userAuth = () => {
      const decodedData = jwt_decode(localStorage.getItem("access"));

      const expDate = new Date(decodedData.exp);
      const fullName = decodedData.first_name + " " + decodedData.last_name;
      const userID = decodedData.user_id;

      return { userID, fullName, expDate };
    };

    setUserData(userAuth());
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <Navbar />
      <PageContainer>
        <Outlet context={userData} />
      </PageContainer>
    </>
  );
}
