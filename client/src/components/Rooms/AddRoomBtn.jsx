import { MdAdd } from "react-icons/md";

export default function AddRoomBtn() {
  return (
    <>
      <button
        type="button"
        className="text-3xl rounded-full text-gray-200 shadow-md p-2 bg-purple-400 hover:bg-purple-700 transform active:translate-y-0.5 active:-translate-x-0.5 transition delay-75 duration-100 ease-in-out"
      >
        <MdAdd />
      </button>
    </>
  );
}
