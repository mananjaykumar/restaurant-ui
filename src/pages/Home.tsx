import React from "react";
import { Stack } from "@mui/material";
import Banner from "../components/Home/Banner";

const Home = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "rgb(255, 255, 255)",
      }}
    >
      <Banner />
    </Stack>
  );
};

export default Home;
