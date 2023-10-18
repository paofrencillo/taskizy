import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import AuthServices from "../services/AuthServices";
import ActivateSuccess from "./Success/ActivateSuccess";
import Error404 from "./Errors/Error404";
import Error403 from "./Errors/Error403";
import Error400 from "./Errors/Error400";
import Error500 from "./Errors/Error500";

export default function Activate() {
  const params = useParams();
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await AuthServices.activate(params);
        if (response.status === 204) {
          setIsActivated(true);
        } else {
          setError(response.status);
        }
      } catch (err) {
        setError(err.response.status);
      }
    };

    activateAccount();
  }, [params]);

  const renderComponent = () => {
    switch (true) {
      case isActivated:
        return <ActivateSuccess />;
      case error === 400:
        return <Error400 />;
      case error === 403:
        return <Error403 />;
      case error === 404:
        return <Error404 />;
      case error === 500:
        return <Error500 />;
      default:
        return (
          <div className="relative w-screen h-screen">
            <MutatingDotsLoader />
          </div>
        );
    }
  };

  return <>{renderComponent()}</>;
}
