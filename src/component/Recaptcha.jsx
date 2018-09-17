import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
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
    if (this.props.display) {
      return (
        <Segment>
          <div style={{
            position: 'relative',
            display: this.props.firstName !== '' ? 'flex' : 'none',
            minHeight: '63vh',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
          }}
          >
            <ReCAPTCHA
              ref="recaptcha"
              sitekey="6Lex02wUAAAAAI6g5DnS3iIMMqhQSXReUINtVi94"
              onChange={this.props.onVerify}
            />
          </div>
        </Segment>
      );
    }
    return <div></div>;
  }
}
export default Recaptcha;
