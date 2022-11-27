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

	/* use api to get questions / answers */
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

		/* filtering for questions */
		for (let j = 0; j < arr.length; j++) {
			for (let i = 0; i < arr.length; i++) {
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

				if (arr[i].question.includes("&ouml;")) {
					arr[i].question = arr[i].question.replace("&ouml;", "ö");
				}

				if (arr[i].question.includes("&Ouml;")) {
					arr[i].question = arr[i].question.replace("&Ouml;", "Ö");
				}
				
				if (arr[i].question.includes("&aacute;")) {
					arr[i].question = arr[i].question.replace("&aacute;", "á")
				}

				if (arr[i].question.includes("&Aacute;")) {
					arr[i].question = arr[i].question.replace("&Aacute;", "Á")
				}

				if (arr[i].question.includes("&eacute;")) {
					arr[i].question = arr[i].question.replace("&eacute;", "é")
				}

				if (arr[i].question.includes("&Eacute;")) {
					arr[i].question = arr[i].question.replace("&Eacute;", "É");
				}

				if (arr[i].question.includes("iacute;")) {
					arr[i].question = arr[i].question.replace("&iacute;", "í")
				}

				if (arr[i].question.includes("Iacute;")) {
					arr[i].question = arr[i].question.replace("&Iacute;", "Í");
				}

				if (arr[i].question.includes("&oacute;")) {
					arr[i].question = arr[i].question.replace("&oacute;", "ó")
				}

				if (arr[i].question.includes("Oacute;")) {
					arr[i].question = arr[i].question.replace("&Oacute;", "Ó");
				}

				if (arr[i].question.includes("&uacute;")) {
					arr[i].question = arr[i].question.replace("&uacute;", "ú")
				}

				if (arr[i].question.includes("Uacute;")) {
					arr[i].question = arr[i].question.replace("&Uacute;", "Ú");
				}

				if (arr[i].question.includes("&Ocirc;")) {
					arr[i].question = arr[i].question.replace("&Ocirc;", "Ô");
				}

				if (arr[i].question.includes("&ocirc;")) {
					arr[i].question = arr[i].question.replace("&ocirc;", "ô");
				}
			}
		}

		/* filtering for correct answers */
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				if (arr[i].correct_answer.includes("&#039;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&#039;", "'");
				}
	
				if (arr[i].correct_answer.includes("&quot;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&quot;", "'");
				}
				
				if (arr[i].correct_answer.includes("&amp;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&amp;", "&");
				}

				if (arr[i].correct_answer.includes("&Uuml;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Uuml;", "Ü");
				}

				if (arr[i].correct_answer.includes("&uuml;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Uuml;", "ü");
				}

				if (arr[i].correct_answer.includes("&shy;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&shy;", "-");
				}

				if (arr[i].correct_answer.includes("&rsquo")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&rsquo", "'");
				}

				if (arr[i].correct_answer.includes("&ouml;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&ouml;", "ö");
				}

				if (arr[i].correct_answer.includes("&Ouml;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Ouml;", "Ö");
				}

				if (arr[i].correct_answer.includes("&aacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&aacute;", "á")
				}

				if (arr[i].correct_answer.includes("&Aacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Aacute;", "Á")
				}

				if (arr[i].correct_answer.includes("&eacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&eacute;", "é")
				}

				if (arr[i].correct_answer.includes("&Eacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Eacute;", "É");
				}

				if (arr[i].correct_answer.includes("iacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&iacute;", "í")
				}

				if (arr[i].correct_answer.includes("Iacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Iacute;", "Í");
				}

				if (arr[i].correct_answer.includes("&oacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&oacute;", "ó")
				}

				if (arr[i].correct_answer.includes("Oacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Oacute;", "Ó");
				}

				if (arr[i].correct_answer.includes("&uacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&uacute;", "ú")
				}

				if (arr[i].correct_answer.includes("Uacute;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Uacute;", "Ú");
				}

				if (arr[i].correct_answer.includes("&Ocirc;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&Ocirc;", "Ô");
				}

				if (arr[i].correct_answer.includes("&ocirc;")) {
					arr[i].correct_answer = arr[i].correct_answer.replace("&ocirc;", "ô");
				}
			}
		}

		/* filtering for incorrect answers */
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				if (arr[i].incorrect_answers[0].includes("&#039;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&#039;", "'");
				}

				if (arr[i].incorrect_answers[1].includes("&#039;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&#039;", "'");
				}

				if (arr[i].incorrect_answers[2].includes("&#039;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&#039;", "'");
				}

				if (arr[i].incorrect_answers[0].includes("&quot;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&quot;", "'");
				}

				if (arr[i].incorrect_answers[1].includes("&quot;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&quot;", "'");
				}

				if (arr[i].incorrect_answers[2].includes("&quot;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&quot;", "'");
				}
				
				if (arr[i].incorrect_answers[0].includes("&amp;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&amp;", "&");
				}

				if (arr[i].incorrect_answers[1].includes("&amp;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&amp;", "&");
				}

				if (arr[i].incorrect_answers[2].includes("&amp;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&amp;", "&");
				}

				if (arr[i].incorrect_answers[0].includes("&Uuml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Uuml;", "Ü");
				}

				if (arr[i].incorrect_answers[1].includes("&Uuml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Uuml;", "Ü");
				}

				if (arr[i].incorrect_answers[2].includes("&Uuml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Uuml;", "Ü");
				}

				if (arr[i].incorrect_answers[0].includes("&uuml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Uuml;", "ü");
				}

				if (arr[i].incorrect_answers[1].includes("&uuml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Uuml;", "ü");
				}

				if (arr[i].incorrect_answers[2].includes("&uuml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Uuml;", "ü");
				}

				if (arr[i].incorrect_answers[0].includes("&shy;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&shy;", "-");
				}

				if (arr[i].incorrect_answers[1].includes("&shy;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&shy;", "-");
				}

				if (arr[i].incorrect_answers[2].includes("&shy;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&shy;", "-");
				}

				if (arr[i].incorrect_answers[0].includes("&rsquo")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&rsquo", "'");
				}

				if (arr[i].incorrect_answers[1].includes("&rsquo")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&rsquo", "'");
				}

				if (arr[i].incorrect_answers[2].includes("&rsquo")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&rsquo", "'");
				}

				if (arr[i].incorrect_answers[0].includes("&ouml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&ouml;", "ö");
				}

				if (arr[i].incorrect_answers[1].includes("&ouml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&ouml;", "ö");
				}

				if (arr[i].incorrect_answers[2].includes("&ouml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&ouml;", "ö");
				}

				if (arr[i].incorrect_answers[0].includes("&Ouml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Ouml;", "Ö");
				}

				if (arr[i].incorrect_answers[1].includes("&Ouml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Ouml;", "Ö");
				}

				if (arr[i].incorrect_answers[2].includes("&Ouml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Ouml;", "Ö");
				}

				if (arr[i].incorrect_answers[0].includes("&aacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&aacute;", "á")
				}

				if (arr[i].incorrect_answers[1].includes("&aacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&aacute;", "á")
				}

				if (arr[i].incorrect_answers[2].includes("&aacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&aacute;", "á")
				}

				if (arr[i].incorrect_answers[0].includes("&Aacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Aacute;", "Á")
				}

				if (arr[i].incorrect_answers[1].includes("&Aacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Aacute;", "Á")
				}

				if (arr[i].incorrect_answers[2].includes("&Aacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Aacute;", "Á")
				}

				if (arr[i].incorrect_answers[0].includes("&eacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&eacute;", "é")
				}

				if (arr[i].incorrect_answers[1].includes("&eacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&eacute;", "é")
				}

				if (arr[i].incorrect_answers[2].includes("&eacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&eacute;", "é")
				}

				if (arr[i].incorrect_answers[0].includes("&Eacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Eacute;", "É");
				}

				if (arr[i].incorrect_answers[1].includes("&Eacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Eacute;", "É");
				}

				if (arr[i].incorrect_answers[2].includes("&Eacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Eacute;", "É");
				}

				if (arr[i].incorrect_answers[0].includes("iacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&iacute;", "í")
				}

				if (arr[i].incorrect_answers[1].includes("iacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&iacute;", "í")
				}

				if (arr[i].incorrect_answers[2].includes("iacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&iacute;", "í")
				}

				if (arr[i].incorrect_answers[0].includes("Iacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Iacute;", "Í");
				}

				if (arr[i].incorrect_answers[1].includes("Iacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Iacute;", "Í");
				}

				if (arr[i].incorrect_answers[2].includes("Iacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Iacute;", "Í");
				}

				if (arr[i].incorrect_answers[0].includes("&oacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&oacute;", "ó")
				}

				if (arr[i].incorrect_answers[1].includes("&oacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&oacute;", "ó")
				}

				if (arr[i].incorrect_answers[2].includes("&oacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&oacute;", "ó")
				}

				if (arr[i].incorrect_answers[0].includes("Oacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Oacute;", "Ó");
				}

				if (arr[i].incorrect_answers[1].includes("Oacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Oacute;", "Ó");
				}

				if (arr[i].incorrect_answers[2].includes("Oacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Oacute;", "Ó");
				}

				if (arr[i].incorrect_answers[0].includes("&uacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&uacute;", "ú")
				}

				if (arr[i].incorrect_answers[1].includes("&uacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&uacute;", "ú")
				}

				if (arr[i].incorrect_answers[2].includes("&uacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&uacute;", "ú")
				}

				if (arr[i].incorrect_answers[0].includes("Uacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Uacute;", "Ú");
				}

				if (arr[i].incorrect_answers[1].includes("Uacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Uacute;", "Ú");
				}

				if (arr[i].incorrect_answers[2].includes("Uacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Uacute;", "Ú");
				}

				if (arr[i].incorrect_answers[0].includes("&lrm;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&lrm;", "");
				}

				if (arr[i].incorrect_answers[1].includes("&lrm;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&lrm;", "");
				}

				if (arr[i].incorrect_answers[2].includes("&lrm;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&lrm;", "");
				}

				if (arr[i].incorrect_answers[0].includes("&rlm;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&rlm;", "");
				}

				if (arr[i].incorrect_answers[1].includes("&rlm;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&rlm;", "");
				}

				if (arr[i].incorrect_answers[2].includes("&rlm;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&rlm;", "");
				}

				if (arr[i].incorrect_answers[0].includes("&Ocirc;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Ocirc;", "Ô");
				}

				if (arr[i].incorrect_answers[1].includes("&Ocirc;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Ocirc;", "Ô");
				}

				if (arr[i].incorrect_answers[2].includes("&Ocirc;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Ocirc;", "Ô");
				}

				if (arr[i].incorrect_answers[0].includes("&ocirc;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&ocirc;", "ô");
				}

				if (arr[i].incorrect_answers[1].includes("&ocirc;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&ocirc;", "ô");
				}

				if (arr[i].incorrect_answers[2].includes("&ocirc;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&ocirc;", "ô");
				}
			}
		}

		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				if (arr[i].incorrect_answers[0].includes("&#039;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&#039;", "'");
				}

				if (arr[i].incorrect_answers[1].includes("&#039;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&#039;", "'");
				}

				if (arr[i].incorrect_answers[2].includes("&#039;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&#039;", "'");
				}

				if (arr[i].incorrect_answers[0].includes("&quot;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&quot;", "'");
				}

				if (arr[i].incorrect_answers[1].includes("&quot;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&quot;", "'");
				}

				if (arr[i].incorrect_answers[2].includes("&quot;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&quot;", "'");
				}
				
				if (arr[i].incorrect_answers[0].includes("&amp;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&amp;", "&");
				}

				if (arr[i].incorrect_answers[1].includes("&amp;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&amp;", "&");
				}

				if (arr[i].incorrect_answers[2].includes("&amp;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&amp;", "&");
				}

				if (arr[i].incorrect_answers[0].includes("&Uuml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Uuml;", "Ü");
				}

				if (arr[i].incorrect_answers[1].includes("&Uuml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Uuml;", "Ü");
				}

				if (arr[i].incorrect_answers[2].includes("&Uuml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Uuml;", "Ü");
				}

				if (arr[i].incorrect_answers[0].includes("&uuml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Uuml;", "ü");
				}

				if (arr[i].incorrect_answers[1].includes("&uuml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Uuml;", "ü");
				}

				if (arr[i].incorrect_answers[2].includes("&uuml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Uuml;", "ü");
				}

				if (arr[i].incorrect_answers[0].includes("&shy;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&shy;", "-");
				}

				if (arr[i].incorrect_answers[1].includes("&shy;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&shy;", "-");
				}

				if (arr[i].incorrect_answers[2].includes("&shy;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&shy;", "-");
				}

				if (arr[i].incorrect_answers[0].includes("&rsquo")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&rsquo", "'");
				}

				if (arr[i].incorrect_answers[1].includes("&rsquo")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&rsquo", "'");
				}

				if (arr[i].incorrect_answers[2].includes("&rsquo")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&rsquo", "'");
				}

				if (arr[i].incorrect_answers[0].includes("&ouml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&ouml;", "ö");
				}

				if (arr[i].incorrect_answers[1].includes("&ouml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&ouml;", "ö");
				}

				if (arr[i].incorrect_answers[2].includes("&ouml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&ouml;", "ö");
				}

				if (arr[i].incorrect_answers[0].includes("&Ouml;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Ouml;", "Ö");
				}

				if (arr[i].incorrect_answers[1].includes("&Ouml;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Ouml;", "Ö");
				}

				if (arr[i].incorrect_answers[2].includes("&Ouml;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Ouml;", "Ö");
				}

				if (arr[i].incorrect_answers[0].includes("&aacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&aacute;", "á")
				}

				if (arr[i].incorrect_answers[1].includes("&aacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&aacute;", "á")
				}

				if (arr[i].incorrect_answers[2].includes("&aacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&aacute;", "á")
				}

				if (arr[i].incorrect_answers[0].includes("&Aacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Aacute;", "Á")
				}

				if (arr[i].incorrect_answers[1].includes("&Aacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Aacute;", "Á")
				}

				if (arr[i].incorrect_answers[2].includes("&Aacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Aacute;", "Á")
				}

				if (arr[i].incorrect_answers[0].includes("&eacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&eacute;", "é")
				}

				if (arr[i].incorrect_answers[1].includes("&eacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&eacute;", "é")
				}

				if (arr[i].incorrect_answers[2].includes("&eacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&eacute;", "é")
				}

				if (arr[i].incorrect_answers[0].includes("&Eacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Eacute;", "É");
				}

				if (arr[i].incorrect_answers[1].includes("&Eacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Eacute;", "É");
				}

				if (arr[i].incorrect_answers[2].includes("&Eacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Eacute;", "É");
				}

				if (arr[i].incorrect_answers[0].includes("iacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&iacute;", "í")
				}

				if (arr[i].incorrect_answers[1].includes("iacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&iacute;", "í")
				}

				if (arr[i].incorrect_answers[2].includes("iacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&iacute;", "í")
				}

				if (arr[i].incorrect_answers[0].includes("Iacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Iacute;", "Í");
				}

				if (arr[i].incorrect_answers[1].includes("Iacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Iacute;", "Í");
				}

				if (arr[i].incorrect_answers[2].includes("Iacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Iacute;", "Í");
				}

				if (arr[i].incorrect_answers[0].includes("&oacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&oacute;", "ó")
				}

				if (arr[i].incorrect_answers[1].includes("&oacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&oacute;", "ó")
				}

				if (arr[i].incorrect_answers[2].includes("&oacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&oacute;", "ó")
				}

				if (arr[i].incorrect_answers[0].includes("Oacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Oacute;", "Ó");
				}

				if (arr[i].incorrect_answers[1].includes("Oacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Oacute;", "Ó");
				}

				if (arr[i].incorrect_answers[2].includes("Oacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Oacute;", "Ó");
				}

				if (arr[i].incorrect_answers[0].includes("&uacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&uacute;", "ú")
				}

				if (arr[i].incorrect_answers[1].includes("&uacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&uacute;", "ú")
				}

				if (arr[i].incorrect_answers[2].includes("&uacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&uacute;", "ú")
				}

				if (arr[i].incorrect_answers[0].includes("Uacute;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Uacute;", "Ú");
				}

				if (arr[i].incorrect_answers[1].includes("Uacute;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Uacute;", "Ú");
				}

				if (arr[i].incorrect_answers[2].includes("Uacute;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Uacute;", "Ú");
				}

				if (arr[i].incorrect_answers[0].includes("&lrm;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&lrm;", "");
				}

				if (arr[i].incorrect_answers[1].includes("&lrm;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&lrm;", "");
				}

				if (arr[i].incorrect_answers[2].includes("&lrm;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&lrm;", "");
				}

				if (arr[i].incorrect_answers[0].includes("&rlm;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&rlm;", "");
				}

				if (arr[i].incorrect_answers[1].includes("&rlm;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&rlm;", "");
				}

				if (arr[i].incorrect_answers[2].includes("&rlm;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&rlm;", "");
				}

				if (arr[i].incorrect_answers[0].includes("&Ocirc;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&Ocirc;", "Ô");
				}

				if (arr[i].incorrect_answers[1].includes("&Ocirc;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&Ocirc;", "Ô");
				}

				if (arr[i].incorrect_answers[2].includes("&Ocirc;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&Ocirc;", "Ô");
				}

				if (arr[i].incorrect_answers[0].includes("&ocirc;")) {
					arr[i].incorrect_answers[0] = arr[i].incorrect_answers[0].replace("&ocirc;", "ô");
				}

				if (arr[i].incorrect_answers[1].includes("&ocirc;")) {
					arr[i].incorrect_answers[1] = arr[i].incorrect_answers[1].replace("&ocirc;", "ô");
				}

				if (arr[i].incorrect_answers[2].includes("&ocirc;")) {
					arr[i].incorrect_answers[2] = arr[i].incorrect_answers[2].replace("&ocirc;", "ô");
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
		document.getElementById("wrongguess").style.display = "flex";
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
					
					<div className="sidebar-title-large">
						<h1 className="sidebar-title">
							<span>Quiz</span> List
						</h1>
						<i className="em em-brain"></i>
					</div>

					<div className="sidebar-title-small">
						<h1 className="sidebar-title">
							<span>Quiz</span> List
						</h1>
						<i className="em em-brain"></i>
					</div>

					<div className="sidebar-title-large">
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

					<div className="sidebar-title-small">
						<div className="sidebar-title-small-col">
							<div className="Quiz-score">
								Correct: {this.state.score}
							</div>
							<div className="Quiz-high-score">
								High Score: {window.localStorage.getItem("highScore")}
							</div>
						</div>
						<div className="sidebar-title-small-col">
							<div className="Quiz-indicator">
								<i className={this.getEmoji()} />
							</div>
						</div>
						<button
							onClick={() => {this.getQuestions(); this.refresh();}}
							className="Quiz-newGame Quiz-parallelogram"
						>
							<div className="Quiz-skew">New <span>Game</span>
							</div>
						</button>
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
					<span className="quizlist-wrong-header">Game Over!</span><br />
					<p className="quizlist-wrong-paragraph">Your final score was <strong>{this.state.score}</strong></p>
					<button
						onClick={() => {this.getQuestions(); this.refresh();}}
						className="Quiz-newGame Quiz-parallelogram"
					>
						<div className="Quiz-skew">New <span>Game</span>
						</div>
					</button>
				</div>
			</div>
		);
	}
}

export default Quiz;
