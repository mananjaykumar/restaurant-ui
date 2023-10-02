import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Layout/Sidebar";
import { Stack } from "@mui/material";
import TopAppBar from "./components/Layout/TopAppBar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import AdminBanner from "./components/Admin/uploads/AdminBanner";
import AdminMostLoved from "./components/Admin/uploads/AdminProducts";
import AddAdminCategory from "./components/Admin/Add/AddAdminCategory";
import AddAdminSubCategory from "./components/Admin/Add/AddAdminSubCategory";
import { NoMatch } from "./pages/NoMatch";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Protected from "./routes/Protected";
import Admin from "./components/Admin";
import NewSidebarMain from "./components/Admin/AdminLayout/Sidebar";
import * as navLinks from "./routes/constants";
import UsersList from "./components/Admin/Users/UsersList";
import Footer from "./components/Layout/Footer";
import "aos/dist/aos.css";

interface Props {
  children: React.ReactNode;
}
const HOC = ({ children }: Props) => {
  return (
    <>
      <TopAppBar />
      {children}
      <Footer />
    </>
  );
};
const HOCAdmin = ({ children }: Props) => {
  return (
    <>
      <NewSidebarMain>{children}</NewSidebarMain>
    </>
  );
};

function App() {
  const { userData } = useSelector((state: any) => state.auth);
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
            <Route path={navLinks.R_ROOT} element={<Admin />} />
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
                  redirectPath={navLinks.R_ROOT}
                  isAllowed={
                    (userData?.token ? true : false) &&
                    (userData?.role?.includes("admin") ? true : false)
                  }
                />
              }
            >
              <Route
                path={navLinks.R_ADD_CATEGORY}
                element={
                  <HOCAdmin>
                    <AddAdminCategory />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_ADD_SUB_CATEGORY}
                element={
                  <HOCAdmin>
                    <AddAdminSubCategory />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_UPLOAD_BANNER}
                element={
                  <HOCAdmin>
                    <AdminBanner />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_UPLOAD_BANNER}
                element={
                  <HOCAdmin>
                    <AdminBanner />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_UPLOAD_PRODUCTS}
                element={
                  <HOCAdmin>
                    <AdminMostLoved />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_USERS_LIST}
                element={
                  <HOCAdmin>
                    <UsersList />
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
