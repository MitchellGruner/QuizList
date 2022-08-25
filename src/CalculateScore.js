import React, { Component } from "react";
import Timer from "./Timer";

class CalculateScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: <Timer />,
			correctAnswer: this.props.correct,
		};
	}

	render() {
		let score = this.state.timer + this.state.correctAnswer;

		return (
			<div className="CalculateScore">
				Score
				<br />
				{score}
			</div>
		);
	}
}

export default CalculateScore;
