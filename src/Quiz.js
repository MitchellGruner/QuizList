import React, {Component} from 'react';
import Answers from './Answers';
import {Accordion} from "react-bootstrap";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './Quiz.css';
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordion: [],
            numOfQuestions: 15,
            questionsArr: JSON.parse(window.localStorage.getItem("questionsArr") || "[]")
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

        let res = await axios.get(`https://opentdb.com/api.php?amount=${this.state.numOfQuestions}&difficulty=${this.props.difficulty}&type=multiple`);

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

    create (newAccordion) {
        this.setState({
            accordion: [...this.state.accordion, newAccordion]
        });
    }

    handleDeletion (id) {
        this.setState({
            accordion: this.state.accordion.filter(a => a.id !== id)
        });
    }

    render() {
        return (
            <div className="Quiz">
                <div className="Quiz-sidebar">
                    <h1 className="sidebar-title"><span>Quiz</span> List</h1>
                    <i className="em em-brain"></i>
                    <button onClick={this.getQuestions}>Remove</button>
                </div>
                <div className="Quiz-quizlist">
                    {this.props.difficulty}
                    <TransitionGroup>
                        {this.state.questionsArr.map((question, idx) => (
                            <CSSTransition key={idx} timeout={700} className="Quiz-transition">
                                <Accordion>
                                    <Accordion.Item eventKey={idx}>
                                        <Accordion.Header className="Quiz-header">{question.category}</Accordion.Header>
                                        <Accordion.Body>
                                        {question.question}
                                        <Answers key={idx} 
                                            incorrect={question.incorrect_answers} 
                                            correct={question.correct_answer} 
                                            removeAccordion={this.handleDeletion}
                                        />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default Quiz;