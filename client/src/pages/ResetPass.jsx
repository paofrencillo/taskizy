import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
  CardHeader,
  Spinner,
  Input,
} from "@material-tailwind/react";
import UsersServices from "../services/UsersServices";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ResetPass() {
  const [isResetPassLoading, setIsResetPassLoading] = useState(false);
  const [newPasswordErrors, setNewPasswordErrors] = useState([]);
  const [rePasswordErrors, setRePasswordErrors] = useState([]);
  const { uid, token } = useParams();

  // Clear errors when input fields was changed
  const clearErrors = () => {
    setNewPasswordErrors([]);
    setRePasswordErrors([]);
  };

  // Handle the reset pass form and sending data
  const handleResetPassForm = (e) => {
    e.preventDefault();
    setIsResetPassLoading(true);

    const formData = new FormData(e.target);
    formData.append("uid", uid);
    formData.append("token", token);
    const sendData = async () => {
      await UsersServices.confirmResetPassword(formData)
        .then((response) => {
          if (response.status === 204) {
            toast.success("Success! You will be redirected to login page.");
            setTimeout(() => {
              window.location.replace("/");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.data.token) {
            toast.error(
              "The link was expired. You need a new password reset link."
            );
          } else if (error.response.data.new_password) {
            setNewPasswordErrors(error.response.data.new_password);
          } else if (error.response.data.non_field_errors) {
            setRePasswordErrors(error.response.data.non_field_errors);
          }
        })
        .finally(() => {
          setIsResetPassLoading(false);
        });
    };

    sendData();
  };

  return (
    <div className="relative h-screen w-screen">
      <ToastContainer position="bottom-right" />
      <div className="w-full h-2/3 bg-purple-800"></div>
      <div className="w-full h-1/3 bg-white"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Card className="w-96 bg-white px-4 py-2 border-2 border-purple-800 shadow-md shadow-purple-900 rounded-lg">
          <form onSubmit={handleResetPassForm}>
            <CardHeader
              floated={false}
              shadow={false}
              className="text-lg font-bold text-gray-800"
            >
              Enter you New Password
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div>
                <Input
                  type="password"
                  name="new_password"
                  label="New Password"
                  color="purple"
                  minLength={8}
                  disabled={isResetPassLoading}
                  onChange={clearErrors}
                  required
                />
                <Typography variant="small" color="red" className="mt-1.5">
                  {newPasswordErrors}
                </Typography>
              </div>

              <div>
                <Input
                  type="password"
                  name="re_new_password"
                  label="Re-type New Password"
                  color="purple"
                  minLength={8}
                  disabled={isResetPassLoading}
                  onChange={clearErrors}
                  required
                />
                <Typography variant="small" color="red" className="mt-1.5">
                  {rePasswordErrors.map((error) => {
                    return error;
                  })}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              {isResetPassLoading ? (
                <div className="w-full text-center flex justify-center items-center p-2">
                  <Spinner color="purple" />
                </div>
              ) : (
                <Button type="submit" color="purple" fullWidth>
                  Confirm
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
