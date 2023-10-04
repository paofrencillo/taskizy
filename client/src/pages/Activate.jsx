import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import AuthServices from "../services/AuthServices";
import ActivateSuccess from "./Success/ActivateSuccess";
import Error404 from "./Errors/Error404";
import Error403 from "./Errors/Error403";

export default function Activate() {
  const [status, setStatus] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getStatus = async () => {
      await AuthServices.activate(params)
        .then((res) => {
          setStatus(res.status);
        })
        .catch((err) => {
          setStatus(err.response.status);
        });
      // Use response.status to get the HTTP status code
      //  catch (error) {
      //   window.location = "/400";
      // }
    };

    getStatus();
  }, [params]);

  switch (status) {
    case 400:
      window.location = "/400";
      break;
    case 403:
      return <Error403 />;
    case 404:
      window.location = "/404";
      break;
    case 500:
      window.location = "/500";
      break;
    case 204:
      return <ActivateSuccess />;
    default:
      return (
        <>
          <div className="relative w-screen h-screen">
            <MutatingDotsLoader />
          </div>
        </>
      );
  }


}
