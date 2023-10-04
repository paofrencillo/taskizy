import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UsersServices from "../../services/UsersServices";
import MemberLabel from "./MemberLabel";
import { useParams } from "react-router-dom";
import RoomServices from "../../services/RoomServices";

export default function InviteMembers() {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValues, setSelectedValues] = useState([]); // State to store selected values
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 6;
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UsersServices.getUsers(params.room_id);
        const members = response.data;

        const newOptions = members.map((member) => ({
          value: member.id,
          label: member.first_name + " " + member.last_name, // Store the full name separately
        }));

        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [params.room_id]);

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
  const handleSelectChange = (selectedOptions) => {
    setSelectedValues(selectedOptions); // Store selected values in state
  };

  // Handle Submit of Adding Room Members
  const handleMembersSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    console.log(selectedValues);

    const sendForm = async () => {
      const formData = new FormData();
      formData.append("room_id", params.room_id);
      formData.append("new_members", JSON.stringify(selectedValues));
      await RoomServices.addRoomMembers(formData, params)
        .then((res) => {
          if (res.status === 201) {
            location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    sendForm();
  };

  return (
    <div>
      <form onSubmit={handleMembersSubmit}>
        <Select
          isClearable={true}
          isSearchable={true}
          components={makeAnimated()}
          options={filteredOptions}
          onInputChange={handleInputChange}
          inputValue={searchInput}
          formatOptionLabel={({ label }) => (
            <MemberLabel userFullName={label} />
          )}
          onChange={handleSelectChange}
          value={selectedValues}
          isMulti
        />
        <button
          type="submit"
          className="mt-4 w-full bg-purple-500 text-white shadow-md rounded-md p-2 hover:bg-purple-700 active:bg-purple-700 active:translate-y-0.5"
        >
          Add
        </button>
      </form>
    </div>
  );
}
