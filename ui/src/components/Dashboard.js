import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import "../App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import DataTable from "./DataTable";

const useStyles = makeStyles((theme) => ({
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
	const [formState, setFormState] = React.useState(initialState);
	const [fbAdData, setAdData] = React.useState(null);
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		var formData = formState.formData;
		formData[name] = value;
		setFormState({ ...formState, formData });
	};

	useEffect(() => {
		setFormState({ ...formState, isLoading: true });
		fetch("http://127.0.0.1:5000/prediction/", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "GET",
		})
			.then((response) => response.json())
			.then((response) => {
				setAdData(response.data);
				setFormState({ ...formState, isLoading: false });
			});
	}, []);

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
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={1}>
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

					<Grid item xs={12}>
						<Paper className={classes.paper}>
							{fbAdData && <DataTable data={fbAdData} />}
						</Paper>
					</Grid>
				</Grid>
			</Container>

			<Container>
				{!formState.isLoading && formState.result === "" ? null : (
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
	);
}
