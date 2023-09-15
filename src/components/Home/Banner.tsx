import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const Banner = () => {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/b4178cc2ecc1ccb1f6b2b0638f609f0f",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/345b2c3e5d0064046c07b0fe01de8e66",
    },
  ];
  return (
    <Carousel
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
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props: any) {
  return (
    <Grid
      // key={index}
      container
      alignItems="center"
      // maxWidth="80%"
      justifyContent="space-between"
      width="100%"
    >
      <Grid
        container
        item
        sm={12}
        md={6}
        // padding="1.5rem 0 0 1.5rem"
        gap="1rem"
        justifyContent="space-between"
        width="fullWidth"
        sx={{
          padding: { sm: "1.5rem", xs: "1.5rem 1.5rem 0 1.5rem" },
        }}
      >
        <Typography
          fontSize="2rem"
          fontWeight="700"
          color="#2B3445"
          sx={{
            fontSize: {
              lg: 50,
              md: 30,
              sm: 25,
              xs: 20,
            },
          }}
        >
          50% Off For Your First Order
        </Typography>
        <Typography
          fontWeight="400"
          color="#0F3460"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis
          consequat eu, quam etiam at quis ut convalliss.
        </Typography>
      </Grid>
      <Grid item sm={12} md={6} padding="1.5rem">
        <Box
          maxWidth="100%"
          display="block"
          marginLeft="auto"
          marginRight="auto"
          component={"img"}
          src={props.item.image}
        ></Box>
      </Grid>
    </Grid>
  );
}

export default Banner;
