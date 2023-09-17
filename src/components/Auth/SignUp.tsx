import React from "react";
import { Stack, TextField, Button, Typography, Box } from "@mui/material";
import { login } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

interface ISignUp {
  setShowSignUpDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = (props: ISignUp) => {
  const { setShowSignUpDrawer } = props;
  const dispatch = useDispatch();
  const [signUpState, setSignUpState] = React.useState({
    phone: "",
    name: "",
    email: "",
    otp: "",
    _id: "",
  });
  const [otpSent, setOtpSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSendOTP = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/phone`, {
        phone: signUpState.phone,
        name: signUpState.name,
        email: signUpState.email,
      })
      .then((res) => {
        if (res?.data?.message === "User access has been granted") {
          dispatch(login({ userInfo: res?.data?.data }));
          setShowSignUpDrawer(false);
        } else {
          setSignUpState((prev: any) => {
            return {
              ...prev,
              _id: res?.data?.data._id,
            };
          });
          setOtpSent(true);
        }
        toast.success(res?.data?.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-otp`, {
        otp: signUpState.otp,
        _id: signUpState._id,
      })
      .then((res) => {
        // setOtpSent(false);
        console.log("res", res);
        setLoading(false);
        toast.success(res?.data?.message);
        setShowSignUpDrawer(false);
        dispatch(login({ userInfo: res?.data?.data }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <Stack width="100%">
      <Stack mt={4} gap={2}>
        <TextField
          autoFocus
          variant="outlined"
          label="Phone Number*"
          type="number"
          inputProps={{ maxLength: 10 }}
          disabled={otpSent}
          value={signUpState.phone}
          onChange={(e) => {
            setSignUpState((prev: any) => {
              return {
                ...prev,
                phone: e.target.value,
              };
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Name*"
          type="text"
          disabled={otpSent}
          value={signUpState.name}
          onChange={(e) => {
            setSignUpState((prev: any) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }}
        />
        <Stack>
          <TextField
            variant="outlined"
            label="Email"
            disabled={otpSent}
            value={signUpState.email}
            onChange={(e) => {
              setSignUpState((prev: any) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              color: "#686b78",
              marginLeft: "2px",
              fontWeight: 500,
            }}
          >
            Email is Optional{" "}
            <Box component="span" sx={{ color: "#FC8019" }}>
              *
            </Box>
          </Typography>
        </Stack>
        {otpSent && (
          <TextField
            variant="outlined"
            label="OTP*"
            type="number"
            value={signUpState.otp}
            onChange={(e) => {
              setSignUpState((prev: any) => {
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
              onClick={handleSendOTP}
            >
              {loading ? "Loading..." : "Send OTP"}
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
              By Clicking on Sign up, I accept the{" "}
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

export default SignUp;
