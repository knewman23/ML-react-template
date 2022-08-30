import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import "../App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
		backgroundColor: "#482D8C",
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	logo: {
		maxHeight: "64px",
		marginLeft: "auto",
		marginRight: "auto",
		cursor: "pointer",
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
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
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

const initialState = {
	isLoading: false,
	formData: {
		textfield1: "",
		textfield2: "",
		select1: 1,
		select2: 1,
	},
	result: "",
};

export default function Dashboard() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [formState, setFormState] = React.useState(initialState);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		var formData = formState.formData;
		formData[name] = value;
		setFormState({ ...formState, formData });
	};

	const handlePredictClick = (event) => {
		const formData = formState.formData;
		setFormState({ isLoading: true, ...formState });
		fetch("http://127.0.0.1:5000/prediction/", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((response) => {
				setFormState({
					...formState,
					result: response.result,
					isLoading: false,
				});
			});
	};

	const handleCancelClick = (event) => {
		setFormState({ ...formState, result: "" });
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						Trainual ML Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
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
						src="http://localtest.me:3000/assets/trainual-purple-9e2e168d955affeba16b758c523bf286839242bd7d94244b2ac1293bb6a6bd8f.png"
					/>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{/* Chart */}
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Chart />
							</Paper>
						</Grid>
						{/* Recent Deposits */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Deposits />
							</Paper>
						</Grid>
						{/* Recent Orders */}
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Orders />
							</Paper>
						</Grid>
					</Grid>
				</Container>

				<Container>
					{formState.result === "" ? null : (
						<Row>
							<Col className="result-container">
								<h5 id="result">{formState.result}</h5>
							</Col>
						</Row>
					)}
					<div className="content">
						<Form>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Text Field 1</Form.Label>
									<Form.Control
										type="text"
										placeholder="Text Field 1"
										name="textfield1"
										value={formState.formData.textfield1}
										onChange={handleChange}
									/>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Text Field 2</Form.Label>
									<Form.Control
										type="text"
										placeholder="Text Field 2"
										name="textfield2"
										value={formState.textfield2}
										onChange={handleChange}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Select 1</Form.Label>
									<Form.Control
										as="select"
										value={formState.formData.select1}
										name="select1"
										onChange={handleChange}
									>
										<option>0</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
									</Form.Control>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Select 2</Form.Label>
									<Form.Control
										as="select"
										value={formState.formData.select2}
										name="select2"
										onChange={handleChange}
									>
										<option>0</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
									</Form.Control>
								</Form.Group>
							</Form.Row>
							<Row>
								<Col>
									<Button
										block
										variant="success"
										disabled={formState.isLoading}
										onClick={!formState.isLoading ? handlePredictClick : null}
									>
										{formState.isLoading ? "Making prediction" : "Predict"}
									</Button>
								</Col>
								<Col>
									<Button
										block
										variant="danger"
										disabled={formState.isLoading}
										onClick={handleCancelClick}
									>
										Reset prediction
									</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</Container>
			</main>
		</div>
	);
}
