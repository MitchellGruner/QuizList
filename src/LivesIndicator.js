import React, {Component} from 'react';

class LivesIndicatorFive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.calculateBoom = this.calculateBoom.bind(this);
    }

    calculateBoom() {
        let lives = 5 - this.props.lives;
        for (let i = 0; i < lives; i++) {
            return "em em-boom";
        }
    }

    render() {
        return (
            <div className="LivesIndicator-container">
                <i className={this.calculateBoom()}></i>
            </div>
        )
    }
}

export default LivesIndicatorFive;