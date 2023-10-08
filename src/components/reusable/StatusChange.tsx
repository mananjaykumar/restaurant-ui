import React from "react";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";
import theme from "../../theme";
import axios from "axios";
import toast from "react-hot-toast";

const statusArr = [
  { label: "ORDER PLACED", value: "ORDER_PLACED" },
  { label: "PREPARING", value: "PREPARING" },
  { label: "ON THE WAY", value: "ON_THE_WAY" },
  { label: "COMPLETED", value: "COMPLETED" },
];

const StatusChange = (props: any) => {
  const { order, handleApiCall } = props;

  const handleStatusChange = (event: SelectChangeEvent) => {
    const item = statusArr.find((item) => item.value === event.target.value);
    console.log("item", item);
    if (item) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/update-order`, {
          order_id: order._id,
          status: item.value,
        })
        .then((res) => {
          toast.success(res?.data?.message);
          handleApiCall();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  // const checkDisabled = (index: number) => {
  //   const item = statusArr.filter((it) => it.value === order.status)[0];
  //   return index < statusArr.indexOf(item);
  // };
  return (
    <Select
      value={order?.status}
      onChange={handleStatusChange}
      sx={{
        backgroundColor: theme.palette.grey[100],
        padding: "2px",
        width: "150px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.MuiOutlinedInput-root": {
          height: "24px",
          borderRadius: "3px",
        },
        "& .MuiSelect-outlined": {
          textAlign: "left",
        },
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
        "& .MuiSelect-icon": {
          fontSize: "2rem",
          right: "4px",
        },
      }}
      MenuProps={{
        PaperProps: {
          elevation: 2,
          sx: {
            borderRadius: 0,
            minWidth: "100px",
            width: "130px",
            "& .MuiList-root": {
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(0.6),
            },
            //   "& .MuiMenuItem-root": {
            //     textTransform: "none",
            //     p: 1.25,
            //     fontSize: "13px",
            //     borderRadius: 0,
            //     borderBottom: `1px solid ${theme.palette.grey[200]}`,
            //     "&:last-child": {
            //       borderBottom: "none",
            //     },
            //     "&:hover": {
            //       background: theme.palette.primary.light,
            //     },
            //   },

            "& .MuiMenuItem-root": {
              backgroundColor: theme.palette.grey[100],
              borderRadius: "4px",
              fontSize: "13px",
              "&:hover": {
                backgroundColor: "#EDF5FF",
              },
            },
          },
        },
      }}
    >
      {statusArr?.map((item: any, index: number) => {
        return (
          <MenuItem
            value={item?.value}
            key={item?.label}
            // disabled={checkDisabled(index)}
          >
            {item?.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusChange;
