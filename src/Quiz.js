import React, { Component } from "react";
import Answers from "./Answers";
import LivesIndicator from "./LivesIndicator";
import { Accordion } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Quiz.css";
import uuid from "react-uuid";
import axios from "axios";

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numOfQuestions: 25,
			correctScore: "",
			score: 0,
			questionsArr: [],
			indicatorEmoji: "",
			indicator: "",
			incorrect: 0,
		};
		this.getQuestions = this.getQuestions.bind(this);
		this.refresh = this.refresh.bind(this);
		this.create = this.create.bind(this);
		this.handleDeletion = this.handleDeletion.bind(this);
		this.handleWrongGuess = this.handleWrongGuess.bind(this);
		this.getEmoji = this.getEmoji.bind(this);
		this.correctScore = this.correctScore.bind(this);
		this.wrongScore = this.wrongScore.bind(this);
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
			"https://opentdb.com/api.php?amount=25&difficulty=easy&type=multiple"
		);

		while (i < this.state.numOfQuestions) {
			arr.push(res.data.results[i]);
			i++;
		}

		for (let j = 0; j < arr.length; j++) {
			for (let i = 0; i < arr.length; i++) {

				/* for questions */
				if (arr[i].question.includes("&#039;")) {
					arr[i].question = arr[i].question.replace("&#039;", "'");
				}
	
				if (arr[i].question.includes("&quot;")) {
					arr[i].question = arr[i].question.replace("&quot;", "'");
				}
				
				if (arr[i].question.includes("&amp;")) {
					arr[i].question = arr[i].question.replace("&amp;", "&");
				}

				if (arr[i].question.includes("&Uuml;")) {
					arr[i].question = arr[i].question.replace("&Uuml;", "Ü");
				}

				if (arr[i].question.includes("&uuml;")) {
					arr[i].question = arr[i].question.replace("&Uuml;", "ü");
				}

				if (arr[i].question.includes("&shy;")) {
					arr[i].question = arr[i].question.replace("&shy;", "-");
				}

				if (arr[i].question.includes("&rsquo")) {
					arr[i].question = arr[i].question.replace("&rsquo", "'");
				}
			}
		}

		this.setState({
			questionsArr: arr,
		});
	}

	refresh() {
		window.location.reload(false);
	}

	create(newAccordion) {
		this.setState({
			accordion: [...this.state.accordion, newAccordion],
		});
	}

	handleDeletion(answer) {
		this.setState((st) => ({
			indicator: "Correct",
		}));

		this.setState({
			questionsArr: this.state.questionsArr.filter((obj) => {
				return obj.incorrect_answers !== answer;
			}),
		});
	}

	handleWrongGuess() {
		this.setState((st) => ({
			indicator: "Incorrect",
			incorrect: st.incorrect + 1,
		}));
	}

	correctScore() {
		this.setState((st) => ({
			score: st.score + 1,
		}));

		if ((window.localStorage.getItem("highScore") == null) || (window.localStorage.getItem("highScore") == 0)) {
			window.localStorage.setItem("highScore", 0);
		}
		
		if ((this.state.score + 1) > window.localStorage.getItem("highScore")) {
			window.localStorage.setItem("highScore", (this.state.score + 1));
		}
	}

	wrongScore() {
		document.getElementById("initialState").style.display = "none";
		document.getElementById("wrongguess").style.display = "block";
	}

	getEmoji() {
		if (this.state.indicator === "Incorrect") {
			return "em em-disappointed_relieved";
		} else if (this.state.indicator === "") {
			return "em em-placeholder";
		} else {
			return "em em-sweat_smile";
		}
	}

	render() {
		return (
			<div className="Quiz">
				<div className="Quiz-sidebar">
					<div className="Quiz-lives">
						<LivesIndicator />
					</div>
					<h1 className="sidebar-title">
						<span>Quiz</span> List
					</h1>
					<i className="em em-brain"></i>
					<div className="Quiz-score">
						Correct: {this.state.score}
					</div>
					<div className="Quiz-high-score">
						High Score: {window.localStorage.getItem("highScore")}
					</div>
					<button
						onClick={() => {this.getQuestions(); this.refresh();}}
						className="Quiz-newGame Quiz-parallelogram"
					>
						<div className="Quiz-skew">New <span>Game</span>
						</div>
					</button>
					<div className="Quiz-indicator">
						<i className={this.getEmoji()} />
					</div>
				</div>
				<div id="initialState" className="Quiz-quizlist">
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
												wrongGuess={
													this.handleWrongGuess
												}
												correctScore={this.correctScore}
												wrongScore={this.wrongScore}
											/>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<div id="wrongguess" className="Quiz-quizlist-wrong">
					<h1>Game Over!</h1>
					<button
						onClick={() => {this.getQuestions(); this.refresh();}}
						className="Quiz-newGame Quiz-parallelogram"
					>
						<div className="Quiz-skew">New <span>Game</span>
						</div>
					</button>
				</div>
				{/* <div className="Quiz-timer">
					<Timer />
				</div> */}
			</div>
		);
	}
}

export default Quiz;
