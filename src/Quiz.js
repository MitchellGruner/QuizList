import React, {Component} from 'react';
import Answers from './Answers';
import {Accordion} from "react-bootstrap";
import './Quiz.css';
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfQuestions: 15,
            questionsArr: JSON.parse(window.localStorage.getItem("questionsArr") || "[]")
        };
        this.getQuestions = this.getQuestions.bind(this);
    }

    componentDidMount() {
        if (this.state.questionsArr.length === 0) {
            this.getQuestions();
        }
    }

    async getQuestions() {
        let arr = [];
        let i = 0;

        let res = await axios.get(`https://opentdb.com/api.php?amount=${this.state.numOfQuestions}&difficulty=easy&type=multiple`);

        console.log(res);
        
        while (i < this.state.numOfQuestions) {
            arr.push(res.data.results[i]);
            i++;
        }

        this.setState({
            questionsArr: arr
        });
        
        window.localStorage.setItem(
            "questionsArr",
            JSON.stringify(arr)
        )

        window.location.reload();
    }

    render() {
        return (
            <div className="Quiz">
                <div className="Quiz-sidebar">
                    <h1 className="Quiz-sidebar-title"><span>Quiz</span> List</h1>
                    <i className="em em-brain"></i>
                    <button onClick={this.getQuestions}>Remove</button>
                </div>
                <div className="Quiz-quizlist">
                    {this.state.questionsArr.map((question, idx) => (
                        <Accordion>
                            <Accordion.Item eventKey={idx}>
                                <Accordion.Header className="Quiz-header">{question.category}</Accordion.Header>
                                <Accordion.Body>
                                {question.question}
                                <Answers incorrect={question.incorrect_answers} correct={question.correct_answer} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>
            </div>
        )
    }
}

export default Quiz;