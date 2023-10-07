import React from "react";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";
import theme from "../../theme";

const StatusChange = ({ order }: any) => {
  const handleStatusChange = (event: SelectChangeEvent) => {
    const Item = [
      { label: "Order Placed", value: "ORDER_PLACED" },
      { label: "Preparing", value: "PREPARING" },
      { label: "On the Way", value: "ON_THE_WAY" },
      { label: "Completed", value: "COMPLETED" },
    ].find((item) => item.value === event.target.value);
  };

  const checkDisabled = (index: number) => {
    const item = [
      { label: "Order Placed", value: "ORDER_PLACED" },
      { label: "Preparing", value: "PREPARING" },
      { label: "On the Way", value: "ON_THE_WAY" },
      { label: "Completed", value: "COMPLETED" },
    ].filter((it) => it.value === order.status)[0];
    return (
      index <
      [
        { label: "Order Placed", value: "ORDER_PLACED" },
        { label: "Preparing", value: "PREPARING" },
        { label: "On the Way", value: "ON_THE_WAY" },
        { label: "Completed", value: "COMPLETED" },
      ].indexOf(item)
    );
  };
  return (
    <Select
      value={order?.status}
      onChange={handleStatusChange}
      sx={{
        backgroundColor: theme.palette.grey[100],
        padding: "2px",
        width: "130px",
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
      {[
        { label: "Order Placed", value: "ORDER_PLACED" },
        { label: "Preparing", value: "PREPARING" },
        { label: "On the Way", value: "ON_THE_WAY" },
        { label: "Completed", value: "COMPLETED" },
      ]?.map((item: any, index: number) => {
        return (
          <MenuItem
            value={item?.value}
            key={item?.label}
            disabled={checkDisabled(index)}
          >
            {item?.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusChange;
