import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./ListItems";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	logo: {
		maxHeight: "64px",
		marginLeft: "auto",
		marginRight: "auto",
		cursor: "pointer",
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
}));

export default function NavDrawer({ handleDrawerClose, open }) {
	const classes = useStyles();

	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
			}}
			open={open}
		>
			<div className={classes.toolbarIcon}>
				<img
					alt="Homepage"
					className={classes.logo}
					src="../trainual_logo.png"
				/>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>{mainListItems}</List>
		</Drawer>
	);
}
