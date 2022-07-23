import React, {Component} from 'react';
import Question from './Question';
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
            arr.push(res.data.results[i].question);
            i++;
        }

        this.setState({
            questionsArr: arr
        });
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
                    {this.state.questionsArr.map((question, idx) => (
                        <Question key={"element" + idx} text={question} num={this.state.numOfQuestions} test={this.state.key} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Quiz;