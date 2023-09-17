/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import { AlertSnackbar } from "components/reusable/AlertSnackbar";
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../store/slices/AuthSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  Stack,
  Tooltip,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import {
//   GET_WORKSPACE_LIST,
//   workSpaceDataAction,
// } from "store/actions/workspace";
// import { loadState } from "store/localStorage";
// import {
//   GET_APP_CONFIG_DATA,
//   autoSuggestDataAction,
// } from "store/actions/autoSuggest";

// import { GET_USER_INFO, userDataAction } from "store/actions/team";
import theme from "../../../theme";
// import CopyToClipboard from 'components/api/CopyToClipboard';
// import { sidebarDataAction } from "store/actions/sidebar";
// import { StoreType } from "../../store/types/store/state";
import logo from "../../../assets/TopiqLogoLight.png";
import {
  DashboardWhiteIcon,
  DashboardHoverIcon,
  FacetsWhiteIcon,
  FacetsHoverIcon,
  SpellingsWhiteIcon,
  SpellingsHoverIcon,
  SynonymsWhiteIcon,
  SynonymsHoverIcon,
  KeywordsWhiteIcon,
  KeywordsHoverIcon,
  TeamsWhiteIcon,
  TeamsHoverIcon,
  UserAccountWhiteIcon,
  UserAccountHoverIcon,
  RulesWhiteIcon,
  RulesHoverIcon,
  ListsWhiteIcon,
  ListsHoverIcon,
  APIWhiteIcon,
  APIHoverIcon,
  SettingsWhiteIcon,
  SettingsHoverIcon,
  AnalyticsWhiteIcon,
  AnalyticsHoverIcon,
  QueryDebugWhiteIcon,
  QueryDebugHoverIcon,
  AudienceWhiteIcon,
  AudienceHoverIcon,
  VisibilityHoverIcon,
  VisibilityWhiteIcon,
  ClickstreamWhiteIcon,
  ClickstreamHoverIcon,
  ContentEnrichment,
  ContentEnrichmentHover,
  // DataOpsWhiteIcon,
  // DataOpsHoverIcon,
  // ConfigurationsWhiteIcon,
  // ConfigurationsHoverIcon,
  // DictionaryWhiteIcon,
  // DictionaryHoverIcon,
} from "./Icons";
import MenuIcon from "@mui/icons-material/Menu";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import * as navLinks from "../../../routes/constants";

// import css from "../../css/modules/sidebarMain.module.scss";
// import Workspaces from "./SidebarWorkspaces";

const drawerWidth = 230;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const menuItems1 = [
  //   {
  //     icon: <DashboardWhiteIcon />,
  //     activeIcon: <DashboardHoverIcon />,
  //     label: "Dashboard",
  //     link: navLinks.R_ROOT,
  //   },
  {
    icon: <ViewCarouselOutlinedIcon />,
    activeIcon: <ViewCarouselOutlinedIcon />,
    label: "Banner",
    link: navLinks.R_UPLOAD_BANNER,
  },
  {
    icon: <ViewCarouselOutlinedIcon />,
    activeIcon: <ViewCarouselOutlinedIcon />,
    label: "Most Loved",
    link: navLinks.R_UPLOAD_MOST_LOVED,
  },
  //   {
  //     icon: <SettingsWhiteIcon />,
  //     activeIcon: <SettingsHoverIcon />,
  //     label: "App Settings",
  //     // link: navLinks.R_APP_SETTINGS_SCHEMA,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <FacetsWhiteIcon />,
  //     activeIcon: <FacetsHoverIcon />,
  //     label: "Facets",
  //     // link: navLinks.R_FACETS,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <RulesWhiteIcon />,
  //     activeIcon: <RulesHoverIcon />,
  //     label: "Rules",
  //     // link: navLinks.R_QUERY_RULES,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <SpellingsWhiteIcon />,
  //     activeIcon: <SpellingsHoverIcon />,
  //     label: "Spellings",
  //     // link: navLinks.R_SPELLINGS_CORRECTIONS,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <SynonymsWhiteIcon />,
  //     activeIcon: <SynonymsHoverIcon />,
  //     label: "Synonyms",
  //     // link: navLinks.R_SYNONYMS,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <ListsWhiteIcon />,
  //     activeIcon: <ListsHoverIcon />,
  //     label: "Pages",
  //     // link: navLinks.R_PAGES_CATEGORY_PAGE,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <AnalyticsWhiteIcon />,
  //     activeIcon: <AnalyticsHoverIcon />,
  //     label: "Analytics",
  //     // link: navLinks.R_OVERVIEW,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <AudienceWhiteIcon />,
  //     activeIcon: <AudienceHoverIcon />,
  //     label: "Audience",
  //     // link: navLinks.R_AUDIENCE_OVERVIEW,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <ContentEnrichment />,
  //     activeIcon: <ContentEnrichmentHover />,
  //     label: "Content Enrichment",
  //     // link: navLinks.R_CONTENT_ENRICHMENT,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <QueryDebugWhiteIcon />,
  //     activeIcon: <QueryDebugHoverIcon />,
  //     label: "Diagnostic Tool",
  //     // link: navLinks.R_DIAGNOSTIC_TOOL,
  //     link: navLinks.R_ROOT,
  //   },
  // {
  //   icon: <DictionaryWhiteIcon />,
  //   activeIcon: <DictionaryHoverIcon />,
  //   label: 'Dictionary',
  //   link: navLinks.R_DICTIONARY,
  // },
  // {
  //   icon: <DictionaryWhiteIcon />,
  //   activeIcon: <DictionaryHoverIcon />,
  //   label: 'Dictionary',
  //   link: navLinks.R_DICTIONARY,
  // },
  // {
  //   icon: <DictionaryWhiteIcon />,
  //   activeIcon: <DictionaryHoverIcon />,
  //   label: 'Dictionary',
  //   link: navLinks.R_DICTIONARY,
  // },
  // {
  //   icon: <ListsWhiteIcon />,
  //   activeIcon: <ListsHoverIcon />,
  //   label: 'Lists',
  //   link: navLinks.R_LIST_CREATION,
  // },
  // {
  //   icon: <DataOpsWhiteIcon />,
  //   activeIcon: <DataOpsHoverIcon />,
  //   label: 'Data Ops',
  //   link: navLinks.R_DATA_OPS,
  // },
];

const menuItems2 = [
  {
    icon: <AnalyticsWhiteIcon />,
    activeIcon: <AnalyticsHoverIcon />,
    label: "Analytics",
    // link: navLinks.R_AUTO_SUGGEST_ANALYTICS_OVERVIEW,
    link: navLinks.R_ROOT,
  },
  {
    icon: <KeywordsWhiteIcon />,
    activeIcon: <KeywordsHoverIcon />,
    label: "Curations",
    // link: navLinks.R_CURATION_PROMOTED_GLOBAL,
    link: navLinks.R_ROOT,
  },
  {
    icon: <VisibilityWhiteIcon />,
    activeIcon: <VisibilityHoverIcon />,
    label: "Preview",
    // link: navLinks.R_AUTO_SUGGEST_PREVIEW,
    link: navLinks.R_ROOT,
  },
  {
    icon: <SettingsWhiteIcon />,
    activeIcon: <SettingsHoverIcon />,
    label: "Settings",
    // link: navLinks.R_AUTO_SUGGEST_MANAGE_PATTERNS,
    link: navLinks.R_ROOT,
  },
];

const menuItems3 = [
  {
    icon: <KeywordsWhiteIcon />,
    activeIcon: <KeywordsHoverIcon />,
    label: "Classifiers",
    // link: navLinks.R_MODELS_OVERVIEW("cls"),
    link: navLinks.R_ROOT,
  },
  {
    icon: <SettingsWhiteIcon />,
    activeIcon: <SettingsHoverIcon />,
    label: "NER",
    // link: navLinks.R_MODELS_OVERVIEW("ner"),
    link: navLinks.R_ROOT,
  },
  {
    icon: <SettingsWhiteIcon />,
    activeIcon: <SettingsHoverIcon />,
    label: "Spell",
    // link: navLinks.R_MODELS_SPELL_DATASETS,
    link: navLinks.R_ROOT,
  },
  {
    icon: <SettingsWhiteIcon />,
    activeIcon: <SettingsHoverIcon />,
    label: "Ranking",
    // link: navLinks.R_MODELS_OVERVIEW("ranking"),
    link: navLinks.R_ROOT,
  },
];

const bottomItems = [
  //   {
  //     icon: <APIWhiteIcon />,
  //     activeIcon: <APIHoverIcon />,
  //     label: "API Keys",
  //     // link: navLinks.R_API,
  //     link: navLinks.R_ROOT,
  //   },
  //   {
  //     icon: <ClickstreamWhiteIcon />,
  //     activeIcon: <ClickstreamHoverIcon />,
  //     label: "Data sources",
  //     // link: navLinks.R_CLICKSTREAM_DEBUGGER,
  //     link: navLinks.R_ROOT,
  //   },
  {
    icon: <TeamsWhiteIcon />,
    activeIcon: <TeamsHoverIcon />,
    label: "Users",
    // link: navLinks.R_TEAM,
    link: navLinks.R_ROOT,
  },
];

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IMenuButton {
  item: {
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    label: string;
    link: string;
  };
  index: number;
  location: any;
  open: boolean;
  selectedHover: null;
  handleOnHover: (index: number) => void;
  setSelectedHover: React.Dispatch<React.SetStateAction<null>>;
  selectedIndexForStyle: number | undefined;
  handleListItemClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string,
    index: number
  ) => void;
  label?: string | React.ReactNode;
  isBottomSection?: boolean;
}

const MenuButton = (props: IMenuButton) => {
  const {
    item,
    index,
    location,
    open,
    selectedHover,
    handleOnHover,
    setSelectedHover,
    selectedIndexForStyle,
    handleListItemClick,
    label = item.label,
    isBottomSection = false,
  } = props;

  const urlParts = location.pathname.split("/");

  const shouldHighlight =
    item.link === location.pathname ||
    (isBottomSection
      ? urlParts[1] !== "" && item.link.startsWith(`/${urlParts[1]}`)
      : item.link.startsWith(`/${urlParts[1]}/${urlParts[2]}`));

  const selected = selectedIndexForStyle === index || shouldHighlight;

  const hovered = selectedHover === index || shouldHighlight;

  return (
    <Box
      sx={{
        padding: "0px 12px",
        ...(selected
          ? {
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              borderTopRightRadius: "2px",
              borderBottomRightRadius: "2px",
              padding: "0px 8px !important",
            }
          : {}),
      }}
    >
      <ListItem
        onMouseOver={() => handleOnHover(index)}
        onMouseOut={() => setSelectedHover(null)}
        disablePadding
        sx={{ display: "block", marginTop: "5px" }}
      >
        <ListItemButton
          selected={selected}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleListItemClick(e, item.link, index)
          }
          sx={{
            minHeight: 26,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            height: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.hover} !important`,
              },
            },
            "&:hover": {
              backgroundColor: theme.palette.primary.hover,
              color: theme.palette.primary.main,
            },
            ...(shouldHighlight && {
              color: theme.palette.primary.main,
            }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: hovered
                ? theme.palette.primary.main
                : theme.palette.primary.main,
              "& .MuiSvgIcon-root": {
                maxWidth: "13px",
                maxHeight: "15px",
                color: theme.palette.primary.main,
              },
            }}
          >
            {hovered ? item.activeIcon : item.icon}
          </ListItemIcon>
          {typeof label !== "string" ? (
            label
          ) : (
            <ListItemText
              primary={item.label}
              sx={{
                opacity: open ? 1 : 0,
                "& .MuiTypography-root": {
                  fontSize: "13px",
                  marginLeft: "-17px",
                },
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export type NoApplicationModalType = {
  show: boolean;
  type: "no_applications" | "incomplete_onboarding";
};

export default function Sidebar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [smallScreenDisplay, setSmallScreenDisplay] = useState(false);
  const { userData } = useSelector((store: any) => store.auth);
  //   const { isSidebarOpen: open } = useSelector(
  //     (store: StoreType) => store.sidebarReducer
  //   );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndexForStyle, setselectedIndexForStyle] = useState<number>();
  const [selectedHover, setSelectedHover] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [lastVisitedURL, setLastVisitedUrl] = useState("");
  const [noApplicationModal, setNoApplicationModal] =
    useState<NoApplicationModalType>({
      show: false,
      type: "no_applications",
    });
  //   const { name } = useSelector((store: StoreType) => store.selectWorkspace);
  //   const { userInfo } = useSelector((store: StoreType) => store.userReducer);
  //   const { getAppConfigData } = useSelector(
  //     (store: StoreType) => store.autoSuggestReducer
  //   );
  //   const { onboarded } = getAppConfigData?.data?.data || {};
  const autoSuggestOnboard = [
    {
      icon: <SettingsWhiteIcon />,
      activeIcon: <SettingsHoverIcon />,
      label: "Configuration",
      //   link: navLinks.R_AUTO_SUGGEST_CONFIG_SETUP,
      link: navLinks.R_ROOT,
    },
  ];

  const sidebarItems = [
    {
      //   label: "Search",
      label: "Uploads",
      items: menuItems1,
      // id: selectedWorkspace?.applications?.find(
      //   (app: any) => app?.type === 'search'
      // )?.id,
    },
    // {
    //   label: "Auto Suggest",
    //   //   items: !onboarded ? autoSuggestOnboard : menuItems2,
    //   // id: selectedWorkspace?.applications?.find(
    //   //   (app: any) => app?.type === 'autosuggest'
    //   // )?.id,
    // },
    // {
    //   label: "Models",
    //   items: menuItems3,
    // },
  ];
  //   const userProfileButtonIndex = useMemo(
  //     () =>
  //       sidebarItems.reduce((acc, curr) => acc + curr.items.length, 0) +
  //       bottomItems.length +
  //       1,
  //     []
  //   );

  useEffect(() => {
    const urlParts = location.pathname.split("/");
    const index = sidebarItems.findIndex(
      (item) => item.label.toLowerCase() === urlParts[1]
    );
    setselectedIndexForStyle(index);
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    // dispatch(sidebarDataAction({ isSidebarOpen: !open }));
  };

  const handleDrawerOpen = () => {
    // handleToggleSidebar();
    setOpen(true);
  };

  const handleDrawerClose = () => {
    // handleToggleSidebar();
    setOpen(false);
    setSmallScreenDisplay(false);
  };

  const handleMenuOpen = (e: any) => {
    // dispatch(workSpaceDataAction(GET_WORKSPACE_LIST, {}));
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnHover = (index: any) => {
    setSelectedHover(index);
  };

  const handleListItemClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: any,
    index: number
  ) => {
    setselectedIndexForStyle(index);
    // navigate(path);
  };
  const handleAutoSuggestOnboard = () => {
    // dispatch(autoSuggestDataAction(GET_APP_CONFIG_DATA, {}));
  };

  //   useEffect(() => {
  //     // const state = loadState();
  //     if (state?.selectWorkspace?.applications?.length === 0) {
  //       setNoApplicationModal({ show: true, type: "no_applications" });
  //     }
  //     // dispatch(userDataAction(GET_USER_INFO, {}));
  //     handleAutoSuggestOnboard();
  //   }, []);

  useEffect(() => {
    //   const path = location.pathname;
    //   console.log("path: " + path);
    //   let index = null;
    //   sidebarItems.forEach((app, i) => {
    //     app.items.forEach((item, ind) => {
    //       if (item.link === path) {
    //         if (i === 0) {
    //           index = ind + 1;
    //         } else if (i === 1) {
    //           index = sidebarItems[i - 1].items.length + ind + 1;
    //         } else {
    //           index =
    //             sidebarItems[i - 2].items.length +
    //             sidebarItems[i - 1].items.length +
    //             ind +
    //             1;
    //         }
    //       }
    //     });
    //   });
    //   handleListItemClick(index);
    //   console.log("index", index);
    const urlParts = location.pathname.split("/");
    const search = location.search ? location.search : "";
    const isAutoSuggestPage = urlParts[1] === "autosuggest";
    if (isAutoSuggestPage && !urlParts.includes("configuration"))
      setLastVisitedUrl(location?.pathname + search);
  }, []);

  //   useEffect(() => {
  //     const urlParts = location.pathname.split("/");
  //     const isAutoSuggestPage = urlParts[1] === "autosuggest";
  //     if (isAutoSuggestPage) {
  //       if (!onboarded) {
  //         navigate(navLinks.R_AUTO_SUGGEST_CONFIG_SETUP);
  //       } else if (onboarded && urlParts.includes("configuration")) {
  //         navigate(lastVisitedURL || navLinks.R_AUTO_SUGGEST_MANAGE_PATTERNS);
  //       }
  //     }
  //   }, [onboarded]);

  const handleSmallScreenDisplay = () => {
    setSmallScreenDisplay(true);
  };

  return (
    <>
      <Stack
        sx={{
          display: smallScreenDisplay ? "none" : "flex",
          alignItems: "flex-start",
          marginTop: "-100px",
        }}
      >
        <IconButton onClick={handleSmallScreenDisplay}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Box
        sx={{
          display: {
            xs: smallScreenDisplay ? "flex" : "none",
            sm: smallScreenDisplay ? "flex" : "none",
            md: "flex",
          },
          scrollbarColor: theme.palette.secondary.main,
        }}
      >
        <CssBaseline />
        <Drawer
          // className={classNames(css.root)}
          variant="permanent"
          open={open}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: theme.palette.background.paper,
              position: "absolute",
            },
          }}
        >
          <DrawerHeader
            sx={{
              padding: "0px 0px 0px 10px",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
            }}
          >
            {/* <img
            src={logo}
            alt="Insearch Logo"
            style={{
              height: '37px',
              ...(!open && {
                display: 'none',
              }),
            }}
          /> */}
            <img
              src={logo}
              alt="Topiq"
              style={{
                height: "37px",
                ...(!open && {
                  display: "none",
                }),
              }}
            />
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              disableRipple
              sx={{
                margin: "0px -2px 0px -2px",
                ...(open && { display: "none" }),
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                borderRadius: "6px !important",
              }}
            >
              <ArrowForwardIcon
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light,
                  width: "33px",
                  height: "26px",
                  padding: "3px",
                  borderRadius: "6px",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </IconButton>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                ...(!open && { display: "none" }),
              }}
              disableRipple
            >
              {/* {theme.direction === "rtl" ? (
              <ChevronRightIcon
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light,
                  width: "33px",
                  height: "30px",
                  padding: "3px",
                  borderRadius: "6px",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            ) : (
              <KeyboardBackspaceIcon
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light,
                  width: "33px",
                  height: "30px",
                  padding: "3px",
                  borderRadius: "6px",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            )} */}
              <ArrowBackIcon
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light,
                  width: "33px",
                  height: "26px",
                  padding: "3px",
                  borderRadius: "6px",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </IconButton>
          </DrawerHeader>
          {/* <Box
          sx={{
            position: "sticky",
            top: "65px",
          }}
        >
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "-5px 10px 16px 10px" }}
          />
          <List
            sx={{
              color: theme.palette.primary.light,
              marginTop: "5px",
              padding: "0px 10px",
            }}
          >
            <ListItem
              disablePadding
              sx={{ display: "block", marginTop: "-4px" }}
            >
              <ListItemButton
                onClick={handleMenuOpen}
                sx={{
                  minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.text.primary,
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: theme.palette.primary.main,
                  }}
                >
                  <AppsIcon />
                </ListItemIcon>
                <Tooltip title={name}>
                <ListItemText
                  primary={name || ""}
                  sx={{
                    //   opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      fontSize: "13px",
                      fontWeight: "600",
                      marginLeft: "-15px",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      maxWidth: "15ch",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
                </Tooltip>
              </ListItemButton>
            </ListItem>
            <Menu
              open={menuOpen}
              onClose={handleMenuClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                borderRadius: "6px",
                "& .MuiList-root": {
                  py: 0,
                },
                marginLeft: theme.spacing(1),
              }}
            >
              <Box
                sx={{
                  width: "355px",
                }}
              >
                <Box
                  sx={{
                    padding: "24px 20px 10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                    }}
                  >
                    Switch Workspace
                  </Typography>
                </Box>
                <Divider sx={{ color: theme.palette.text.disabled }} />
                <Workspaces
                  handleMenuClose={handleMenuClose}
                  setErrorMsg={setErrorMsg}
                  setShowErrorAlert={setShowErrorAlert}
                  setNoApplicationModal={setNoApplicationModal}
                />
              </Box>
            </Menu>
          </List>
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "12px 10px 0px 10px" }}
          />
        </Box> */}
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "12px 10px 0px 10px" }}
          />
          <Box
            sx={{
              height: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
            }}
          >
            {sidebarItems.map((app, i: number) => (
              <React.Fragment key={app.label}>
                <List
                  sx={{
                    color: theme.palette.text.primary,
                    marginTop: "2px",
                  }}
                >
                  {open && (
                    <Stack
                      sx={{
                        position: "sticky",
                        top: "0px",
                        backgroundColor: theme.palette.background.paper,
                        paddingLeft: "1rem",
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          fontSize: "15px",
                        }}
                      >
                        {app.label}
                      </Typography>
                      {/* <Stack direction="row" alignItems="center" gap={1.75}>
                      <Typography
                        variant="body1"
                        noWrap
                        sx={{
                          color: theme.palette.text.disabled,
                        }}
                      >
                        {app?.id}
                      </Typography>
                      <CopyToClipboard>
                        {({ copy }) => (
                          <IconButton
                            onClick={() => {
                              copy(app?.id);
                            }}
                          >
                            <ContentCopyIcon
                              sx={{ color: theme.palette.text.disabled }}
                              fontSize="small"
                            />
                          </IconButton>
                        )}
                      </CopyToClipboard>
                    </Stack> */}
                    </Stack>
                  )}
                  {app.items.map((item: any, index: number) => (
                    <MenuButton
                      item={item}
                      // index={2}
                      index={
                        i === 0
                          ? index + 1
                          : i === 1
                          ? sidebarItems[i - 1].items.length + index + 1
                          : sidebarItems[i - 2].items.length +
                            sidebarItems[i - 1].items.length +
                            index +
                            1
                      }
                      key={item.label}
                      open={open}
                      selectedHover={selectedHover}
                      location={location}
                      handleOnHover={handleOnHover}
                      setSelectedHover={setSelectedHover}
                      selectedIndexForStyle={selectedIndexForStyle}
                      handleListItemClick={handleListItemClick}
                    />
                  ))}
                </List>
                <Divider
                  // color={theme.palette.primary.divider}
                  sx={{ margin: "0px 10px" }}
                />
              </React.Fragment>
            ))}
          </Box>
          <Stack
            sx={{
              position: "sticky",
              bottom: 0,
              width: "-webkit-fill-available",
            }}
          >
            <Divider
              // color={theme.palette.primary.divider}
              sx={{ margin: "10px 10px 0px 10px" }}
            />
            <List sx={{ color: theme.palette.text.primary }}>
              {bottomItems.map((item, index) => (
                <MenuButton
                  item={item}
                  // index={2}
                  index={
                    sidebarItems.reduce(
                      (acc, curr) => acc + curr.items.length,
                      0
                    ) +
                    index +
                    1
                  }
                  isBottomSection
                  key={item.label}
                  open={open}
                  selectedHover={selectedHover}
                  location={location}
                  handleOnHover={handleOnHover}
                  setSelectedHover={setSelectedHover}
                  selectedIndexForStyle={selectedIndexForStyle}
                  handleListItemClick={handleListItemClick}
                />
              ))}
            </List>
            <Divider
              // color={theme.palette.primary.divider}
              sx={{ margin: "0px 10px" }}
            />
            <List sx={{ color: theme.palette.primary.light, marginTop: "5px" }}>
              <Box
                sx={{
                  padding: "0px 12px",
                  display: "flex",
                  flexDirection: open ? "row" : "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  // ...(selectedIndexForStyle === userProfileButtonIndex ||
                  // location.pathname === navLinks.R_SETTINGS
                  //   ? {
                  //       borderLeft: `4px solid ${theme.palette.secondary.main}`,
                  //       padding: "0px 8px !important",
                  //     }
                  //   : {}),
                }}
              >
                <ListItem
                  // onMouseOver={() => handleOnHover(userProfileButtonIndex)}
                  onMouseOut={() => setSelectedHover(null)}
                  disablePadding
                  sx={{ display: "block", width: "80%" }}
                >
                  <ListItemButton
                    selected={
                      // selectedIndexForStyle === userProfileButtonIndex ||
                      location.pathname === navLinks.R_SETTINGS
                    }
                    //   onClick={(e) =>
                    //     handleListItemClick(
                    //       e,
                    //       navLinks.R_SETTINGS,
                    //     //   userProfileButtonIndex
                    //     )
                    //   }
                    sx={{
                      minHeight: 30,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      height: "10px",
                      borderRadius: "5px",
                      color: theme.palette.text.primary,
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.light,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.hover} !important`,
                        },
                        ...(open &&
                          location.pathname !== navLinks.R_SETTINGS && {
                            color: theme.palette.primary.light,
                          }),
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.primary.hover,
                        color: theme.palette.text.primary,
                      },
                      ...(location.pathname === navLinks.R_SETTINGS && {
                        color: theme.palette.primary.main,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {/* {selectedHover === userProfileButtonIndex ||
                    location.pathname === navLinks.R_SETTINGS ? (
                      <UserAccountHoverIcon />
                    ) : (
                      <UserAccountWhiteIcon />
                    )} */}
                    </ListItemIcon>
                    {userData.email?.length > 20 ? (
                      <Tooltip title={userData?.email}>
                        <ListItemText
                          primary={userData?.email}
                          sx={{
                            opacity: open ? 1 : 0,
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                              marginLeft: "-10px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <ListItemText
                        primary={userData?.email}
                        sx={{
                          opacity: open ? 1 : 0,
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            marginLeft: "-17px",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
                <Tooltip title="Log Out" placement="right">
                  <LogoutIcon
                    sx={{
                      transform: "rotate(180deg)",
                      color: theme.palette.primary.main,
                      height: "28px",
                      width: "28px",
                      background: theme.palette.primary.light,
                      border: "2px solid",
                      borderColor: theme.palette.primary.light,
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(logout())}
                  />
                </Tooltip>
              </Box>
            </List>
          </Stack>
        </Drawer>
        {/* {errorMsg && (
        <AlertSnackbar
          open={showErrorAlert}
          setOpen={setShowErrorAlert}
          severity="error"
          alertMsg={errorMsg}
        />
      )} */}
        {noApplicationModal.show && (
          <Dialog open={noApplicationModal.show}>
            <DialogTitle
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: theme.spacing(2),
              }}
            >
              {/* <Typography
              sx={{
                fontSize: '14.625',
                fontWeight: '500',
              }}
            >
              
            </Typography> */}
            </DialogTitle>
            <DialogContent
              sx={{
                marginTop: theme.spacing(4),
                borderBottom: "1px dashed",
                borderColor: theme.palette.grey[200],
              }}
            >
              <Typography>
                {noApplicationModal.type === "no_applications"
                  ? "The selected workspace is not having any applications. Please select another workspace"
                  : `Organisation admin has not completed onboarding steps for selected workspace.`}
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{
                padding: theme.spacing(2),
              }}
            >
              <Button
                variant="contained"
                //   onClick={() => {
                //     navigate(navLinks.R_WORKSPACES);
                //   }}
                color="secondary"
                disableElevation
                sx={{
                  borderRadius: "6px",
                  textTransform: "capitalize",
                  px: theme.spacing(1.5),
                }}
              >
                Go To Workspaces
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
}
