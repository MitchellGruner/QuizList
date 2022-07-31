import React, {Component} from 'react';
import './Start.css';
import './Quiz.css';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numQuestions: []
        }
    }

    handleSubmit (evt) {

    }

    render() {
        return (
            <div>
                <div className="Start-box">
                    <h1 className="sidebar-title"><span>Quiz</span> List</h1>
                    <i className="em em-brain"></i>
                    <form onSubmit={this.handleSubmit}>

                    </form>
                </div>
            </div>
        )
    }
}

export default Start;