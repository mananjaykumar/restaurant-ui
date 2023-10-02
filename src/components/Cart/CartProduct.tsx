import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  //   deleteFromCart,
} from "../../store/slices/AuthSlice";

const CardIncButton = styled(Button)(({ theme }) => ({
  padding: "0.1rem",
  minWidth: "0",
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
  borderRadius: "50%",
}));
const CardDecButton = styled(Button)(({ theme }) => ({
  padding: "0.1rem",
  minWidth: "0",
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
  borderRadius: "50%",
  "&:disabled": {
    border: `1px solid ${theme.palette.disabled.primary}`,
  },
}));

function CartProduct(props: any) {
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: "16px 20px",
        borderBottom: "1px solid rgb(243, 245, 249)",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "10%",
          gap: "0.25rem",
        }}
      >
        <CardIncButton
          onClick={() => {
            dispatch(addToCart(props.item));
          }}
        >
          <AddOutlinedIcon />
        </CardIncButton>
        <Typography sx={{ fontWeight: "600" }}>{props.quantity}</Typography>
        <CardDecButton
          disabled={props.quantity === 1}
          onClick={() => {
            dispatch(removeFromCart(props.item));
          }}
        >
          <RemoveOutlinedIcon />
        </CardDecButton>
      </Box>
      <Box
        sx={{
          width: "20%",
        }}
      >
        <img
          src={props.item.imgSrc}
          alt={props.item.name}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "58%",
          maxWidth: "200px",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
          {props.item.name}
        </Typography>
        <br />
        <Typography sx={{ fontSize: "10px", color: "#7d879c" }}>
          $ {props.item.discountedPrice} x {props.quantity}
        </Typography>
        <br />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: "error.main",
          }}
        >
          $ {props.quantity * props.item.discountedPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "12%",
        }}
      >
        <Button
          sx={{
            minHeight: "24px",
            minWidth: "24px",
            borderRadius: "50%",
            padding: "6px",
            color: "#959595",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
          //   onClick={() => dispatch(deleteFromCart(props.item))}
        >
          <CloseOutlinedIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default CartProduct;
