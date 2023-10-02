import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AddAdminSubCategory = () => {
  const [loading, setLoading] = React.useState(false);
  const [subCategoryState, setSubCategoryState] = React.useState({
    name: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/add-subCategory`, {
        name: subCategoryState.name,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        setSubCategoryState((prev) => {
          return {
            ...prev,
            name: "",
          };
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <Stack
      sx={{
        marginLeft: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
        marginRight: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
      }}
    >
      <Stack
        sx={{
          margin: { sm: "0px 64px", xs: "0px 20px", md: "64px 192px" },
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <Stack>
          <Typography fontFamily="Basis Grotesque Pro" fontSize="25px">
            Add Sub Category
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            autoFocus
            variant="outlined"
            label="Sub Category*"
            value={subCategoryState.name}
            disabled={loading}
            onChange={(e) => {
              setSubCategoryState((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              "&:hover": {
                backgroundColor: "#FC8019",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
              },
            }}
          >
            {loading ? "Loading ..." : "Submit"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddAdminSubCategory;
