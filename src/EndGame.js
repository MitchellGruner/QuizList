import React, { Component } from "react";
import LivesIndicator from "./LivesIndicator";
import "./Quiz.css";

class EndGame extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			// <div className="Quiz">
			// 	<div className="Quiz-sidebar">
			// 		<div className="Quiz-lives">
			// 			<LivesIndicator />
			// 		</div>
			// 		<h1 className="sidebar-title">
			// 			<span>Quiz</span> List
			// 		</h1>
			// 		<i className="em em-brain"></i>
			// 		<div className="Quiz-score">
			// 			Correct: {this.state.score}
			// 		</div>
			// 		<div className="Quiz-high-score">
			// 			High Score: {window.localStorage.getItem("highScore")}
			// 		</div>
			// 		<button
			// 			onClick={() => {this.getQuestions(); this.refresh();}}
			// 			className="Quiz-newGame Quiz-parallelogram"
			// 		>
			// 			<div className="Quiz-skew">New <span>Game</span>
			// 			</div>
			// 		</button>
			// 		<div className="Quiz-indicator">
			// 			<i className={this.getEmoji()} />
			// 		</div>
			// 	</div>
			// 	<div className="Quiz-quizlist">
			// 		<h1>Game Over</h1>
			// 	</div>
			// </div>
            <div><h1>ello</h1></div>
		);
	}
}

export default EndGame;
