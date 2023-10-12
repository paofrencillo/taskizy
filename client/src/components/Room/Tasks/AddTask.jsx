import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAddTask } from "react-icons/md";
import MemberLabel from "../MemberLabel";
import TaskServices from "../../../services/TaskServices";

export default function AddTask({ roomMembers, user }) {
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const animatedComponents = makeAnimated();
  const pageSize = 6;
  const params = useParams();

  // Get the room members and set it as the Select options
  useEffect(() => {
    const getRoomMembers = async () => {
      if (roomMembers) {
        const newOptions = roomMembers.map((member) => ({
          value: member.id,
          label: `${member.first_name} ${member.last_name}${
            member.id === user.userID ? " (Me)" : ""
          }`,
        }));

        setOptions(newOptions);
      }
    };

    getRoomMembers();
  }, [roomMembers, user.userID]);

  // Handle the state dialog box
  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setSelectedValue("");
    }
  };

  // Handles Select state if the search was done
  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue);

    // Filter options based on the input value
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Display only the first `pageSize` filtered options
    setFilteredOptions(filtered.slice(0, pageSize));
  };

  // Handle selection change
  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  // Handle the submit of add task form
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const taskFormData = new FormData(e.target);

    if (!document.getElementsByName("is_urgent")[0].checked) {
      taskFormData.append("is_urgent", "off");
    }

    const sendFormData = async () => {
      try {
        const response = await TaskServices.createTask(
          taskFormData,
          params.room_id
        );

        if (response.status === 201) {
          setOpen(!open);
          toast.success("Task created successfully.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } catch (err) {
        console.error(err);
        setOpen(!open);
        toast.error("Something is wrong. Try to refresh the page.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    };

    sendFormData();
  };

  return (
    <>
      <ToastContainer />
      <button
        type="button"
        className="flex gap-2 justify-center items-center p-2 text-blue-700 w-fit rounded-lg shadow-lg border-2 hover:bg-blue-100 hover:border-blue-100 transition-colors ease-in-out delay-75 duration-200"
        onClick={handleOpen}
      >
        <MdAddTask className="text-lg" />
        <Typography variant="small" className="hidden sm:inline-block">
          Add New Task
        </Typography>
      </button>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <form className="my-2 w-full" onSubmit={handleFormSubmit}>
          <DialogHeader>Add New Task</DialogHeader>
          <DialogBody divider>
            <Card color="transparent" shadow={false}>
              <div className="mb-2 flex flex-col gap-6">
                <Textarea
                  name="description"
                  label="Description"
                  color="blue"
                  required
                />
                <Select
                  name="tasker"
                  defaultValue={options.find((option) => {
                    if (option.value === user.userID) {
                      return option;
                    } else {
                      return selectedValue;
                    }
                  })}
                  isClearable={true}
                  isSearchable={true}
                  components={animatedComponents}
                  options={filteredOptions}
                  onInputChange={handleInputChange}
                  inputValue={searchInput}
                  formatOptionLabel={({ label }) => (
                    <MemberLabel memberFullName={label} />
                  )}
                  onChange={handleSelectChange}
                  placeholder={"Select Tasker ..."}
                  required
                />
                <Checkbox name="is_urgent" color="blue" label="Urgent" />
              </div>
            </Card>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
