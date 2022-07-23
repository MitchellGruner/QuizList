import React, {Component} from 'react';
import './Question.css';

class Question extends Component {
    render() {
        return (
            <div className="Question">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={"heading" + this.props.id}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + this.props.id} aria-expanded="true" aria-controls={this.props.id}>
                                <div className="Question-individual">
                                    {this.props.text}
                                </div>
                            </button>
                        </h2>
                        <div id={this.props.id} className="accordion-collapse collapse" aria-labelledby={"heading" + this.props.id} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;