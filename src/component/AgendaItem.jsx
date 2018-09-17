import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { setHours, setMinutes } from 'date-fns';
import { Button, Card, Container, Loader } from 'semantic-ui-react';
import format from 'date-fns/format';
import { agendaItemReceived } from '../actions/Form';
import { requestAgendas } from '../ducks/agendas';
// I can just get the id from the param and use to to fetch from Application state's agenda agendaitems
// Now I just need to design a page and put informations on them

const recommendationReducer = (acc, curr) => `${acc}<br />${curr}`;
const summaryReducer = (acc, curr) => [acc, <br/>, curr];

const bodyIdx = (body, length) => {
  let acc = 0;
  let accIdx = 0;
  for (; acc < length; acc += body[accIdx].length) {
    if (body[accIdx].toLowerCase().includes('discussion')) {
      break;
    }
    accIdx += 1;
  }
  return accIdx;
};

class AgendaItem extends Component {
  constructor() {
    super();
    this.showForm = this.showForm.bind(this);
    this.goToForm = this.goToForm.bind(this);
  }

  componentWillMount() {
    if (Object.keys(this.props.agendaItems).length < 2) {
      this.props.requestAgendas('agendas');
    }
  }

  goToForm() {
    this.props.history.push('/form');
  }


  showForm(proCon) {
    const { id } = this.props.match.params;
    const agenda = this.props.agendaItems[id];
    const { body, title, agenda_item_id } = agenda;
    const recommendations = agenda.recommendations[0].recommendation;
    let recommendationsString = '';
    // map to get recommendation from object and reduce array to string concatenated with <br />s
    if (recommendations.length > 0) {
      recommendationsString = recommendations
        .map(rec => rec)
        .reduce(recommendationReducer);
    }

    // slice and reduce array to string concatenated with <br />s
    const idx = bodyIdx(body, 1000);
    const summaryString = body.slice(1, idx).reduce(summaryReducer);

    // Configure form content
    this.props.agendaItemReceived({
      Committee: this.props.committee,
      Title: title,
      Recommendations: recommendationsString,
      Summary: summaryString,
      Id: id,
      AgendaItemId: agenda_item_id,
      Pro: proCon,
    });
    setTimeout(this.goToForm, 200);
  }

  render() {
    const agendaItem = this.props.agendaItems[this.props.match.params.id];
    let agendaDate;
    let recommendation;
    let showActions = false;
    let bodyString;
    if (agendaItem) {
      const idx = bodyIdx(agendaItem.body, 1000);
      bodyString = agendaItem.body.slice(1, idx).reduce(summaryReducer);
      agendaDate = new Date(agendaItem.meeting_time * 1000);
      const meetTimeObj = setMinutes(setHours(agendaDate, 11), 59);
      if (new Date() < meetTimeObj) {
        showActions = true;
      }
      const agendaRecommendation = agendaItem.recommendations[0].recommendation;

      recommendation = agendaRecommendation ? (
        <div>
          {agendaRecommendation.map((string, index) => <p key={index}>{string}</p>)}
        </div>
      ) : (
        <div>
          <p>No recommended action has been proposed.</p>
        </div>
      );
    }

    return (
      <div>
        {agendaItem ? (
          <Container style={{ margin: 24, color: 'black' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Content
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card.Description
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {/* Date formatting consistency, but still is in user's local time zone :-( */}
                  <div>{format(agendaDate, 'MM/DD/YYYY')}</div>
                  <div>{format(agendaDate, 'hh:mm a', { locale: 'PST' })}</div>
                  <div>{agendaItem.department}</div>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Header>{agendaItem.title}</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Header>Executive Summary</Card.Header>
                {bodyString}
              </Card.Content>
              <Card.Content>
                <Card.Header>RECOMMENDED ACTION</Card.Header>
                {recommendation}
              </Card.Content>

              {showActions ?
                <Card.Content>
                  <Card.Header>
                    WHAT IS YOUR POSITION ON THE RECOMMENDED ACTION?
                  </Card.Header>
                  <div className="ui three buttons" style={{ padding: 24 }}>
                    <Button
                      basic
                      color="green"
                      onClick={(evt) => {
                        this.showForm(1);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={(evt) => {
                        this.showForm(0);
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      basic
                      color=
                        "black"
                      onClick={(evt) => {
                        this.showForm(2);
                      }}
                    >
                      Need More Info
                    </Button>
                  </div>
                </Card.Content> :
                <Card.Content>
                  <Card.Header>
                    >> Note: Commenting is closed for this issue.
                  </Card.Header>
                </Card.Content>
              }
              <Card.Content style={{ textAlign: 'center' }}>
                <Link to={'/feed'} style={{ color: 'brown' }}>
                  Return to Agenda Feed
                </Link>
              </Card.Content>
            </Card>
          </Container>
        ) : (
          <Loader active inline="centered" style={{ color: 'black' }}>
              Loading agenda...
          </Loader>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { agendas } = state;
  return {
    agendaItems: agendas.agendaItems,
    agendaLoading: agendas.agendaLoading,
    committee: agendas.committee,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    agendaItemReceived, requestAgendas,
  },
  dispatch,
);
const AgendaItemComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgendaItem);
export default AgendaItemComponent;
