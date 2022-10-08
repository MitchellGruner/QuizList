import React, { Component } from "react";
import Timer from "./Timer";
import "./Answers.css";

class Answers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answersArr: [],
			correctArr: [],
		};
		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount() {
		let arr1 = [];
		let arr2 = [];

		for (let i = 0; i < this.props.incorrect.length; i++) {
			arr1.push(this.props.incorrect[i]);
		}

		arr1.push(this.props.correct);
		arr2.push(this.props.correct);

		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}

		shuffleArray(arr1);

		this.setState({
			answersArr: arr1,
			correctArr: arr2,
		});
	}

	handleClick(arg) {
		if (this.state.correctArr.includes(this.state.answersArr[arg])) {
			this.props.removeAccordion(this.props.incorrect);
			this.props.correctScore();
		} else {
			this.props.wrongGuess();
			this.props.wrongScore();
		}
	}

	render() {
		return (
			<div className="Answers">
				<div className="Answers-container">
					<div className="row flex-row">
						<button
							onClick={() => this.handleClick(0)}
							className="Answers-btn col-md-6"
						>
							{this.state.answersArr[0]}
						</button>
						<button
							onClick={() => this.handleClick(1)}
							className="Answers-btn col-md-6"
						>
							{this.state.answersArr[1]}
						</button>
					</div>
					<div className="row flex-row">
						<button
							onClick={() => this.handleClick(2)}
							className="Answers-btn col-md-6"
						>
							{this.state.answersArr[2]}
						</button>
						<button
							onClick={() => this.handleClick(3)}
							className="Answers-btn col-md-6"
						>
							{this.state.answersArr[3]}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Answers;
