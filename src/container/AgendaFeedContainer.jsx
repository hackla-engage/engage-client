import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestAgendas } from '../ducks/agendas';
import {setPosition} from '../ducks/feedState'
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
  Section,
} from 'semantic-ui-react';
import { format } from 'date-fns';
import SignUpForm from '../component/MailChimpForm.jsx';
import './AgendaFeed.scss';

class AgendaFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: '',
      agendaResults: [],
      agendaIDs: [],
      agendaItems: {},
      
      pastIssues: 1,
    };
    this.addId = this.addId.bind(this);
    this.removeId = this.removeId.bind(this);
    this.getMoreAgendas = this.getMoreAgendas.bind(this);
    this.setPostion = this.setPostion.bind(this);
    this.throttler = Date.now();
  }
  static defaultProps = {
    agendaResults: [],
    agendaIDs: [],
    agendaItems: {},
  };
  componentDidCatch(err, info){
    console.error(err, info)
  }
  componentDidUpdate(prevProps, prevState) {
        //sets agenda props to state
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
      //If data is requested already requested then set new state
      (async () => {
        await this.setState(state => ({
          agendaIDs,
          agendaItems,
          agendaResults,
        }));
        await (() =>
          (document.querySelector(
            '#app'
          ).scrollTop = this.props.appPosition))();
      })();
    } else {
      //request data since it does not exist
      (async () => {
        await requestAgendas('agendas');
        await (() =>
          (document.querySelector(
            '#app'
          ).scrollTop = this.props.appPosition))();
      })();
    }

    document.querySelector('#app').addEventListener('scroll', this.setPostion)
  }
  componentWillUnmount(){
    document.querySelector('#app').removeEventListener('scroll', this.setPostion)
  }
  shouldComponentUpdate(nextProps, nextState){
    //Prevents scroll position from rerendering dom tree
    if (this.props.appPosition !== nextProps.appPosition){
      return false
    }
    return true
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

  setPostion(){
    //Throttles setting new scroll position
    if(this.throttler+1000 < Date.now() ){
      this.throttler = Date.now()
      this.props.setPosition(document.querySelector('#app').scrollTop)
    }
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
            <div
              style={{
                textAlign: 'center',
              }}>
              <div className="feed-noActiveContainer">
                <Header
                  className="feed-signUpHeader"
                  style={{ alignSelf: 'center', marginTop: '20px', marginBottom: '0px', }}>
                  There are no active issues available for public feedback at this time.
                </Header>
              </div>
              <Header size="large">
                Get notified when new issues are posted:
              </Header>
              <div className="feed-signUpContainer" >
                <div className="feed-signUp">
                  <Header size="large">Follow us!</Header>
                  <a
                    style={{ fontSize: '1.5rem' }}
                    href="https://twitter.com/EngageStaMonica "
                    target="_blank">
                    <Icon name="twitter" size="large" /> @EngageStaMonica
                  </a>
                </div>
                <div className="VR" />
                <div className="feed-signUp">
                  <Header size="large">
                    <Icon name="mail" /> Subscribe to our newsletter!
                  </Header>

                  <SignUpForm vertical maxWidth="440px" />
                </div>
              </div>
              <Divider
                style={{
                  marginTop: '80px',
                }}
              />{' '}
              <Header
                style={{
                  marginTop: '8rem',
                  textDecoration: 'underline',
                }}
                size="medium">
                BROWSE PAST ISSUES BELOW
              </Header>
            </div>
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
          <Grid style={{ margin: '70px' }} centered>
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
    appPosition: state.feedState.position,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ requestAgendas, agenda_item_received, setPosition }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AgendaFeed);
