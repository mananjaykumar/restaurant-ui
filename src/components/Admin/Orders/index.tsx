import React, { useState, useEffect } from "react";
import {
  Paper,
  Stack,
  TableCell,
  TableRow,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import CustomDateRangePicker from "../../reusable/CustomDateRangePicker";
import { CommonTable } from "../../reusable/CommonTable";
import { Shimmer, tableBorderStyles } from "../../reusable/Shimmer";
import { CommonMenu } from "../../reusable/CommonMenu";
import { MenuItem } from "@mui/base";
import StatusChange from "../../reusable/StatusChange";

export interface IDateRangeData {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  pastDate: string;
}

const Orders = () => {
  const [dateRangeData, setDateRangeData] = useState<IDateRangeData>({
    startDate: dayjs().subtract(7, "day"),
    endDate: dayjs(),
    pastDate: "last_7_days",
  });
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [fieldId, setFieldId] = useState("");

  console.log("dateRangeData", dateRangeData);

  const propsData = {
    columns: [
      "Order Id",
      "Products",
      "Order Type",
      "Status",
      "Created At",
      "Updated At",
      "",
    ],
    rowsPerPage: rowsPerPage,
    // info: {
    //   data: users,
    //   meta: {
    //     total: users?.length,
    //     page: page,
    //   },
    // },
    info: orders,
    handleChangePage: () => {},
    handleChangeRowsPerPage: () => {},
    height: "calc(100vh - 270px)",
    msg: "No matching Orders",
    subMsg: "We could not find any Orders matching your search",
  };

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

  const handleApiCall = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders`, {
        startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
        endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
      })
      .then((res) => {
        console.log("res", res);
        setOrders(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleApiCall();
  }, [dateRangeData]);

  return (
    <Stack gap={2} direction="column">
      <Stack alignSelf="flex-end">
        <CustomDateRangePicker
          dateRangeData={dateRangeData}
          setDateRangeData={setDateRangeData}
        />
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
            orders?.data?.map((order: any) => {
              const updatedMenuProps = {
                ...menuProps,
                item: order,
              };
              return (
                <TableRow key={order._id} sx={{ ...tableBorderStyles }}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.products}</TableCell>
                  <TableCell>{order?.order_type}</TableCell>
                  <TableCell>
                    <StatusChange order={order} />
                  </TableCell>
                  <TableCell>{dayjs(order?.createdAt).format("LLL")}</TableCell>
                  <TableCell>{dayjs(order?.updatedAt).format("LLL")}</TableCell>
                  <TableCell>
                    <CommonMenu {...updatedMenuProps} />
                  </TableCell>
                </TableRow>
              );
            })}
        </CommonTable>
      </Stack>
    </Stack>
  );
};

export default Orders;
