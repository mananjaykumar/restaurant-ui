import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  handleClose: () => void;
  handleApiCall: () => void;
}

const AddAdmin = ({ handleClose, handleApiCall }: Props) => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [addAdminState, setAddAdminState] = useState({
    name: "",
    email: "",
    phone: "",
    _id: "",
    otp: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/admin/sign-up`, {
        name: addAdminState.name,
        email: addAdminState.email,
        phone: addAdminState.phone,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message);
        if (res?.data?.message === "OTP Sent Successfully") {
          setAddAdminState((prev: any) => {
            return {
              ...prev,
              _id: res?.data?.data?._id,
            };
          });
          setOtpSent(true);
        } else {
          handleClose();
          handleApiCall();
        }
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

  const handleVerifyOtp = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/admin/verify-otp`, {
        _id: addAdminState._id,
        otp: addAdminState.otp,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.messsage);
        handleClose();
        handleApiCall();
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
          label="Name*"
          type="text"
          disabled={loading || otpSent}
          value={addAdminState.name}
          onChange={(e) => {
            setAddAdminState((prev: any) => {
              return {
                ...prev,
                name: e.target.value,
              };
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Email*"
          type="email"
          disabled={loading || otpSent}
          value={addAdminState.email}
          onChange={(e) => {
            setAddAdminState((prev: any) => {
              return {
                ...prev,
                email: e.target.value,
              };
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Phone Number*"
          type="number"
          disabled={loading || otpSent}
          value={addAdminState.phone}
          onChange={(e) => {
            if (e.target.value.toString().length <= 10) {
              setAddAdminState((prev: any) => {
                return {
                  ...prev,
                  phone: e.target.value,
                };
              });
            }
          }}
        />
        {otpSent && (
          <TextField
            variant="outlined"
            label="OTP*"
            type="number"
            disabled={loading}
            value={addAdminState.otp}
            onChange={(e) => {
              setAddAdminState((prev: any) => {
                return {
                  ...prev,
                  otp: e.target.value,
                };
              });
            }}
          />
        )}
        <Stack>
          {otpSent ? (
            <Button
              variant="contained"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify OTP"}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddAdmin;
