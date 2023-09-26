import { Link } from "react-router-dom";

export default function ActivateSuccess() {
  return (
    <div className="flex flex-col justify-center items-center my-52 gap-10">
      <h1 className="text-center text-4xl font-extrabold text-purple-900">
        Account activated
      </h1>
      <h3 className="text-center text-xl font-semibold text-purple-500 ">
        You may now close this window or{" "}
        <Link to={"/login"} className="underline hover:text-purple-900">
          click here
        </Link>{" "}
        to redirect on login page.
      </h3>
    </div>
  );
}
