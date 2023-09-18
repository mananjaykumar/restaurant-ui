import React from "react";
import { Stack, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AdminMostLoved = () => {
  const [loading, setLoading] = React.useState(false);
  const [mostLovedState, setMostLovedState] = React.useState({
    title: "",
    originalPrice: "",
    discountedPrice: "",
    rating: "",
    discount: "",
    selectedFile: {
      name: "",
    },
  });
  const acceptedFiles = [".jpg", ".png", ".jpeg"];

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/uploads/most-loved`,
        {
          title: mostLovedState.title,
          originalPrice: mostLovedState.originalPrice,
          discountedPrice: mostLovedState.discountedPrice,
          rating: mostLovedState.rating,
          discount: mostLovedState.discount,
          mostLoved: mostLovedState.selectedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        setMostLovedState({
          title: "",
          originalPrice: "",
          discountedPrice: "",
          rating: "",
          discount: "",
          selectedFile: {
            name: "",
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
            Upload Most Loved Items
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            autoFocus
            variant="outlined"
            label="Title*"
            value={mostLovedState.title}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Original Price*"
            type="Number"
            value={mostLovedState.originalPrice}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  originalPrice: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Discounted Price*"
            type="Number"
            value={mostLovedState.discountedPrice}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  discountedPrice: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Rating*"
            type="Number"
            value={mostLovedState.rating}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  rating: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Discount*"
            type="Number"
            value={mostLovedState.discount}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  discount: e.target.value,
                };
              });
            }}
          />

          <Stack direction="row" alignItems="center" gap="0.5rem">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "fit-content" }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                name="photo"
                accept={acceptedFiles.join(",")}
                onChange={(event) => {
                  setMostLovedState((prev: any) => {
                    return {
                      ...prev,
                      selectedFile: event.target.files && event.target.files[0],
                    };
                  });
                }}
              />
            </Button>
            {mostLovedState.selectedFile && (
              <Typography>{mostLovedState?.selectedFile?.name}</Typography>
            )}
          </Stack>
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

export default AdminMostLoved;
