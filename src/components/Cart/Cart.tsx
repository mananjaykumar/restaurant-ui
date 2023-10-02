import React from "react";
import { Box, Button, Typography, IconButton, Divider } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CartProduct from "./CartProduct";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
// import { createOrder } from "../../Redux/CounterSlice";
import { useNavigate } from "react-router-dom";

const Cart = (props: any) => {
  const {
    cart,
    cartProductsCount: noOfItems,
    totalPrice,
  } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
        padding: "0px 20px",
        minHeight: "100%",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          color: "secondary.main",
          minHeight: "74px",
          width: "100%",
          borderBottom: "1px solid #dadada",
          padding: "0px 20px",
        }}
      >
        <Box display="flex" alignItems="center">
          <ShoppingBagOutlinedIcon />
          <Box
            ml={1}
            sx={{
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            {noOfItems} {noOfItems > 1 ? "items" : "item"}
          </Box>
        </Box>
        <IconButton onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: !noOfItems ? "none" : "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          overflow: "auto",
          minHeight: "calc(100vh - 134px)",
          maxHeight: "calc(100vh - 134px)",
          minWidth: "380px",
          padding: "0px",
        }}
      >
        {cart?.items?.map((item: any) => (
          <>
            <CartProduct item={item.product} quantity={item.quantity} />
          </>
        ))}
      </Box>
      <Box
        sx={{
          minHeight: "60px",
          width: "100%",
          alignItems: "flex-end",
          padding: "0px 20px",
          display: !noOfItems ? "none" : "flex",
        }}
      >
        <Button
          color="error"
          variant="contained"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "600",
            padding: "6px 16px",
            marginBottom: "12px",
          }}
          fullWidth
          onClick={() => {
            // dispatch(createOrder());
            navigate("/user/orders");
            props.onClose();
          }}
        >
          Checkout Now (${parseFloat(totalPrice).toFixed(2)})
        </Button>
      </Box>
      <Box
        sx={{
          display: !noOfItems ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 74px )",
          width: "100%",
        }}
      >
        <img
          src="https://bazar-react.vercel.app/assets/images/logos/shopping-bag.svg"
          alt="shopping bag"
        />
        <Typography
          variant="body2"
          sx={{
            color: "secondary.main",
            fontWeight: "600",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Your Shopping Bag is empty!
          <br />
          Start Shopping
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;
