import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbPhotoEdit } from "react-icons/tb";
import UsersServices from "../services/UsersServices";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import { ChangePassword } from "../components/ChangePassword/ChangePassword";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [backupUserData, setBackupUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UsersServices.getUser();
        if (response.status === 200) {
          setUserData(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [formSubmitted]); // Listen for changes in formSubmitted

  // handles states if update button was clicked
  const handleUpdateOnClick = () => {
    setIsEditing(!isEditing);
    setBackupUserData(userData);
  };

  // handles states if cancel button was clicked
  const handleResetOnClick = () => {
    setIsEditing(!isEditing);
    setUserData(backupUserData);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Split words to capitalize the first letter
    // Never split 'email' !!
    if (name !== "email") {
      let words = value.split(" ");

      // Map through the words and capitalize the first letter
      words.map((word, index) => {
        let cap_word = word.charAt().toUpperCase() + word.substring(1);
        words[index] = cap_word;
        value = words.join(" ");
      });
    }

    // Update the userData state with the new value
    setUserData({ ...userData, [name]: value });
  };

  // Function to handle form submit
  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);

    const userFormData = new FormData(e.target);
    const sendFormData = async () => {
      try {
        const response = await UsersServices.updateUser(userFormData);

        if (response.status === 205) {
          setFormSubmitted(!formSubmitted);
          toast.success("Your profile was updated successfully.");
        }
      } catch (err) {
        console.error(err);
        const formErrors = Object.values(err.response.data)[0];
        formErrors.map((err_message) => {
          toast.error(err_message);
        });
        setUserData(backupUserData);
      }
    };

    sendFormData();
  };

  const handleUserImageFormSubmit = (e) => {
    const image = e.target.files;

    // Check if image size is > 3MB (limit file size to 3MB)
    const maxSize = 3 * 1024 * 1024;
    if (image[0].size > maxSize) {
      toast.error("Your image size must not exceeds more than 3MB.");
      e.target.value = "";
    } else if (image[0].size <= maxSize) {
      const userImageData = new FormData(e.target.closest("form"));
      const sendFormData = async () => {
        try {
          const response = await UsersServices.changeUserImage(userImageData);

          if (response.status === 205) {
            setFormSubmitted(!formSubmitted);
            toast.success("Your Image was updated successfully.");
          }
        } catch (err) {
          console.error(err);
          const formErrors = Object.values(err.response.data)[0];
          formErrors.map((err_message) => {
            toast.error(err_message);
          });
          setUserData(backupUserData);
        }
      };

      sendFormData();
    } else return;
  };

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen">
          <MutatingDotsLoader />
        </div>
      ) : (
        <>
          <ToastContainer position="bottom-right" />
          <div className="flex justify-center items-center pt-24">
            <Card className="min-w-[350px] w-[450px] flex flex-col justify-center items-center shadow-purple-200 border border-purple-200">
              <CardBody className="w-full">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <Avatar
                      src={
                        userData.user_image === null ||
                        userData.user_image === undefined
                          ? "https://img.freepik.com/free-vector/cute-astronaut-dance-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3851.jpg?w=740&t=st=1697513748~exp=1697514348~hmac=91629226d8cfffc849dce53dc83f9128e68a93a5fe7bc9273638b8efb0988ba1"
                          : `http://127.0.0.1:8000${userData.user_image}`
                      }
                      alt="avatar"
                      size="xxl"
                    />
                    <form>
                      <label
                        htmlFor="user_image"
                        className="cursor-pointer absolute -bottom-1 -right-1 rounded-full bg-gray-700 p-2"
                        title="Replace Image"
                      >
                        <TbPhotoEdit className=" text-gray-100 text-xl" />
                        <input
                          type="file"
                          name="user_image"
                          id="user_image"
                          className="hidden"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleUserImageFormSubmit}
                        />
                      </label>
                    </form>
                  </div>
                </div>
                <form onSubmit={handleUpdateFormSubmit}>
                  <div className="flex flex-col gap-4 mt-8">
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      color="purple"
                      label="First Name"
                      maxLength={100}
                      value={userData.first_name}
                      readOnly={!isEditing}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      color="purple"
                      label="Last Name"
                      maxLength={100}
                      value={userData.last_name}
                      readOnly={!isEditing}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      color="purple"
                      label="Email"
                      value={userData.email}
                      readOnly={!isEditing}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="role"
                      id="role"
                      color="purple"
                      label="Role"
                      value={userData.role}
                      maxLength={50}
                      readOnly={!isEditing}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {isEditing ? (
                    <div className="flex gap-4 mt-8 w-full">
                      <Button
                        type="reset"
                        color="red"
                        className="w-1/3"
                        onClick={handleResetOnClick}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" color="green" className="w-full">
                        Save Profile
                      </Button>
                    </div>
                  ) : (
                    <Button
                      color="purple"
                      className="mt-8 w-full"
                      onClick={handleUpdateOnClick}
                    >
                      Edit Profile
                    </Button>
                  )}
                </form>
                <ChangePassword />
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
