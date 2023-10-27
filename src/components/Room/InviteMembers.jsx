import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UsersServices from "../../services/UsersServices";
import { useParams } from "react-router-dom";
import RoomServices from "../../services/RoomServices";
import { freeUserImgURL } from "../../config/userImgs";
import { SERVER_URL } from "../../config/apiUrls";

export default function InviteMembers() {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
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
          user_image:
            member.user_image === null || member.user_image === ""
              ? freeUserImgURL
              : `${SERVER_URL}${member.user_image}`,
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
          // formatOptionLabel={({ label }) => (
          //   <MemberLabel userImg={} memberFullName={label} />
          // )}
          formatOptionLabel={({ user_image, label }) => (
            <div className="flex justify-start items-center gap-2 group">
              <div className="w-8 h-8 rounded-full">
                <img
                  src={user_image}
                  alt="user-img"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-sm">{label}</div>
            </div>
          )}
          onChange={handleSelectChange}
          value={selectedValues}
          placeholder={"Select people ..."}
          isMulti
          required
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
