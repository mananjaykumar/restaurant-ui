import { Button, styled, Stack } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Carousel from "react-elastic-carousel";

const ButtonPropsModified = ({ isNextButton, ...props }) => (
  <Button {...props} />
);

const RoundedButton = styled(ButtonPropsModified)(
  ({ theme, isNextButton }) => ({
    // borderRadius: "100%",
    // padding: "0.5rem",
    // minWidth: "0",
    // alignSelf: "center",
    // background: theme.palette.secondary.main,
    // color: theme.palette.common.white,
    // zIndex: 10,
    // position: "absolute",
    // left: isNextButton ? "auto" : 0,
    // right: isNextButton ? 0 : "auto",
    // transform: isNextButton ? "translateX(-15%)" : "translateX(-25%)",
    // ":hover": {
    //   background: theme.palette.secondary.main,
    //   color: theme.palette.common.white,
    // },
    position: "absolute",
    top: "-30px",
    left: isNextButton ? "auto" : 0,
    right: isNextButton ? 0 : "auto",
    // justifyContent: !isNextButton && "right",
    width: "fit-content",
    color: "black",
  })
);

const CustomCarousel = ({ items, breakPoints, children }) => {
  return (
    <Stack>
      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        renderArrow={({ type, onClick, isEdge }) => (
          <RoundedButton onClick={onClick} isNextButton={type === "NEXT"}>
            {type === "PREV" ? <ArrowBackIcon /> : <ArrowForward />}
          </RoundedButton>
        )}
        itemPadding={[15]}
        sx={{ position: "relative" }}
      >
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {React.cloneElement(children, { item })}
          </React.Fragment>
        ))}
      </Carousel>
    </Stack>
  );
};

export default CustomCarousel;
