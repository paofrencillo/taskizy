import Navbar from "../components/Navbar/Navbar";

export default function Layout(props) {
  return (
    <div>
      <Navbar name={user.fullName} />
      {props.children}
    </div>
  );
}
