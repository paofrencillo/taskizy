import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import AuthServices from "../services/AuthServices";

export default function Activate() {
  const [status, setStatus] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await AuthServices.activate(params);
        setStatus(res.status);
      } catch (error) {
        window.location = "/400";
      }
    };

    getStatus();
  }, [params]);

  console.log(status);

  switch (status) {
    case 400:
      window.location = "/400";
      return null;
    case 403:
      window.location = "/403";
      return null;
    case 404:
      window.location = "/404";
      return null;
    case 500:
      window.location = "/500";
      return null;
    case 204:
      window.location = "/activate-success";
      return null;
    default:
      return (
        <>
          {status === null && (
            <div className="relative w-screen h-screen">
              <MutatingDotsLoader />
            </div>
          )}
        </>
      );
  }
}
