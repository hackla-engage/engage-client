import React, { Component } from 'react';
import { Button, Image, Container } from 'semantic-ui-react';
import './PositionForm.scss';

class PositionFormFinalStep extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(evt) {
    evt.preventDefault();
    this.props.returnToItem(this.props.Id);
    // TODO Once form flow is optimized, clear form when user clicks close
  }

  render() {
    return (
      <Container className="box" textAlign="center">
        <h2 className="top-heading heading">
          Final Step: Confirm Email Address
        </h2>
        <h2 className="agenda-item-heading heading">
          AGENDA ITEM #{this.props.Id}
        </h2>
        <div className="email-box">
          <Image src="/static/image/email-icon.png" className="email-icon" />
          <h2 className="check-heading heading">
            Check Your Email for A Confirmation Link
          </h2>
          <div className="what-text">
            <div className="what-heading heading"> What does this mean?</div>
            We sent a confirmation link to your email to verify ownership.
            <br />
            Click on this link to verify your email and complete your
            submission.
          </div>
          <div className="what-text" style={{ marginTop: '15px' }}>
            <h4 className="what-heading heading">
              We would love your feedback
            </h4>
            <p>
              We would love to hear your opinion on the process of submitting a
              comment.
              <br />
              To complete the survey click{' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc6eyRS-XWYIBrJKoxhupC_IA5iU9DqedBljfW2gfJw9ZcYag/viewform"
                target="_blank">
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div>
          <Button
            size="huge"
            className="close-button"
            onClick={this.handleClose}>
            CLOSE
          </Button>
        </div>
      </Container>
    );
  }
}

export default PositionFormFinalStep;
