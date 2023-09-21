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
import { NoData } from "../../reusable/NoData";
// import { NoData } from "../../reusable/NoData";

interface Users {
  data: any[];
  meta: {
    pagination: {
      page: number;
      total: number;
    };
  };
}

const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [adminDrawer, setAdminDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [fieldId, setFieldId] = useState("");
  const [users, setUsers] = useState<Users>();
  const [searchText, setSearchText] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    const _newPage = newPage + 1;
    setPage(_newPage);
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/users?page=${_newPage}&rowsPerPage=${rowsPerPage}`;
    if (searchText) {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/users?search=${searchText}&page=${page}&rowsPerPage=${rowsPerPage}`;
    }
    fetchUsers(url);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const number = parseInt(event.target.value, 10);
    setRowsPerPage(number);
    setPage(1);
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/users?page=${page}&rowsPerPage=${number}`;
    if (searchText) {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/users?search=${searchText}&page=${page}&rowsPerPage=${number}`;
    }
    return fetchUsers(url);
  };

  const propsData = {
    columns: ["Name", "Email", "Role", "Phone", "Created At", "Updated At", ""],
    rowsPerPage: rowsPerPage,
    // info: {
    //   data: users,
    //   meta: {
    //     total: users?.length,
    //     page: page,
    //   },
    // },
    info: users,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    height: "calc(100vh - 250px)",
    msg: "No matching Users",
    subMsg: "We could not find any Users matching your search",
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

  const fetchUsers = (url?: string) => {
    let URL = `${process.env.REACT_APP_BACKEND_URL}/api/admin/users?page=${page}&rowsPerPage=${rowsPerPage}`;
    if (url) {
      URL = url;
    }
    setLoading(true);
    axios
      .get(URL)
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
    if (searchText) {
      setPage(1);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/users?search=${searchText}&page=1&rowsPerPage=${rowsPerPage}`;
      fetchUsers(url);
    } else {
      fetchUsers();
    }
  }, [searchText]);
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
            placeholder="Search by Name"
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
            users?.data?.map((user: any) => {
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
