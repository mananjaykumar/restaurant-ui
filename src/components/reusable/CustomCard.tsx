import {
  Card,
  Grid,
  Checkbox,
  CardMedia,
  Box,
  CardContent,
  Typography,
  CardActions,
  Rating,
  Button,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addToCart, removeFromCart } from "../Redux/CounterSlice";
// import { wishlistProduct } from "../Redux/userSlice";

interface ICustomCard {
  item?: any;
  index?: number;
}

const CardAddButton = styled(Button)(({ theme }) => ({
  padding: "0.1rem",
  minWidth: "0",
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
}));

const CardChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.text.error,
  height: "24px",
  fontSize: "10px",
}));

const CustomCard = ({ item, index }: ICustomCard) => {
  //   const { cart } = useSelector((state) => state.counter);
  //   const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //   const product = cart.items?.find(
  //     (cartItem) => cartItem.product._id === item._id
  //   );
  let quantity = 0;
  //   if (product) {
  //     quantity = product.quantity;
  //   }
  //   const isLiked = userData?.wishlist?.find((p) => p === item._id) || false;
  console.log("item", item);

  return (
    <Card
      key={item._id ?? index}
      style={{
        fontWeight: "600",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        // boxShadow: "1",
        boxShadow: " 15px  rgba(40,44,63,.15)",
        transition: "all 250ms ease-in-out",
        // "&:hover": {
        //   boxShadow: "2",
        // },
      }}
    >
      <Grid
        container
        justifyContent={item.discount ? "space-between" : "flex-end"}
        alignItems="center"
      >
        {item.discount !== 0 && <CardChip label={`${item.discount}% off`} />}
        <Checkbox
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
          }}
          //   checked={Boolean(isLiked)}
          checked={false}
          icon={<FavoriteBorderIcon fontSize="small" />}
          checkedIcon={<FavoriteIcon color="error" fontSize="small" />}
          //   onChange={(e) => {
          //     dispatch(wishlistProduct(item));
          //   }}
        />
      </Grid>
      <Link to={`/product/${item._id}`}>
        <CardMedia
          component="img"
          // src={item.imgSrc}
          src={`data:image/${item.img.contentType};base64,
        ${item.img.data}`}
        />
      </Link>
      <Box display="flex" justifyContent="space-between" padding="0.5rem">
        <CardContent
          sx={{
            maxWidth: "85%",
            padding: "0",
            gap: "0.45rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to={`/product/${item._id}`}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#373F50",
              }}
              noWrap
            >
              {item.title}
            </Typography>
          </Link>
          <Box>
            <Rating
              name="read-only"
              value={item.rating}
              readOnly
              size="small"
            />
          </Box>
          <Box display="flex" gap="0.5rem">
            <Typography sx={{ color: "error.main", fontWeight: "600" }}>
              &#8377;{item.discountedPrice}
            </Typography>
            {item.discount !== 0 && (
              <Typography sx={{ color: "#7D879C", fontWeight: "600" }}>
                <s>{item.originalPrice}</s>
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Box
            display="flex"
            flexDirection="column-reverse"
            gap="0.1rem"
            alignItems="center"
            height="100%"
          >
            <CardAddButton
            // onClick={() => dispatch(addToCart(item))}
            >
              <AddIcon fontSize="small" color="error" />
            </CardAddButton>
            {quantity !== 0 && (
              <>
                <Typography variant="body1">{quantity}</Typography>
                <CardAddButton
                // onClick={() => dispatch(removeFromCart(item))}
                >
                  <RemoveIcon fontSize="small" color="error" />
                </CardAddButton>
              </>
            )}
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CustomCard;
