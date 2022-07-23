import React, {Component} from 'react';
import {Accordion} from "react-bootstrap";
import './Quiz.css';
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfQuestions: 10,
            questionsArr: []
        }
    }

    async componentDidMount() {
        let arr = [];
        let i = 0;

        let res = await axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");

        console.log(res);
        
        while (i < this.state.numOfQuestions) {
            arr.push(res.data.results[i]);
            i++;
        }

        this.setState({
            questionsArr: arr
        });

        for (let i = 0; i < this.state.questionsArr.length; i++) {
            console.log(this.state.questionsArr[i]);
        }
    }

    render() {
        for (let i = 0; i < this.state.id; i++) {
            console.log(this.state.id[i]);
        }
        return (
            <div className="Quiz">
                <div className="Quiz-sidebar">
                    <h1 className="Quiz-sidebar-title"><span>Quiz</span> List</h1>
                    <i className="em em-brain"></i>
                </div>
                <div className="Quiz-quizlist">
                    {this.state.questionsArr.map(h => (
                        <h1>{h.category}</h1>
                    ))}
                </div>
            </div>
        )
    }
}

export default Quiz;