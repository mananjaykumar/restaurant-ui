import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "rgb(2, 6, 12)",
        color: "white",
        padding: "100px 10px",
      }}
    >
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
        gap={2}
      >
        <Stack direction="row" justifyContent="center">
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={() => (window.location.href = "https://www.youtube.com")}
          >
            <YouTubeIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={() => (window.location.href = "https://www.instagram.com")}
          >
            <InstagramIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={() => (window.location.href = "https://www.facebook.com")}
          >
            <FacebookIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Stack textAlign="center">
          <Typography>
            250 Executive Park Blvd, Suite 3400, San Francisco CA 94134, United
            States
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <Stack direction="row" alignItems="center" gap={0.5}>
            <PhoneIcon />
            <Typography>+91 8233101857</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <EmailIcon />
            <Typography>abcd@gmail.com</Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography>Made with</Typography> <FavoriteIcon fontSize="small" />
            <Typography>by Mananjay Kumar</Typography>
          </Stack>
          <Stack>
            <Typography> Copyright &copy; 2023 </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
