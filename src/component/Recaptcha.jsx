import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';

class Recaptcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      captchaHidden: 'block',
    };
  }
  render() {
    return (
      <Segment>
        <div style={{
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
        }}
        >
          <Header as="h3">We need to make sure you are a human.</Header>
          <ReCAPTCHA
            ref="recaptcha"
            sitekey="6Lex02wUAAAAAI6g5DnS3iIMMqhQSXReUINtVi94"
            onChange={this.props.onVerify}
          />
        </div>
      </Segment>
    );
  }
}
export default Recaptcha;
