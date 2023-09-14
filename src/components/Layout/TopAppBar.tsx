import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Stack,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import { Link, useNavigate } from "react-router-dom";

// const pages = ["Products", "Pricing", "Blog"];
const MenuData = [
  {
    name: "Search",
    icon: <SearchIcon />,
    to: "/search",
  },
  {
    name: "Help",
    icon: <SupportOutlinedIcon />,
    to: "/help",
  },
  {
    name: "Account",
    icon: <PersonOutlineOutlinedIcon />,
    to: "/account",
  },
];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function TopAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0 15px 40px -20px rgba(40,44,63,.15)",
        backgroundColor: "#fff",
        padding: "20px",
        zIndex: 1000,
        transform: "translateZ(0)",
        transition: "transform .3s ease",
        // contain: "size layout style",
        height: "120px",
        color: "#3d4152",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          justifyContent: "center",
        }}
      >
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" alignItems="center">
              <LocalDiningIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "#FC8019",
                  transform: "scale(2)",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              />
              <LocalDiningIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                  color: "#FC8019",
                  transform: "scale(2)",
                }}
                onClick={() => navigate("/")}
              />
            </Stack>

            <Stack>
              <Stack direction="row" alignItems="center">
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {MenuData.map((item) => (
                      <MenuItem
                        key={item.name}
                        onClick={() => {
                          navigate(item.to);
                          handleCloseNavMenu();
                        }}
                        sx={{ gap: "0.5rem" }}
                      >
                        {item.icon}
                        <Typography textAlign="center">{item.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    gap: "1.5rem",
                  }}
                >
                  {MenuData.map((item) => (
                    <Button
                      key={item.name}
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.3rem",
                        fontSize: "16px",
                        fontWeight: 500,
                        textTransform: "capitalize",
                        "&:hover": {
                          color: "#FC8019",
                          backgroundColor: "#fff",
                        },
                      }}
                      startIcon={item.icon}
                      // disableRipple
                      onClick={() => navigate(item.to)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
                {/* <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box> */}
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopAppBar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import LocalDiningIcon from "@mui/icons-material/LocalDining";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function TopAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
//     null
//   );

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         boxShadow: "0 15px 40px -20px rgba(40,44,63,.15)",
//         backgroundColor: "#fff",
//         padding: "0 20px",
//         zIndex: 1000,
//         transform: "translateZ(0)",
//         transition: "transform .3s ease",
//         // contain: "size layout style",
//         height: "100px",
//         color: "#3d4152",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <LocalDiningIcon
//             sx={{
//               display: { xs: "none", md: "flex" },
//               mr: 1,
//               color: "#ffa700",
//               transform: "scale(3)",
//             }}
//           />

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center" color="inherit">
//                     {page}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <LocalDiningIcon
//             sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
//           />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "inherit", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default TopAppBar;
