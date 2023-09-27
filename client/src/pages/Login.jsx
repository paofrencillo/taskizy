import { MdMail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import AuthServices from "../services/AuthServices";
import TokenServices from "../services/tokenServices";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  function handleLoginFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    setIsLoading(true);

    const getResponse = async () => {
      const res = await AuthServices.login(formData);
      try {
        if (res.status === 200) {
          TokenServices.saveToken(res.data);
        } else if (res.status === 401) {
          console.error("401 Unauthorized");
          toast.error("Invalid username or password", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        window.location = "/400";
      } finally {
        setIsLoading(false);
      }
    };

    getResponse();
  }

  return (
    <div className="relative h-screen w-screen">
      <ToastContainer />
      <div className="w-full h-2/3 bg-purple-800"></div>
      <div className="w-full h-1/3 bg-white"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[300px] md:w-[400px] bg-white px-8 py-6 border-2 border-purple-800 shadow-md shadow-purple-900 rounded-lg">
          <h1 className="text-center text-2xl font-extrabold text-purple-800 mb-8 0">
            Login to Taskizy
          </h1>
          <form method="post" className="mb-4" onSubmit={handleLoginFormSubmit}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <div className="flex mb-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-purple-100 border border-r-0 border-purple-300 rounded-l-md ">
                <MdMail />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-r-md bg-gray-50 border text-gray-700  flex-1 min-w-0 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-2.5 group"
                placeholder="me@email.com"
              />
            </div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Password
            </label>
            <div className="flex mb-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-700 bg-purple-100 border border-r-0 border-purple-300 rounded-l-md">
                <FaKey />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded-r-md bg-gray-50 border text-gray-900  flex-1 min-w-0 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-2.5"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 py-3 w-full rounded-md shadow-md shadow-purple-900 text-gray-100 hover:bg-purple-800 text-base transition delay-100 duration-200 ease-in-out"
            >
              Log in
            </button>
          </form>
          <div className="flex flex-col justify-center items-center w-full">
            <Link className="text-gray-400 hover:text-purple-400 text-sm cursor-pointer transition delay-100 duration-200 ease-in-out">
              Forgot Password?
            </Link>
            <br />
            <Link to={"/register"} className="mt-2 w-full">
              <button className="bg-purple-100 border-2 border-purple-500 py-3 w-full rounded-md  text-purple-500 hover:text-purple-900 hover:bg-purple-300 text-base transition delay-100 duration-200 ease-in-out">
                Create an account
              </button>
            </Link>
          </div>
          {isLoading && (
            <div className="absolute top-0 left-0 h-full w-full bg-purple-200 bg-opacity-75 rounded-lg">
              <MutatingDotsLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
