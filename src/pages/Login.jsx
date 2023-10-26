import { Link, Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdMail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import AuthServices from "../services/AuthServices";
import TokenServices from "../services/JWTTokenServices";
import UsersServices from "../services/UsersServices";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSendLoading, setIsEmailSendLoading] = useState(false);
  const [openForgotPassDialog, setOpenForgotPassDialog] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);
  const token = TokenServices.getToken().refresh;

  // check if token is already saved in local storage
  if (token) {
    return <Navigate to={"/rooms"} />;
  }

  // Clear the errors whenever the email field was changed
  const clearErrors = () => {
    setEmailErrors([]);
  };

  // Handle the opening of forgot pass dialog
  const handleOpenForgotPassDialog = () =>
    setOpenForgotPassDialog(!openForgotPassDialog);

  // Handle the send of email for password reset
  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsEmailSendLoading(true);

    const formData = new FormData(e.target);

    const sendEmail = async () => {
      try {
        const response = await UsersServices.forgotPassword(formData);

        if (response.status === 204) {
          setOpenForgotPassDialog(false);
          toast.success("Password reset link was sent to your email.");
        }
      } catch (err) {
        console.error(err);
        setEmailErrors(
          err.response.data.email ? err.response.data.email : err.response.data
        );
      } finally {
        setIsEmailSendLoading(false);
      }
    };
    sendEmail();
  };

  // handle the login functionality
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setIsLoading(true);

    const getResponse = async () => {
      await AuthServices.login(formData)
        .then((res) => {
          if (res.status === 200) {
            TokenServices.saveToken(res.data);
            return redirect("/rooms");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            toast.error("Invalid username or password");
          } else {
            toast.error("Something is wrong. Try to refresh the page.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getResponse();
  };

  return (
    <div className="relative h-screen w-screen">
      <ToastContainer position="bottom-right" />
      {/*  */}
      {/* Forgot Password Dialog */}
      {/*  */}

      <Dialog
        open={openForgotPassDialog}
        handler={handleOpenForgotPassDialog}
        size="xs"
      >
        <DialogHeader>Forgot Password</DialogHeader>
        <form onSubmit={handleSendEmail}>
          <DialogBody>
            <Typography variant="small" className="mb-4">
              Input your registered email address to receive the link on
              resetting your password.
            </Typography>

            <Input
              type="email"
              color="purple"
              name="email"
              label="Email Address"
              className="w-full"
              onChange={clearErrors}
              required
              disabled={isEmailSendLoading}
            />
            <Typography variant="small" color="red" className="mt-1.5">
              {emailErrors.map((error) => {
                return error;
              })}
            </Typography>
          </DialogBody>
          <DialogFooter>
            {isEmailSendLoading ? (
              <div className="w-full text-center flex justify-center items-center p-2">
                <Spinner color="purple" />
              </div>
            ) : (
              <>
                <Button
                  type="reset"
                  variant="text"
                  color="red"
                  onClick={handleOpenForgotPassDialog}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button type="submit" variant="gradient" color="green">
                  <span>Confirm</span>
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </Dialog>
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
              <span className="inline-flex items-center px-3 text-sm text-gray-700 bg-purple-100 border border-r-0 border-purple-300 rounded-l-md ">
                <MdMail />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-r-md bg-gray-50 border text-gray-700  flex-1 min-w-0 w-full text-sm focus:ring-0 focus:outline-0 focus:bg-purple-100 border-purple-300 p-2.5 group"
                placeholder="me@email.com"
                required
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
                required
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
            <Typography
              variant="small"
              className="w-full text-center text-gray-400 hover:text-purple-400 cursor-pointer transition delay-100 duration-200 ease-in-out"
              onClick={handleOpenForgotPassDialog}
            >
              Forgot Password?
            </Typography>
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
