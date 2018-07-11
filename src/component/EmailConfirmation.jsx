import React, { Component } from "react";
import styles from './EmailConfirmation.scss';

class EmailConfirmation extends Component {
  render(){
    return(
      <div>
        <h1 id="heading">ENGAGE: Santa Monica, California </h1>
        <div className="box">
          <h2 className="emailbox"> Thank You </h2>
          <h4 className="emailbox"> Your email is confirmed and your post has been submitted </h4>
          <br></br>
        <a id="engagefeedlink"href="#"><h1> Go to the Engage Feed </h1></a>

        </div>
      </div>

    )
  }
}

export default EmailConfirmation;
