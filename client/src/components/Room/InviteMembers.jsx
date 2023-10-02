import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UsersServices from "../../services/UsersServices";
import MemberLabel from "./MemberLabel";

export default function InviteMembers() {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValues, setSelectedValues] = useState([]); // State to store selected values
  const pageSize = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UsersServices.getUsers();
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
  }, []);

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

  return (
    <div>
      <Select
        isClearable={true}
        isSearchable={true}
        components={makeAnimated()}
        options={filteredOptions}
        onInputChange={handleInputChange}
        inputValue={searchInput}
        formatOptionLabel={({ label }) => <MemberLabel userFullName={label} />}
        onChange={handleSelectChange}
        value={selectedValues}
        isMulti
      />
    </div>
  );
}
