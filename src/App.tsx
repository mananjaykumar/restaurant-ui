import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Layout/Sidebar";
import TopAppBar from "./components/Layout/TopAppBar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Admin from "./components/Admin";
import { NoMatch } from "./pages/NoMatch";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
  const { userData } = useSelector((state: any) => state.auth);
  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <div style={{ flex: 1 }}>
        <TopAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          {userData?.token ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
            </>
          ) : (
            <Route path="*" element={<Home />} />
          )}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
