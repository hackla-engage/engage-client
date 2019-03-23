import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { setHours, setMinutes } from 'date-fns';
import { Button, Card, Container, Loader, Header } from 'semantic-ui-react';
import format from 'date-fns/format';
import { agendaItemReceived } from '../actions/Form';
import { requestAgendas } from '../ducks/agendas';
// I can just get the id from the param and use to to fetch from Application state's agenda agendaitems
// Now I just need to design a page and put informations on them

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
    // map to get recommendation from object and reduce array to string concatenated with <br />s
    let background = false;
    let length = 0;
    const summaryArray = body
      .filter((v, i) => {
        if (v.toLowerCase().includes('background')) {
          background = true;
          return false;
        }
        if (background) {
          return false;
        }
        if (v.toLowerCase().includes('executive summary') || i >= 6) {
          return false;
        }
        if (length > 500) {
          return false;
        }
        length += v.length;
        return true;
      })
      .map((val, idx) => <p key={`summary-${idx}`}>{val}</p>);
    const recommendationsArray = recommendations.map((v, i) => (
      <p key={`recommendation-${i}`}>
        {i}. {v}
      </p>
    ));
    // slice and reduce array to string concatenated with <br />s
    // Configure form content
    this.props.agendaItemReceived({
      Committee: this.props.committee,
      Title: title,
      Recommendations: recommendationsArray,
      Summary: summaryArray,
      Id: id,
      AgendaItemId: agenda_item_id,
      Pro: proCon,
    });
    setTimeout(this.goToForm, 200);
  }

  render() {
    const agendaItem = this.props.agendaItems[this.props.match.params.id];
    const detailPageLink = agendaItem
      ? `http://santamonicacityca.iqm2.com/Citizens/Detail_LegiFile.aspx?Frame=&MeetingID=${
          agendaItem.id
        }&MediaPosition=&ID=${agendaItem.agenda_item_id}&CssClass=`
      : null;
    let agendaDate;
    let recommendation;
    let summaryArray;
    let showActions = false;

    if (agendaItem) {
      agendaDate = new Date(agendaItem.meeting_time * 1000);
      const meetTimeObj = setMinutes(setHours(agendaDate, 11), 59);
      if (new Date() < meetTimeObj) {
        showActions = true;
      }
      const { body } = agendaItem;
      let length = 0;
      let background = false;
      summaryArray = body
        .filter((v, i) => {
          if (v.toLowerCase().includes('background')) {
            background = true;
            return false;
          }
          if (background) {
            return false;
          }
          if (
            v.toLowerCase().includes('executive summary') ||
            v.toLowerCase().trim() === 'summary' ||
            i >= 6
          ) {
            return false;
          }
          if (length > 500) {
            return false;
          }
          length += v.length;
          return true;
        })
        .map((val, idx) => <p key={`summary-${idx}`}>{val}</p>);
      console.log(agendaItem);
      const agendaRecommendation = agendaItem.recommendations[0].recommendation;
      recommendation = agendaRecommendation ? (
        <div>
          {agendaRecommendation.map((string, index) => (
            <p key={index}>{string}</p>
          ))}
        </div>
      ) : (
        <div>
          <p>No recommended action has been proposed.</p>
        </div>
      );
    }
    const url = encodeURIComponent(location.href);
    return (
      <div>
        {agendaItem ? (
          <Container style={{ margin: 24, color: 'black' }}>
            <Card style={{ width: 'auto' }}>
              <Card.Content
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Card.Description
                  style={{
                    alignSelf: 'center',
                  }}>
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
                <Card.Header>EXECUTIVE SUMMARY</Card.Header>
                {summaryArray}
              </Card.Content>
              <Card.Content>
                <Card.Header>RECOMMENDED ACTION</Card.Header>
                {recommendation}
              </Card.Content>

              {showActions ? (
                <Card.Content>
                  <Card.Header>
                    WHAT IS YOUR POSITION ON THE RECOMMENDED ACTION?
                  </Card.Header>
                  <div className="ui three buttons" style={{ padding: 24 }}>
                    <Button
                      basic
                      color="green"
                      onClick={evt => {
                        this.showForm(1);
                      }}>
                      Agree
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={evt => {
                        this.showForm(0);
                      }}>
                      Disagree
                    </Button>
                    <Button
                      basic
                      color="black"
                      onClick={evt => {
                        this.showForm(2);
                      }}>
                      Need More Info
                    </Button>
                  </div>
                </Card.Content>
              ) : (
                <Card.Content>
                  <Card.Header>
                    >> Note: Commenting is closed for this issue.
                  </Card.Header>
                </Card.Content>
              )}
              <Card.Content style={{ textAlign: 'center' }}>
                <a
                  href={detailPageLink}
                  target="_blank"
                  style={{ color: 'brown' }}>
                  View More Details on the Council Page
                </a>
                <br />
                <Link to={'/feed'} style={{ color: 'brown' }}>
                  Return to Agenda Feed
                </Link>
              </Card.Content>
              <Card.Content textAlign="center">
                <Header as="h3">Share this Item</Header>
                <a className="fb-xfbml-parse-ignore" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${ url };src=sdkpreparse`}><Button circular color="facebook" icon="facebook"></Button></a>
                <a target="_blank"  className="twitter-share-button" href={ `https://twitter.com/intent/tweet?text=Check%20out%20this%20new%20agenda%20item%20from%20our%20local%20government!&via=EngageStaMonica&url=${ url }`}><Button circular color="twitter" icon="twitter"></Button></a>
                <a href={ `mailto:?subject=Check out this new agenda item from our city council&body=${ url }`}><Button circular color="grey" icon="mail"></Button></a>
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

const mapStateToProps = state => {
  const { agendas } = state;
  return {
    agendaItems: agendas.agendaItems,
    agendaLoading: agendas.agendaLoading,
    committee: agendas.committee,
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      agendaItemReceived,
      requestAgendas,
    },
    dispatch
  );
const AgendaItemComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaItem);
export default AgendaItemComponent;
