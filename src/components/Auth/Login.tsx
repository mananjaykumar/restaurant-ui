import React from "react";
import { Stack, TextField, Button, Typography, Box } from "@mui/material";
import { login } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { toggleLoginDrawer } from "../../store/slices/TogglerSlice";

interface ILogin {
  setShowLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: ILogin) => {
  const dispatch = useDispatch();
  const { defaultLoginData } = useSelector((state: any) => state.toggle);
  const { setShowLoginDrawer } = props;
  const [loginState, setLoginState] = React.useState({
    phone: "",
    otp: "",
    user_id: "",
  });
  const [otpSent, setOtpSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/send-otp`, {
        phone: loginState.phone,
      })
      .then((res) => {
        setLoginState((prev: any) => {
          return {
            ...prev,
            user_id: res.data.user_id,
          };
        });
        setOtpSent(true);
        toast.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-otp`, {
        otp: loginState.otp,
        user_id: loginState.user_id,
      })
      .then((res) => {
        // setOtpSent(false);
        setLoading(false);
        toast.success(res.data.message);
        setShowLoginDrawer(false);
        dispatch(login({ userInfo: res?.data }));
        dispatch(toggleLoginDrawer({ open: false }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  React.useState(() => {
    if (defaultLoginData.drawerOpen) {
      toast.error("Please Log In First!");
    }
  });
  return (
    <Stack width="100%">
      <Stack mt={4} gap={2}>
        <TextField
          autoFocus
          variant="outlined"
          label="Phone Number*"
          disabled={otpSent}
          value={loginState.phone}
          onChange={(e) => {
            setLoginState((prev) => {
              return {
                ...prev,
                phone: e.target.value,
              };
            });
          }}
        />
        {otpSent && (
          <TextField
            autoFocus
            variant="outlined"
            label="OTP*"
            value={loginState.otp}
            onChange={(e) => {
              setLoginState((prev) => {
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
            sx={{
              backgroundColor: "#FC8019",
              "&:hover": {
                backgroundColor: "#FC8019",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
              },
            }}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        ) : (
          <Stack>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FC8019",
                "&:hover": {
                  backgroundColor: "#FC8019",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#f3f3f3",
                },
              }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: "#686b78",
                marginTop: "6px",
                fontWeight: 500,
              }}
            >
              By Clicking on Login, I accept the{" "}
              <Box component="span" sx={{ fontWeight: 600 }}>
                Terms & Conditions & Privacy Policy
              </Box>
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Login;
