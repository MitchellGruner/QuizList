import React, {Component} from 'react';
import Question from './Question';
import './Quiz.css';
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfQuestions: 10,
            questions: [],
            correctAnswers: [],
            incorrectAnswers: []
        }
    }

    async componentDidMount() {
        let questionsArr = [];
        let correctAnswersArr = [];
        let incorrectAnswersArr = [];
        let i = 0;

        let res = await axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple");
        
        while (i < this.state.numOfQuestions) {
            questionsArr.push(res.data.results[i].question);
            correctAnswersArr.push(res.data.results[i].correct_answer);
            incorrectAnswersArr.push(res.data.results[i].incorrect_answers);
            i++;
        }

        this.setState({
            questions: questionsArr,
            correctAnswers: correctAnswersArr,
            incorrectAnswers: incorrectAnswersArr
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
                    <Question questions={this.state.questions} correctAnswers={this.state.correctAnswers}
                        incorrectAnswers={this.state.incorrectAnswers} />
                </div>
            </div>
        )
    }
}

export default Quiz;