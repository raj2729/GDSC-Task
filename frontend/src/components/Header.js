import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [openslider, setOpenslider] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenslider(true);
  };

  const handleDrawerClose = () => {
    setOpenslider(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  let history = useHistory();

  const handleLogout = () => {
    if (userInfo) {
      history.push("/");
      dispatch(logout());
    }
  };

  return (
    <div>
      <AppBar
        style={{ background: "#F3FAFF" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openslider,
        })}
      >
        <Toolbar>
          <IconButton
            style={{ color: "black" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openslider && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              DJ Sanghvi College Of Engineering
            </Link>
          </Typography>
          {userInfo ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="outlined" color="primary">
                  Sign Up
                </Button>
              </Link>
              &nbsp;
              <Link
                to={"/signin"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" color="primary">
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openslider}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <List>
            <ListItem button key="Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Link>

        {userInfo ? (
          <Link
            to={`/myProfile`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItem button key="My Profile">
                <ListItemIcon>
                  <CastForEducationIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
            </List>
          </Link>
        ) : (
          <List>
            <ListItem
              button
              disabled={userInfo ? "false" : "true"}
              key="My Profile"
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
          </List>
        )}

        {userInfo ? (
          <Link
            to={`/editProfile`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItem button key="Add Details">
                <ListItemIcon>
                  <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Add Details" />
              </ListItem>
            </List>
          </Link>
        ) : (
          <List>
            <ListItem
              button
              disabled={userInfo ? "false" : "true"}
              key="Add Details"
            >
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Add Details" />
            </ListItem>
          </List>
        )}

        {userInfo ? (
          userInfo.data.isAdmin === true ? (
            <Link
              to={`/admin/getAllUsers`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <List>
                <ListItem button key="All User Information">
                  <ListItemIcon>
                    <PermPhoneMsgIcon />
                  </ListItemIcon>
                  <ListItemText primary="All User Information" />
                </ListItem>
              </List>
            </Link>
          ) : (
            <p></p>
          )
        ) : (
          <p></p>
        )}

        <Divider />
        <Divider />
      </Drawer>
    </div>
  );
};

export default Header;
