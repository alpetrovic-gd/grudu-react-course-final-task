import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client"; // Note the /client import
import App from "./pages/App";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layouts/MainLayout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
