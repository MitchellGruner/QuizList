import React, { Component } from "react";
import Answers from "./Answers";
import { Accordion } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Quiz.css";
import uuid from "react-uuid";
import axios from "axios";

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numOfQuestions: 10,
			questionsArr: JSON.parse(
				window.localStorage.getItem("questionsArr") || "[]"
			),
		};
		this.getQuestions = this.getQuestions.bind(this);
		this.create = this.create.bind(this);
		this.handleDeletion = this.handleDeletion.bind(this);
	}

	componentDidMount() {
		if (this.state.questionsArr.length === 0) {
			this.getQuestions();
		}
	}

	async getQuestions() {
		let arr = [];
		let i = 0;

		let res = await axios.get(
			"https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
		);

		while (i < this.state.numOfQuestions) {
			arr.push(res.data.results[i]);
			i++;
		}

		this.setState({
			questionsArr: arr,
		});

		window.localStorage.setItem("questionsArr", JSON.stringify(arr));
	}

	create(newAccordion) {
		this.setState({
			accordion: [...this.state.accordion, newAccordion],
		});
	}

	handleDeletion(answer) {
		this.setState({
			questionsArr: this.state.questionsArr.filter((obj) => {
				return obj.incorrect_answers !== answer;
			}),
		});

		window.localStorage.setItem(
			"questionsArr",
			JSON.stringify(this.state.questionsArr)
		);
	}

	render() {
		return (
			<div className="Quiz">
				<div className="Quiz-sidebar">
					<h1 className="sidebar-title">
						<span>Quiz</span> List
					</h1>
					<i className="em em-brain"></i>
					<button
						onClick={this.getQuestions}
						className="Quiz-newGame"
					>
						New <span>Game</span>
					</button>
				</div>
				<div className="Quiz-quizlist">
					{this.props.difficulty}
					<TransitionGroup>
						{this.state.questionsArr.map((question) => (
							<CSSTransition
								key={uuid()}
								timeout={700}
								className="Quiz-transition"
							>
								<Accordion>
									<Accordion.Item eventKey={uuid()}>
										<Accordion.Header className="Quiz-header">
											{question.category}
										</Accordion.Header>
										<Accordion.Body>
											{question.question}

											<Answers
												idKey={uuid()}
												incorrect={
													question.incorrect_answers
												}
												correct={
													question.correct_answer
												}
												removeAccordion={
													this.handleDeletion
												}
											/>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default Quiz;
