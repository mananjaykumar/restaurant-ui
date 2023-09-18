import React, { useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/AuthSlice";
import axios from "axios";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminLoginState, setAdminLoginState] = useState({
    phone: "",
    _id: "",
    otp: "",
  });
  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/admin/send-otp`, {
        phone: adminLoginState.phone,
      })
      .then((res) => {
        setLoading(false);
        setOtpSent(true);
        setAdminLoginState((prev: any) => {
          return {
            ...prev,
            _id: res?.data?.data?._id,
          };
        });
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/admin/verify-otp`, {
        _id: adminLoginState._id,
        otp: adminLoginState.otp,
      })
      .then((res) => {
        setLoading(false);
        dispatch(login({ userInfo: res?.data?.data }));
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
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
        gap={2}
        sx={{
          padding: { xs: "30px", sm: "50px", md: "50px 300px" },
        }}
      >
        <Stack>
          <Typography fontSize="24px">Welcome to Admin Portal</Typography>
        </Stack>
        <Stack gap={2}>
          <TextField
            autoFocus
            variant="outlined"
            type="number"
            label="Phone Number"
            disabled={otpSent}
            value={adminLoginState.phone}
            onChange={(e) => {
              setAdminLoginState((prev: any) => {
                return {
                  ...prev,
                  phone: e.target.value,
                };
              });
            }}
          />
          {otpSent && (
            <TextField
              variant="outlined"
              type="number"
              label="OTP"
              value={adminLoginState.otp}
              onChange={(e) => {
                setAdminLoginState((prev: any) => {
                  return {
                    ...prev,
                    otp: e.target.value,
                  };
                });
              }}
            />
          )}
          {otpSent ? (
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
              sx={{
                width: "fit-content",
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleLogin}
              sx={{
                width: "fit-content",
              }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AdminLogin;
