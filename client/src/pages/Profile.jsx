import { useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Profile() {
  const user = useOutletContext();

  return (
    <div>
      <Navbar name={user.fullName} />
      Profile
    </div>
  );
}
