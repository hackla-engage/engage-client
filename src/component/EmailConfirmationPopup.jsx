
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';

class EmailConfirmationPopup extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    // TODO once form flow has been optimized reset form
    this.props.history.push("/feed/");
  }

  render() {
  
    return (
      <div>
        <div className="overlay">
          <div className="email-confirmation-container">
            <Header
              as="h2">Success!</Header>
            <p>Your feedback will be compiled into a report which we will send to the
               City Council in advance of the up coming meeting</p>
            <p className="please-confirm-email">Please Confirm Your Email Address</p>
            <p>We sent a confirmation link to your email to verify 
              you're a real person</p>
            <p>Your feedback will be submitted to the city even if you do not confirm
               your email address, but confirming your email address gives the city more
               confidence it is responding to a real person's need</p>
            <p><strong>Check Your Email for a Confirmation Link</strong></p>
            <Button
              style={{backgroundColor: '#192a56', color: "white"}}
              onClick={this.handleClose}
              content="Close and Return to Feed">          
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default EmailConfirmationPopup;