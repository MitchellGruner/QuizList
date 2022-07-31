import * as React from 'react';
import Quiz from './Quiz';
import './Start.css';
import './Quiz.css';

const Start = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         difficulty: [],
    //         numQuestions: [],
    //     }
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
    //     this.handleChangeQuestions = this.handleChangeQuestions.bind(this);
    // }
    const [value, setValue] = React.useState("Easy");

    const handleChange = (evt) => {
        setValue(evt.target.value);
        <Quiz difficulty={evt.target.value} />
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        <Quiz />
    }

    const gameDifficulty = [
        {label: "Easy", value: "Easy"},
        {label: "Medium", value: "Medium"},
        {label: "Hard", value: "Hard"}
    ]

    return (
        <div>
            <div className="Start-box">
                <h1 className="sidebar-title"><span>Quiz</span> List</h1>
                <i className="em em-brain"></i>
                <form onSubmit={handleSubmit} className="Start-form">
                    <select value={value} onChange={handleChange}>
                        {gameDifficulty.map((dif, idx) => (
                            <option key={idx} value={dif.value}>{dif.label}</option>
                        ))}
                    </select>
                    <button>Submit!</button>
                </form>
            </div>
        </div>
    );
}

export default Start;