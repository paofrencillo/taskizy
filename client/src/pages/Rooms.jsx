import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import RoomServices from "../services/RoomServices";
import Navbar from "../components/Navbar/Navbar";
import RoomCard from "../components/Rooms/RoomCard";
import AddRoomBtn from "../components/Rooms/AddRoomBtn";

export default function Rooms() {
  const user = useOutletContext();
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [charNum, setCharNum] = useState(0);

  showModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    // Fetch and set rooms when the component mounts
    const fetchRooms = async () => {
      try {
        const response = await RoomServices.getRooms();
        if (response.status === 200) {
          setRooms(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const handleOnChange = (e) => {
    setCharNum(e.target.value.length);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const roomFormData = new FormData(e.target);

    RoomServices.createRoom(roomFormData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(`${res.data.room_name} room created successfully`, {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <Navbar name={user.fullName} />
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {rooms.map((room) => {
          return <RoomCard key={room.room_id} roomData={room} />;
        })}
      </div>

      {rooms.length === 0 && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center">
          <img
            src="undraw_searching_re_3ra9.svg"
            alt="searching-img"
            className="w-96"
          />
          <h1 className="font-bold text-3xl text-purple-700">
            You have no rooms.
          </h1>
        </div>
      )}

      <div
        onClick={() => {
          setShowModal(!showModal);
        }}
        className="fixed bottom-10 right-0 mx-4"
      >
        <AddRoomBtn />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-50 top-0 left-0 bg-gray-500 bg-opacity-50 w-screen h-screen ">
          <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[325px] bg-gray-100 shadow-md rounded-lg p-8">
            <IoMdCloseCircle
              className="absolute top-2 right-2 text-purple-700 text-2xl cursor-pointer"
              onClick={() => {
                setShowModal(!showModal);
              }}
            />
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="room_name"
                className="py-3 text-gray-700 px-4 block w-full border-2 border-gray-200 rounded-lg focus:outline-0 focus:border-purple-200"
                placeholder="Room Name"
                onChange={handleOnChange}
                maxLength={25}
              />
              <div className="w-full text-gray-400 text-end font-extralight text-xs">
                {charNum} / 25
              </div>
              <button
                type="submit"
                className="text-center w-full rounded-lg shadow-sm shadow-purple-500 bg-purple-500 p-2 mt-6 text-gray-100 font-semibold hover:bg-purple-700 focus:bg-purple-700 focus:-translate-y-0.5"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
