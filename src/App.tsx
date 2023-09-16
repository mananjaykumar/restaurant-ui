import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Layout/Sidebar";
import { Stack } from "@mui/material";
import TopAppBar from "./components/Layout/TopAppBar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import AdminBanner from "./components/Admin/uploads/AdminBanner";
import AdminMostLoved from "./components/Admin/uploads/AdminMostLoved";
import { NoMatch } from "./pages/NoMatch";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import LoginFirst from "./pages/LoginFirst";

function App() {
  const { userData } = useSelector((state: any) => state.auth);
  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <div style={{ flex: 1 }}>
        <TopAppBar />
        <Stack mt="130px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/uploads/banner" element={<AdminBanner />} />
            <Route
              path="/admin/uploads/most-loved"
              element={<AdminMostLoved />}
            />
            {userData?.token ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <LoginFirst>
                    <Home />
                  </LoginFirst>
                }
              />
            )}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Stack>
      </div>
    </div>
  );
}

export default App;
