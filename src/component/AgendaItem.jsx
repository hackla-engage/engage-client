import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { setHours, setMinutes } from 'date-fns';
import {
  Button,
  Card,
  Container,
  Loader,
  Header,
  Image,
  Icon,
  Divider,
} from 'semantic-ui-react';
import format from 'date-fns/format';
import { agendaItemReceived } from '../actions/Form';
import { requestAgendas } from '../ducks/agendas';
import './AgendaItem.scss';
import { getJSON } from '../engage_client';
// I can just get the id from the param and use to to fetch from Application state's agenda agendaitems
// Now I just need to design a page and put informations on them

class AgendaItem extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.showForm = this.showForm.bind(this);
    this.goToForm = this.goToForm.bind(this);
  }

  goToForm() {
    this.props.history.push(`/feed/${this.state.id}/vote`);
  }

  showForm(proCon) {
    const agenda_item_id = this.state.id;
    const agenda = this.state.agendaItem;
    const { body, title } = agenda;
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
      Id: agenda_item_id,
      AgendaItemId: agenda_item_id,
      Pro: proCon,
    });
    setTimeout(this.goToForm, 200);
  }

  componentDidMount() {
    //screen position doesn't automatically reset, manual fix
    document.querySelector('#app').scrollTop = 0;
    const url = this.props.history.location.pathname.split('/');
    const id = url[url.length - 1];
    //Use agenda if stored in redux
    if (this.props.agendaItems && this.props.agendaItems[id]) {
      this.setState({
        agendaItem: this.props.agendaItems[id],
        id,
      });
    } else {
      //If no agendas are in redux then request them.
      getJSON(`agendas/item/${id}`).then(agendaData => {
        const currentUrl = window.location.href.split('/');
        const currentAgenda = currentUrl[currentUrl.length-1];
        //Don't update if canceled
        if(currentAgenda == id)this.setState(
          {
          agendaItem: { ...agendaData },
          id,
        });
      });
    }
  }

  render() {
    const agendaItem = this.state.agendaItem;
    const detailPageLink = agendaItem
      ? `http://santamonicacityca.iqm2.com/Citizens/Detail_LegiFile.aspx?Frame=&MeetingID=${
          agendaItem.id
        }&MediaPosition=&ID=${agendaItem.agenda_item_id}&CssClass=`
      : null;
    let agendaDate;
    let recommendation;
    let summaryArray;
    let showActions = false;
    let pdfIsGenerated = this.state.agendaItem && this.state.agendaItem.pdfLocation;

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
            <Link to="/feed">
              <Button animated basic color="black">
                <Button.Content hidden>
                  {/* icons fails proptype check but only way to get correct size */}
                  <Icon name="long arrow left" size />
                </Button.Content>
                <Button.Content visible> Back </Button.Content>
              </Button>
            </Link>
            <Card style={{ width: 'auto' }}>
              <Card.Content
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Card.Description
                  style={{
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                  }}>
                  {/* Date formatting consistency, but still is in user's local time zone :-( */}
                  <div>
                    <strong>Date:</strong> {format(agendaDate, 'MM/DD/YYYY')}
                  </div>
                  <div>
                    <strong>Time:</strong>{' '}
                    {format(agendaDate, 'hh:mm a', { locale: 'PST' })}
                  </div>
                  <div>
                    <strong>Department:</strong> {agendaItem.department}
                  </div>
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
              {/* what to vote on */}
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
                //no longer able to vote
                <Card.Content>
                  <Card.Header style={{}}>
                    {pdfIsGenerated ? (
                      //if pdf is generated
                      <div
                        className="commentingClosed"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignContent: 'center',
                        }}>
                        <div>>> </div>
                        <div
                          style={{
                            display: 'relative',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent:'center'
                          }}>
                          <div>
                            <div>
                              Note: Commenting is closed for this issue.{' '}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                
                              }}>
                              View results of public feedback for this issue by
                              downloading this Report PDF:
                            </div>{' '}
                          </div>
                          <a
                            style={{
                              position: 'relative',
                              minWidth: '70px',
                              height: '70px',
                              alignSelf:'center'
                            }}
                            target="_blank"
                            href={`https://backend.engage.town${this.state.agendaItem.pdfLocation}`}
                            >
                            <Image
                              src="/static/image/pdf-icon.png"
                              style={{
                                justifyContent:'center',
                                position: 'relative',
                                width: '60px',
                              height: '60px'
                              }}
                            />
                          </a>
                        </div>
                      </div>
                    ) : (
                      //if pdf hasn't been generated
                      <div
                        className="commentingClosed"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}>
                        <div>>> </div>
                        <div
                          style={{
                            display: 'relative',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          <div>
                            <div>
                              Note: Commenting is closed for this issue.{' '}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                              }}>
                              Results of public feedback are being assembled
                              into a report which will be available here
                              Shortly.
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                    )}
                  </Card.Header>
                </Card.Content>
              )}
              <Card.Content
                id="agendaItemLinks"
                style={{
                  position: 'relative',
                  display: 'flex',
                }}>
                <div className="agendaItemLink1">
                  <a
                    href={detailPageLink}
                    target="_blank"
                    style={{ color: '' }}>
                    View More Details
                  </a>
                </div>
                <div className="agendaItemLink2">
                  <Link to={'/feed'}>Return to Feed</Link>
                </div>
              </Card.Content>
              <Card.Content textAlign="center">
                <Header as="h3">Share this Item</Header>
                <a
                  className="fb-xfbml-parse-ignore"
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url};src=sdkpreparse`}>
                  <Button circular color="facebook" icon="facebook" />
                </a>
                <a
                  target="_blank"
                  className="twitter-share-button"
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20new%20agenda%20item%20from%20our%20local%20government!&via=EngageStaMonica&url=${url}`}>
                  <Button circular color="twitter" icon="twitter" />
                </a>
                <a
                  href={`mailto:?subject=Check out this new agenda item from our city council&body=${url}`}>
                  <Button circular color="grey" icon="mail" />
                </a>
              </Card.Content>
            </Card>
          </Container>
        ) : (
          <Container style={{ height: '95vh' }}>
            <Loader
              active
              inline="centered"
              style={{ color: 'black', top: '40%' }}>
              Loading agenda...
            </Loader>
          </Container>
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
