import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestAgendas } from '../ducks/agendas';
import agenda_item_received from '../actions/Form';
import AgendaItemContainer from './AgendaItemContainer.jsx';
import qs from 'query-string';
import { Button, Grid, Divider, Container, Header, Radio, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import './AgendaFeed.scss';

class AgendaFeed extends Component {
  constructor(props) {
    super(props);
    this.state={
      radio: ''
    }
    this.addId = this.addId.bind(this);
    this.removeId = this.removeId.bind(this);
    this.getMoreAgendas = this.getMoreAgendas.bind(this);
    this.radioSelection = this.radioSelection.bind(this);
    this.emailInput = this.emailInput.bind(this);
  }

  componentDidMount() {
    // Kick off action to make async call to our server for tags/topics.
    // This will then get stored in our redux state.
    gtag('config', 'UA-116538234-1', {
      page_title: 'feed',
      page_path: '/feed',
    });
    const parsed = qs.parse(this.props.location.search);
    if (parsed && parsed.id) {
      this.requestedID = parseInt(parsed.id);
    }

    const { requestAgendas } = this.props;
    requestAgendas('agendas');
    document.querySelector('#app').scrollTop = 0

  }

  addId(id) {
    const parsed = qs.parse(this.props.location.search);
    parsed['id'] = id;
    this.props.history.push('/feed?' + qs.stringify(parsed));
  }

  removeId() {
    const parsed = qs.parse(this.props.location.search);
    delete parsed.id;
    this.props.history.push('/feed?' + qs.stringify(parsed));
  }
  recommendationReducer = (acc, curr) => {
    return acc + '<br />' + curr;
  };

  summaryReducer = (acc, curr) => {
    if (!this.gotBackground) {
      if (acc.toLowerCase().includes('summary')) {
        return curr;
      } else if (curr.toLowerCase().includes('background')) {
        this.gotBackground = true;
        return acc;
      } else {
        return acc + '<br />' + curr;
      }
    } else {
      return acc;
    }
  };
  showForm(proCon) {
    // this.requestedID is only useful at loading lifecycle event not afterward
    const parsed = qs.parse(this.props.location.search);
    if (parsed && parsed.id) {
      const {
        id,
        body,
        meeting_time,
        recommendations,
        title,
      } = this.props.agendaItems[parsed.id];
      let recommendationsString = '';
      // map to get recommendation from object and reduce array to string concatenated with <br />s
      if (recommendations.length > 0) {
        recommendationsString = recommendations
          .map(rec => {
            return rec.recommendation;
          })
          .reduce(this.recommendationReducer);
      }
      let summaryString = '';
      // slice and reduce array to string concatenated with <br />s
      if (body.length > 0) {
        summaryString = body.slice(0, 4).reduce(this.summaryReducer);
      }
      // Configure form content
      this.props.agenda_item_received({
        Title: title,
        Recommendations: recommendationsString,
        Summary: summaryString,
        Id: id,
        Pro: proCon === 'pro',
        Time: meeting_time,
      });
      setTimeout(this.goToForm, 200);
    }
  }
  goToForm() {
    this.props.history.push('/form'); // already set up!
  }

  getMoreAgendas() {
    const { requestAgendas } = this.props;
    requestAgendas(this.props.nextAgendaURL);
  }

  radioSelection(e){
    console.log(e.target.value)
    let display;
    switch(e.target.value){
      case 'html':
        display = 'HTML'
        break;
      case 'text':
        display = 'Plain-text'
        break;
      default:
        display = ''
    }
    console.log(display)
    this.setState({
      radio: display
    })
  }
  emailInput(e){
    const stateObj = {
      [e.target.name]: e.target.value
    }
    console.log(stateObj)
  }
  render() {
    const {
      agendaItems,
      agendaIDs,
      agendaLoading,
      agendaLoadError,
      agendaResults,
    } = this.props;
    //checks if async data has loaded
    const recentAgendaData =
      agendaItems &&
      agendaItems[agendaIDs[0]] &&
      agendaItems[agendaIDs[0]]['meeting_time'];

    if (agendaLoadError.error) {
      return (
        <div style={{ color: 'black' }}>Error: retrieving agenda items</div>
      );
    } else {
      return (
        <div style={{ color: 'black' }}>
          {//compares most recent item to today
          recentAgendaData < Math.floor(Date.now() / 1000) ? (
            <Container text>
              <div
                style={{
                  textAlign: 'center',
                  paddingTop: '2rem',
                }}>
                <Header size="medium">
                  There are no active issues available for public feedback at
                  this time.
                </Header>
                
                <p>
                  To be notified when issues become available for public
                  feedback, follow us on Twitter:
                </p>
                <a href="https://twitter.com/EngageStaMonica "
                target="_blank"
                >
                <Icon name="twitter" size="large" />  @EngageStaMonica
                </a>
                <p
                  style={{paddingTop: '15px'}}
                >
                  You can also get updates by subscribing to the Engage Santa
                  Monica email newsletter:
                </p>
                      {/*********** MAIL CHIMP NEWSLETTER ************/}
                {/* <Divider/> */}
                <Header><Icon name="mail"/> Email Newsletter</Header>
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
                <script
                  type="text/javascript"
                  src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
                />
                <script type="text/javascript">
                  (function($)window.fnames = new Array(); window.ftypes = new
                  Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';(jQuery));var
                  $mcj = jQuery.noConflict(true);
                </script>
                <Divider
                style={{
                }}
                ></Divider>

                <Header 
                style={{
                  paddingTop: '70px',
                  textDecoration: 'underline'
                }}
                size='small'>BROWSE PAST ISSUES BELOW</Header>

              </div>
                          {/*********** MAIL CHIMP NEWSLETTER END ************/}
            </Container>
          ) : (
            <div />
          )}

          {agendaResults.map((time, index) => {
            let meetingDate = format(
              time.meeting_time * 1000,
              'MMMM Do YYYY, h:mm a'
            );
            return (
              <div key={index}>
                <div
                  className="ui text container"
                  style={{ margin: '85px 0 25px' }}>
                  <h2>{meetingDate}</h2>
                  <Divider />
                </div>

                {agendaIDs.map((agendaID, i) => {
                  let agenda = agendaItems[agendaID];
                  let itemMeetingDate = format(
                    agenda.meeting_time * 1000,
                    'MMMM Do YYYY, h:mm a'
                  );
                  if (itemMeetingDate === meetingDate) {
                    return (
                      <AgendaItemContainer
                        key={agenda.id}
                        addId={this.addId}
                        {...agenda}
                        defaultOpen={agenda.id === this.requestedID}
                        removeId={this.removeId}
                        searchParams={this.props.location.search}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
          <Grid style={{ margin: '6px' }} centered>
            {agendaLoading ? (
              <Button loading primary />
            ) : (
              <Button
                onClick={this.getMoreAgendas}
                content="Load More"
                primary
              />
            )}
          </Grid>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const agendas = state.agendas;
  return {
    agendaItems: agendas.agendaItems,
    agendaIDs: agendas.agendaIDs,
    agendaResults: agendas.agendaResults,
    agendaLoading: agendas.agendaLoading,
    agendaLoadError: agendas.agendaLoadError,
    nextAgendaURL: agendas.next,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ requestAgendas, agenda_item_received }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AgendaFeed);
