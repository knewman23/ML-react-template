import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./navigation/Header";
import { makeStyles } from "@material-ui/core/styles";
import NavDrawer from "./navigation/NavDrawer";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
}));

export default function App() {
	const classes = useStyles();

	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Router>
				<NavDrawer handleDrawerClose={handleDrawerClose} open={open} />

				<Header handleDrawerOpen={handleDrawerOpen} open={open} />
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/orders">
						<Orders />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
