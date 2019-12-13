
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Message,
} from 'semantic-ui-react';

class App extends Component {
  constructor(props){
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    evt.preventDefault();
    // TODO once form flow has been optimized reset form
    this.props.history.push("/feed/");
  }
  
  render() {
    let pleaseConfirmEmail =  { 
      color: "red",
      fontWeight: 600,
      fontSize: 20
    };
    
    let emailConfirmationContainer = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "75vw",
      height: "auto",
      minWidth: "200px",
      maxWidth: "450px",
      textAlign: "center",
      backgroundColor: "white",
      padding: "15px",
      whiteSpace: "normal",
      marginRight: "-50%",
      paddingBottom: "50px",
      borderRadius: "5px"
    };
    
   let backScreen = {
     width: "100vw",
     height: "100vh",
     position: "fixed",
     backgroundColor: "rgba(54, 54, 54, 0.48)",
     top: "0px",
     left: "0px",
     right: "0px",
     bottom: "0px",
     margin: "0px",
     padding: "0px",
     overflowY: "auto",
     zIndex: 5
   };
  
    return (
      <div>
        <div style={backScreen}>
          <Container style={emailConfirmationContainer}>
            <Header
              as="h2">Success!</Header>
            <p>Your feedback will be compiled into a report which we will send to the
               City Council in advance of the up coming meeting</p>
            <p style={pleaseConfirmEmail}>Please Confirm Your Email Address</p>
            <p>We sent a confirmation link to your email to verify 
              you're a real person</p>
            <p>Your feedback will be submitted to the city even if you do not confirm
               your email address, but confirming your email address gives the city more
               confidence it is responding to a real person's need</p>
            <p>Check Your Email for a Confirmation Link</p>
            <Button
              size="huge"
              className="close-button"
              onClick={this.handleClose}
              content="Close and Return to Feed">          
            </Button>
          </Container>
        </div>
      </div>
    )
  }
}

export default EmailConfirmationPopup;