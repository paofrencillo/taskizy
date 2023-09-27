import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Rooms from "./pages/Rooms.jsx";
import Tasks from "./pages/Tasks.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Error404 from "./pages/Errors/Error404.jsx";
import Error403 from "./pages/Errors/Error403.jsx";
import Error400 from "./pages/Errors/Error400.jsx";
import Error500 from "./pages/Errors/Error500.jsx";
import Activate from "./pages/Activate.jsx";
import ActivateSuccess from "./pages/Success/ActivateSuccess.jsx";

const getUserData = localStorage.getItem("access");
console.log(getUserData);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {getUserData ? (
          <Route path="/" element={<App />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id/:room_slug" element={<Rooms />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />

        <Route path={"/register"} element={<Register />} />
        <Route path={"/activate/:uid/:token/"} element={<Activate />} />
        <Route path={"/activate-success"} element={<ActivateSuccess />} />
        <Route path={"/400"} element={<Error400 />} />
        <Route path={"/403"} element={<Error403 />} />
        <Route path={"/404"} element={<Error404 />} />
        <Route path={"/500"} element={<Error500 />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
