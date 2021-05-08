import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
} from "@material-ui/core/styles";
import SignInOrSignUp from "../sign_in_and_sign_up";
import { userBoundery } from "../../interfaces";
import ClassIcon from "@material-ui/icons/Class";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const miniDrawerWidth = 60;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        drawer: {
            [theme.breakpoints.down("sm")]: {
                width: "0px",
                flexShrink: 0,
            },
            [theme.breakpoints.up("sm")]: {
                zIndex: 0,
                width: miniDrawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
                width: `100%`,
                marginLeft: "0px",
            },
            [theme.breakpoints.up("sm")]: {
                width: `100%`,
                paddingRight: "5%",
                marginLeft: miniDrawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            [theme.breakpoints.up("sm")]: {
                width: miniDrawerWidth,
            },
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

interface Props {
    children: React.ReactNode;
    user: userBoundery | null;
    setUser: (user: userBoundery | null) => void;
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let history = useHistory();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const upperLinks = [
        ...(props.user
            ? [
                  {
                      label: "items",
                      link: "items",
                      icon: <ClassIcon />,
                  },
              ]
            : []),
    ];

    const lowerLinks = [
        ...(props.user
            ? [
                  {
                      label: "profile",
                      link: "/user",
                      icon: <AccountCircleIcon />,
                  },
              ]
            : []),
    ];

    const miniDrawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {upperLinks.map((li) => (
                    <ListItem
                        button
                        onClick={() => {
                            if (li.link) {
                                history.push(li.link);
                            }
                        }}
                        key={li.label}
                    >
                        <Tooltip title={li.label}>
                            <ListItemIcon>{li.icon}</ListItemIcon>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {lowerLinks.map((li) => (
                    <ListItem
                        button
                        onClick={() => {
                            if (li.link) {
                                history.push(li.link);
                            }
                        }}
                        key={li.label}
                    >
                        <Tooltip title={li.label}>
                            <ListItemIcon>{li.icon}</ListItemIcon>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const drawer = (
        <div>
            <Divider />
            <List>
                {upperLinks.map((li) => (
                    <ListItem
                        button
                        onClick={() => {
                            if (li.link) {
                                history.push(li.link);
                                handleDrawerToggle();
                            }
                        }}
                        key={li.label}
                    >
                        <ListItemIcon>{li.icon}</ListItemIcon>
                        <ListItemText primary={li.label} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {lowerLinks.map((li) => (
                    <ListItem
                        button
                        onClick={() => {
                            if (li.link) {
                                history.push(li.link);
                                handleDrawerToggle();
                            }
                        }}
                        key={li.label}
                    >
                        <ListItemIcon>{li.icon}</ListItemIcon>
                        <ListItemText primary={li.label} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container =
        window !== undefined
            ? () => window().document.body
            : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: 600,
                        }}
                        noWrap
                    >
                        students enroll system
                    </Typography>
                </Toolbar>
                <SignInOrSignUp
                    user={props.user}
                    setUser={props.setUser}
                />
            </AppBar>
            <nav
                className={classes.drawer}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={
                            theme.direction === "rtl"
                                ? "right"
                                : "left"
                        }
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {miniDrawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
