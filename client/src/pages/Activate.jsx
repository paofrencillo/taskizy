import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivateSuccess from "./ActivateSuccess";
import Error403 from "./Errors/Error403";
import Error404 from "./Errors/Error404";
import Error400 from "./Errors/Error400";
import userActivate from "../utils/userActivate";

export default function Activate() {
  const [status, setStatus] = useState();
  const params = useParams();

  useEffect(() => {
    userActivate(params)
      .then((status) => {
        setStatus(status);
      })
      .catch((error) => {
        setStatus(error);
      });
  }, [params]);

  return (
    <>
      {status === 403 ? (
        <Error403 />
      ) : status === 404 ? (
        <Error404 />
      ) : status === 400 ? (
        <Error400 />
      ) : status === 204 ? (
        <ActivateSuccess />
      ) : (
        "Please wait ..."
      )}
    </>
  );
}
