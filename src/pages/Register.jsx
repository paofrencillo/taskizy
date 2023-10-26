import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import AuthServices from "../services/AuthServices";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  function autoCapitalize(e) {
    let value = e.target.value;
    let words = value.split(" ");

    words.map((word, index) => {
      let cap_word = word.charAt().toUpperCase() + word.substring(1);
      words[index] = cap_word;
      e.target.value = words.join(" ");
    });
  }

  function handleRegFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setIsLoading(true);

    const getResponse = async () => {
      await AuthServices.register(formData)
        .then((res) => {
          if (res.status === 201) {
            toast.success(
              "Account created successfully! Check your email's inbox for activation link."
            );
          }
        })
        .catch((err) => {
          const formErrors = Object.values(err.response.data)[0];
          formErrors.map((err) => {
            toast.error(err, { position: toast.POSITION.BOTTOM_RIGHT });
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getResponse();
  }

  return (
    <div className="relative h-screen w-screen">
      <ToastContainer position="bottom-right" />
      <div className="w-full h-2/3 bg-purple-800"></div>
      <div className="w-full h-1/3 bg-white"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[300px] md:w-[400px] bg-white px-8 py-6 border-2 border-purple-800 shadow-md shadow-purple-900 rounded-lg">
          <h1 className="text-center text-2xl font-extrabold text-purple-800 mb-8 0">
            Register to Taskizy
          </h1>
          <form method="post" className="mb-4" onSubmit={handleRegFormSubmit}>
            <div className="flex mb-4">
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="rounded-md bg-gray-50 border text-gray-700 flex-1 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-3"
                placeholder="First Name"
                onChange={autoCapitalize}
                required
              />
            </div>
            <div className="flex mb-4">
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="rounded-md bg-gray-50 border text-gray-700 flex-1 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-3"
                placeholder="Last Name"
                onChange={autoCapitalize}
                required
              />
            </div>
            <div className="flex mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-md bg-gray-50 border text-gray-700 flex-1 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-3"
                placeholder="me@email.com"
                required
              />
            </div>

            <div className="flex mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="rounded-md bg-gray-50 border text-gray-900 flex-1 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-3"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex mb-8">
              <input
                type="password"
                id="re_password"
                name="re_password"
                className="rounded-md bg-gray-50 border text-gray-900 flex-1 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-3"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button className="bg-purple-500 py-3 w-full rounded-md shadow-md shadow-purple-900 text-gray-100  hover:bg-purple-800 text-base transition delay-100 duration-200 ease-in-out">
              Sign Up
            </button>
          </form>
          <Link
            to={"/"}
            className="text-sm text-gray-500 hover:text-purple-500 transition delay-100 duration-200 ease-in-out"
          >
            I already have an account
          </Link>
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
