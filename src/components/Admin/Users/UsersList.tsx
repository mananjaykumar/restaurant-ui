import React, { useState, useEffect } from "react";
import { CommonTable } from "../../reusable/CommonTable";
import { Shimmer, tableBorderStyles } from "../../reusable/Shimmer";
import { Button, Stack, TableCell, TableRow } from "@mui/material";
import SearchInput from "../../reusable/SearchInput";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import toast from "react-hot-toast";
import { CommonMenu } from "../../reusable/CommonMenu";
import { CommonDrawer } from "../../reusable/CommonDrawer";
import AddAdmin from "./AddAdmin";
// import { NoData } from "../../reusable/NoData";

const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [adminDrawer, setAdminDrawer] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [fieldId, setFieldId] = useState("");
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const propsData = {
    columns: ["Name", "Email", "Role", "Phone", "Created At", "Updated At", ""],
    rowsPerPage: rowsPerPage,
    info: {
      data: users,
      meta: {
        total: users?.length,
        page: page,
      },
    },
    handleChangePage: () => {},
    height: "calc(100vh - 250px)",
  };

  // const handleEdit = () => {
  //   setAnchorEl(null);
  // };
  const menuItems = {
    items: [],
  };
  const handleMenu = (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setFieldId(_id);
  };

  const menuProps = {
    anchorEl,
    setAnchorEl,
    open,
    handleMenu,
    menuItems,
  };
  const handleSearchText = (inputText: React.SetStateAction<string>) => {
    setSearchText(inputText);
  };

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`)
      .then((res) => {
        setLoading(false);
        setUsers(res?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        // if (
        //   err?.response?.data?.message ===
        //   "Session Expired, Please Login again!"
        // ) {
        //   dispatch(logout());
        // }
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        padding: "5px 20px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <SearchInput
            changeAction={handleSearchText}
            searchValue={searchText}
            placeholder="Search"
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setAdminDrawer(true);
            }}
          >
            Admin
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <CommonTable {...propsData}>
          {loading && (
            <Shimmer
              length={propsData?.columns?.length}
              colsWidth={["60%", "10%", "17%", "12%", "1%"]}
            />
          )}
          {!loading &&
            users?.map((user: any) => {
              const updatedMenuProps = {
                ...menuProps,
                item: user,
              };
              return (
                <TableRow key={user._id} sx={{ ...tableBorderStyles }}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email || "_"}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {user?.role.sort().join(",")}
                  </TableCell>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell>{user?.createdAt}</TableCell>
                  <TableCell>{user?.updatedAt}</TableCell>
                  <TableCell>
                    <CommonMenu {...updatedMenuProps} />
                  </TableCell>
                </TableRow>
              );
            })}
        </CommonTable>
      </Stack>
      <CommonDrawer
        open={adminDrawer}
        handleClose={() => setAdminDrawer(false)}
        title="Add Admin"
        width="380px"
      >
        <AddAdmin
          handleClose={() => setAdminDrawer(false)}
          fetchUsers={fetchUsers}
        />
      </CommonDrawer>
    </Stack>
  );
};

export default UsersList;
