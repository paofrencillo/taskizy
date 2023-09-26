import React from "react";
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
import Activate from "./pages/Activate.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id/:room_slug" element={<Rooms />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          /activate/OA/bv4xag-73c641edff300a6f32ef72bc2855138e/
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/activate/:uid/:token/"} element={<Activate />} />
        <Route path={"/403"} element={<Error403 />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
