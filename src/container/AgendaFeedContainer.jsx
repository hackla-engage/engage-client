import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestAgendas } from '../ducks/agendas';
import agenda_item_received from '../actions/Form';
import AgendaItemContainer from './AgendaItemContainer.jsx';
import qs from 'query-string';
import {
  Button,
  Grid,
  Divider,
  Container,
  Header,
  Radio,
  Icon,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import SignUp from '../component/MailChimpForm';
import './AgendaFeed.scss';

class AgendaFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: '',
      agendaResults: [],
      agendaIDs: [],
      agendaItems: {},
    };
    this.addId = this.addId.bind(this);
    this.removeId = this.removeId.bind(this);
    this.getMoreAgendas = this.getMoreAgendas.bind(this);
    this.radioSelection = this.radioSelection.bind(this);
  }
  static defaultProps = {
    agendaResults: [],
    agendaIDs: [],
    agendaItems: {},
  };
  componentDidUpdate(prevProps, prevState) {
    let { agendaItems, agendaIDs, agendaResults } = this.props;

    const prevRes = prevProps.agendaResults;
    if (
      agendaResults[agendaResults.length - 1] !== prevRes[prevRes.length - 1]
    ) {
      this.setState(state => ({
        agendaResults: [...agendaResults],
        agendaIDs: [...agendaIDs],
        agendaItems: { ...state.agendaItems, ...agendaItems },
      }));
    }
    // else if(prevRes[prevRes.length -1].id !== agendaResults[agendaResults.length -1].id){
    //   this.setState((state)=>({
    //     agendaResults: [...state.agendaResults, ...agendaResults]
    //   }))
    // }
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
    const {
      requestAgendas,
      agendaItems,
      agendaIDs,
      agendaResults,
    } = this.props;
    if (agendaResults[0]) {
      this.setState(state => ({
        agendaIDs,
        agendaItems,
        agendaResults,
      }));
    } else {
      requestAgendas('agendas');
    }
    document.querySelector('#app').scrollTop = 0;
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

  radioSelection(e) {
    let display;
    switch (e.target.value) {
      case 'html':
        display = 'HTML';
        break;
      case 'text':
        display = 'Plain-text';
        break;
      default:
        display = '';
    }
    this.setState({
      radio: display,
    });
  }

  render() {
    const { agendaLoading, agendaLoadError } = this.props;
    const { agendaItems, agendaIDs, agendaResults } = this.state;

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
                <a href="https://twitter.com/EngageStaMonica " target="_blank">
                  <Icon name="twitter" size="large" /> @EngageStaMonica
                </a>
                <p style={{ paddingTop: '15px' }}>
                  You can also get updates by subscribing to the Engage Santa
                  Monica email newsletter:
                </p>
                {/*********** MAIL CHIMP NEWSLETTER ************/}
                {/* <Divider/> */}
                <Header>
                  <Icon name="mail" /> Email Newsletter
                </Header>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <SignUp vertical maxWidth="470px" />
                </div>

                <Divider style={{}} />

                <Header
                  style={{
                    paddingTop: '70px',
                    textDecoration: 'underline',
                  }}
                  size="small">
                  BROWSE PAST ISSUES BELOW
                </Header>
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
          <Grid style={{ margin: '50px' }} centered>
            {agendaLoading ? (
              <Button loading basic color="black" />
            ) : (
              <Button
                onClick={this.getMoreAgendas}
                content="Load More Agendas"
                style={{ backgroundColor: '#192a56', color: 'white' }}
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
