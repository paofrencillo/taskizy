import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import PageContainer from "./components/Layout/PageContainer";

export default function App() {
  const isUserAuthenticated = true;

  return (
    <div>
      {isUserAuthenticated ? (
        <>
          <Navbar />
          <PageContainer>
            <Outlet />
          </PageContainer>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
}
