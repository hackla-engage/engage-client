import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestAgendas } from '../ducks/agendas';
import agenda_item_received from '../actions/Form';
import AgendaItemContainer from './AgendaItemContainer.jsx';
import qs from 'query-string';
import { Button, Grid, Divider } from 'semantic-ui-react';
import { format } from 'date-fns';

class AgendaFeed extends Component {
  constructor(props) {
    super(props);
    this.addId = this.addId.bind(this);
    this.removeId = this.removeId.bind(this);
    this.getMoreAgendas = this.getMoreAgendas.bind(this);
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

  render() {
    const {
      agendaItems,
      agendaIDs,
      agendaLoading,
      agendaLoadError,
      agendaResults,
    } = this.props;

    if (agendaLoadError.error) {
      return (
        <div style={{ color: 'black' }}>Error: retrieving agenda items</div>
      );
    } else {
      return (
        <div style={{ color: 'black' }}>
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
