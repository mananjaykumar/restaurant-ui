import React from "react";
import { Stack } from "@mui/material";
import Banner from "../components/Home/Banner";
import MostLoved from "../components/Home/MostLoved";

const Home = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "rgb(255, 255, 255)",
        gap: "2rem",
      }}
    >
      <Banner />
      <MostLoved />
      <Stack sx={{ height: "100vh" }}></Stack>
    </Stack>
  );
};

export default Home;
