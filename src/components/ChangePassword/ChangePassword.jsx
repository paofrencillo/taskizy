import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersServices from "../../services/UsersServices";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function ChangePassword() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [openChangePassDialog, setOpenChangePassDialog] = useState(false);
  const [currentPassErrors, setCurrentPassErrors] = useState([]);
  const [newPassErrors, setNewPassErrors] = useState([]);
  const [rePassErrors, setRePassErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle the dialog for changing password
  const handleOpenChangePassDialog = () =>
    setOpenChangePassDialog(!openChangePassDialog);

  // handle the accordion for account options
  const handleOpenAccordion = (value) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  // remove the error validation on forms when the input was changed
  const handleOnChangeInput = () => {
    setCurrentPassErrors([]);
    setNewPassErrors([]);
    setRePassErrors([]);
  };

  // handle the submit of change password form
  const handleChangePassForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setIsLoading(true);

    const sendForm = async () => {
      try {
        const response = await UsersServices.changePassword(formData);

        if (response.status === 204) {
          handleOpenChangePassDialog();
          setOpenAccordion(0);

          toast.success("Your password was changed successfully.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        console.error(err);
        err.response.data.current_password
          ? setCurrentPassErrors(err.response.data.current_password)
          : setCurrentPassErrors([]);
        err.response.data.new_password
          ? setNewPassErrors(err.response.data.new_password)
          : setNewPassErrors([]);
        err.response.data.re_new_password
          ? setRePassErrors(err.response.data.re_new_password)
          : setRePassErrors([]);
        err.response.data.non_field_errors
          ? setRePassErrors(err.response.data.non_field_errors)
          : setRePassErrors([]);
      } finally {
        setIsLoading(false);
      }
    };
    sendForm();
  };

  return (
    <>
      {/*  */}
      {/* Change Password Dialog */}

      {/*  */}
      <Dialog
        open={openChangePassDialog}
        handler={handleOpenChangePassDialog}
        size="xs"
      >
        <DialogHeader>Change Password</DialogHeader>
        <form onSubmit={handleChangePassForm}>
          <DialogBody className="flex flex-col gap-4">
            <div>
              <Input
                type="password"
                name="current_password"
                label="Current Password"
                color="purple"
                onChange={handleOnChangeInput}
                readOnly={isLoading}
              />
              {isLoading ? (
                ""
              ) : (
                <small className="text-red-400">
                  {currentPassErrors.map((error) => {
                    return error;
                  })}
                </small>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="new_password"
                minLength={8}
                label="New Password"
                color="purple"
                onChange={handleOnChangeInput}
                readOnly={isLoading}
              />
              {isLoading ? (
                ""
              ) : (
                <small className="text-red-400">
                  {newPassErrors.map((error) => {
                    return error;
                  })}
                </small>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="re_new_password"
                minLength={8}
                label="Re-type New Password"
                color="purple"
                onChange={handleOnChangeInput}
                readOnly={isLoading}
              />
              {isLoading ? (
                ""
              ) : (
                <small className="text-red-400">
                  {rePassErrors.map((error) => {
                    return error;
                  })}
                </small>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            {isLoading ? (
              <div className="w-full text-center flex justify-center items-center p-2">
                <Spinner color="purple" />
              </div>
            ) : (
              <>
                <Button
                  type="reset"
                  variant="text"
                  color="red"
                  onClick={handleOpenChangePassDialog}
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
      <Accordion
        open={openAccordion === 1}
        icon={<Icon id={1} open={openAccordion} />}
        className="py-0.5 mt-4"
      >
        <AccordionHeader
          onClick={() => handleOpenAccordion(1)}
          className="text-xs"
        >
          Account Options
        </AccordionHeader>
        <AccordionBody>
          <Button
            variant="outlined"
            color="red"
            size="sm"
            onClick={handleOpenChangePassDialog}
            className="mb-2"
            fullWidth
          >
            Change Password
          </Button>
        </AccordionBody>
      </Accordion>
    </>
  );
}
