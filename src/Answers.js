import React, {Component} from 'react';
import './Answers.css';

class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answersArr: [],
            correctArr: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        let arr = [];

        for (let i = 0; i < this.props.incorrect.length; i++) {
            arr.push(this.props.incorrect[i]);
        }

        arr.push(this.props.correct);

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(arr);

        this.setState({
            answersArr: arr,
            correctArr: arr
        });
    }

    handleClick (arg) {
        if (this.state.correctArr.includes(arg)) {
            console.log("correct");
        } else {
            console.log("incorrect");
        }
    }

    render() {
        return (
            <div className="Answers">
                <div className="row flex-row">
                    <button onClick={() => this.handleClick(this.state.answersArr[0])} className="col-md-6">
                        {this.state.answersArr[0]}
                    </button>
                    <button onClick={() => this.handleClick(this.state.answersArr[1])} className="col-md-6">
                        {this.state.answersArr[1]}
                    </button>
                </div>
                <div className="row flex-row">
                    <button onClick={() => this.handleClick(this.state.answersArr[2])} className="col-md-6">
                        {this.state.answersArr[2]}
                    </button>
                    <button onClick={() => this.handleClick(this.state.answersArr[3])} className="col-md-6">
                        {this.state.answersArr[3]}
                    </button>
                </div>
            </div>
        )
    }
}

export default Answers;