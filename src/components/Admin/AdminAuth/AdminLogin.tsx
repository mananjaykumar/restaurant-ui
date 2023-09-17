import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
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
    <Grid container direction="row">
      <Grid item>
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
          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        ) : (
          <Button variant="contained" disabled={loading} onClick={handleLogin}>
            {loading ? "Loading..." : "Login"}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminLogin;
