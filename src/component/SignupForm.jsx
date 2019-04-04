import React, {Component} from 'react';
import {connect} from 'react-redux';

class Signup extends Component{ 
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="mc_embed_signup"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}
                >
                
                  <form
                    action="https://hackforla.us19.list-manage.com/subscribe/post?u=2885093b7df42c79d628f7267&amp;id=6ca892a88b"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    style={{
                      width: '100%'
                    }}
                    noValidate>
                    <div id="mc_embed_signup_scroll" className="mailChimpFormFeed">
                      <div className="indicates-required">
                        <span className="asterisk">*</span> indicates required
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">
                          Email Address <span className="asterisk">*</span>
                        </label>
                        <input
                          type="email"
                          name="EMAIL"
                          className="required email"
                          id="mce-EMAIL"
                        />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-FNAME">First Name </label>
                        <input
                          type="text"
                          name="FNAME"
                          className=""
                          id="mce-FNAME"
                        />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-LNAME">Last Name </label>
                        <input
                          type="text"
                          name="LNAME"
                          className=""
                          id="mce-LNAME"
                        />
                      </div>
                      <div className="mc-field-group input-group">
                        <strong>Email Format: </strong> {this.state.radio}
                        <ul>
                          <li>
                          <Radio 
                            label="HTML"
                            value="html"
                            name="EMAILTYPE"
                            checked={this.state.radio === 'HTML'}
                              onChange={(e)=>this.radioSelection(e)}
                              id="mce-EMAILTYPE-0"

                            />
                            {/* <input
                              type="radio"
                              value="html"
                              name="EMAILTYPE"
                              id="mce-EMAILTYPE-0"
                            />
                            <label htmlFor="mce-EMAILTYPE-0">html</label> */}
                          </li>
                          <li>
                          <Radio 
                            label="Plain-Text"
                            value="text"
                            name="EMAILTYPE"
                            checked={this.state.radio === 'Plain-text'}

                            onChange={(e)=>this.radioSelection(e)}
                            id="mce-EMAILTYPE-1"

                            />
                           
                          </li>
                        </ul>
                      </div>
                      <div id="mce-responses" className="clear">
                        <div
                          className="response"
                          id="mce-error-response"
                          style={{ display: 'none' }}
                        />
                        <div
                          className="response"
                          id="mce-success-response"
                          style={{ display: 'none' }}
                        />
                      </div>
                      {/*   <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                      <div
                        style={{ position: 'absolute', left: '-5000px' }}
                        aria-hidden="true">
                        <input
                          type="text"
                          name="b_2885093b7df42c79d628f7267_6ca892a88b"
                          tabI ndex="-1"
                          value=""
                        />
                      </div>
                      <div className="clear">
                        <Button 
                         type="submit"
                         value="Subscribe"
                         name="subscribe"
                         id="mc-embedded-subscribe"
                         onClick={()=>location.reload()}
                            style={{
                              marginTop:'15px'
                            }}
                         >Subscribe</Button>
                      </div>
                    </div>
                  </form>
                  </div>
        )
    }
}

export default connect(null, null)(Signup);