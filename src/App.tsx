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
import Protected from "./routes/Protected";
import Admin from "./components/Admin";
import NewSidebarMain from "./components/Admin/AdminLayout/Sidebar";

interface Props {
  children: React.ReactNode;
}
const HOC = ({ children }: Props) => {
  return (
    <>
      <TopAppBar />
      {children}
    </>
  );
};
const HOCAdmin = ({ children }: Props) => {
  return (
    <>
      <NewSidebarMain />
      {children}
    </>
  );
};

function App() {
  const { userData, AdminData } = useSelector((state: any) => state.auth);
  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <div style={{ flex: 1 }}>
        {/* <TopAppBar /> */}
        <Stack mt="130px">
          <Routes>
            <Route
              path="/"
              element={
                <HOC>
                  <Home />
                </HOC>
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route
              element={
                <Protected
                  redirectPath="/"
                  isAllowed={
                    (userData?.token ? true : false) &&
                    (userData?.role?.includes("user") ? true : false)
                  }
                />
              }
            >
              <Route
                path="/dashboard"
                element={
                  <HOC>
                    <Dashboard />
                  </HOC>
                }
              />
              <Route
                path="/users"
                element={
                  <HOC>
                    <Users />
                  </HOC>
                }
              />
            </Route>

            <Route
              element={
                <Protected
                  redirectPath="/admin"
                  isAllowed={
                    (userData?.token ? true : false) &&
                    (userData?.role?.includes("admin") ? true : false)
                  }
                />
              }
            >
              <Route
                path="/admin/uploads/banner"
                element={
                  <HOCAdmin>
                    <AdminBanner />
                  </HOCAdmin>
                }
              />
              <Route
                path="/admin/uploads/most-loved"
                element={
                  <HOCAdmin>
                    <AdminMostLoved />
                  </HOCAdmin>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <HOC>
                  <NoMatch />
                </HOC>
              }
            />

            {/* <Route
              path="/"
              element={
                <HOC>
                  <Home />
                </HOC>
              }
            />
            <Route
              path="/admin/uploads/most-loved"
              element={<AdminMostLoved />}
            />
            {userData?.token ? (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <HOC>
                      <Dashboard />
                    </HOC>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <HOC>
                      <Users />
                    </HOC>
                  }
                />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <HOC>
                    <LoginFirst>
                      <Home />
                    </LoginFirst>
                  </HOC>
                }
              />
            )}

            {userData?.token && AdminData?.token ? (
              <Route path="/admin/uploads/banner" element={<AdminBanner />} />
            ) : (
              userData?.token && (
                <Route path="*" element={<>Admin Login First</>} />
              )
            )}
            <Route
              path="*"
              element={
                <HOC>
                  <NoMatch />
                </HOC>
              }
            /> */}
          </Routes>
        </Stack>
      </div>
    </div>
  );
}

export default App;
