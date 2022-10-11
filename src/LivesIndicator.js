import React, { Component } from "react";
import "./LivesIndicator";

class LivesIndicatorFive extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="LivesIndicator-container">
				<span className="LivesIndicator-header">
					{this.props.lives}
				</span>
			</div>
		);
	}
}

export default LivesIndicatorFive;
