import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import RoomServices from "../services/RoomServices";
import RoomCard from "../components/Rooms/RoomCard";
import AddRoomBtn from "../components/Rooms/AddRoomBtn";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import { useOutletContext } from "react-router-dom";
import TokenServices from "../services/tokenServices";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [charNum, setCharNum] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = useOutletContext();

  useEffect(() => {
    // Fetch and set rooms when the component mounts
    const fetchRooms = async () => {
      try {
        const response = await RoomServices.getRooms();
        if (response.status === 200) {
          setRooms(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          const response = TokenServices.refreshTokens()
          console.log(response.status)
        }
          
          
      }
    };

    fetchRooms();
    document.title = "Taskizy | Rooms";
  }, []);

  // Handle add room modal
  const handleShowModal = () => setShowModal(!showModal);

  // Handle on change of room name input
  const handleOnChange = (e) => {
    setCharNum(e.target.value.length);
  };

  // Handle submit of new room to the server
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const roomFormData = new FormData(e.target);

    RoomServices.createRoom(roomFormData)
      .then((res) => {
        if (res.status === 201) {
          location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen">
          <MutatingDotsLoader />
        </div>
      ) : (
        <div className="pt-16">
          <div className="flex flex-wrap justify-center gap-8 p-8">
            {rooms.map((room) => {
              return (
                <RoomCard key={room.room_id} roomData={room} user={user} />
              );
            })}
          </div>

          {rooms.length === 0 && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center">
              <img
                src="/undraw_searching_re_3ra9.svg"
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
          <Dialog open={showModal} handler={handleShowModal}>
            <DialogHeader>Create New Room</DialogHeader>
            <form onSubmit={handleFormSubmit}>
              <DialogBody divider>
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
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleShowModal}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button type="submit" variant="gradient" color="purple">
                  <span>Create</span>
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </div>
      )}
    </>
  );
}
