import React, { Component } from 'react';

class Sign_in extends Component {
  constructor(props) {
    super(props);
    this.width = '25%';
    if (/Mobi/.test(navigator.userAgent)) {
      this.width = '100%';
    }
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div
          className="column"
          style={{
            width: this.width,
            minWidth: '400px',
            margin: '50px 0 50px 0',
          }}>
          <h2 className="ui teal image header">
            <img src="/static/image/meetup.png" className="image" />
            <div className="content">Log-in to your account</div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="ui fluid large teal submit button">Login</div>
            </div>

            <div className="ui error message" />
          </form>

          <div className="ui message">
            New to us? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Sign_in;
