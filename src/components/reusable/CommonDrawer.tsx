import { Drawer, Grid, Typography, Box, Divider } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";

interface IDrawer {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  title?: string;
  width?: string;
  subHeaderComponent?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  backdrop: {
    "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  },
}));

export const CommonDrawer = (props: IDrawer) => {
  const classes = useStyles(theme);
  const { open, handleClose, children, title, width, subHeaderComponent } =
    props;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      className={classes.backdrop}
      elevation={0}
      sx={{ width: { xs: "360px", sm: width || "320px" } }}
      // PaperProps={{ style: { top: 82 } }}
    >
      <Grid
        container
        rowSpacing={3}
        sx={{ width: { xs: "360px", sm: width || "320px" }, p: "20px" }}
      >
        <Grid item>
          <CloseIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#FC8019",
              },
            }}
            onClick={handleClose}
          />
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 500,
                }}
              >
                {title}
              </Typography>
              {subHeaderComponent}
            </Box>
            <Divider
              sx={{
                borderWidth: "2px",
                borderColor: "black",
                width: "30px",
              }}
            />
          </Grid>
          {/* <Grid item>
            <Box
              component="img"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              sx={{
                width: "100px",
                aspectRatio: "auto 100 / 105",
                height: "105px",
              }}
            />
          </Grid> */}
        </Grid>

        {children}
      </Grid>
    </Drawer>
  );
};
