import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import agenda_item_received from "../actions/Form";
import { requestAgendas } from "../ducks/agendas";
import { bindActionCreators } from "redux";
import { setHours, setMinutes } from 'date-fns';
import format from "date-fns/format";
//I can just get the id from the param and use to to fetch from Application state's agenda agendaitems
//Now I just need to design a page and put informations on them
import { Button, Card, Container, Loader } from "semantic-ui-react";

class AgendaItem extends Component {
  constructor() {
    super();

    this.recommendationReducer = this.recommendationReducer.bind(this);
    this.summaryReducer = this.summaryReducer.bind(this);
    this.showForm = this.showForm.bind(this);
    this.goToForm = this.goToForm.bind(this);
  }

  componentWillMount = () => {
    let { requestAgendas } = this.props;

    if (Object.keys(this.props.agendaItems).length < 2) {
      requestAgendas("agendas");
    }
  };

  recommendationReducer = (acc, curr) => {
    return acc + "<br />" + curr;
  };

  summaryReducer = (acc, curr) => {
    if (!this.gotBackground) {
      if (acc.toLowerCase().includes("summary")) {
        return curr;
      } else if (curr.toLowerCase().includes("background")) {
        this.gotBackground = true;
        return acc;
      } else {
        return acc + "<br />" + curr;
      }
    } else {
      return acc;
    }
  };

  showForm(proCon) {
    const id = this.props.match.params.id;
    const agenda = this.props.agendaItems[id];
    const body = agenda.body;
    const recommendations = agenda.recommendations[0].recommendation;
    const title = agenda.title;

    let recommendationsString = "";
    // map to get recommendation from object and reduce array to string concatenated with <br />s
    if (recommendations.length > 0) {
      recommendationsString = recommendations
        .map(rec => {
          return rec;
        })
        .reduce(this.recommendationReducer);
    }

    let summaryString = "";
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
      Pro: proCon === "pro"
    });
    setTimeout(this.goToForm, 200);
  }

  goToForm() {
    this.props.history.push("/form");
  }

  render() {
    const agendaItem = this.props.agendaItems[this.props.match.params.id];
    let agendaDate, body, recommendation;
    let showActions = false;
        
    if (agendaItem) {
      agendaDate = new Date(agendaItem.meeting_time * 1000);
      const meetTimeObj = setMinutes(setHours(agendaDate, 11),59);
      if (new Date() < meetTimeObj) {
        showActions = true;
      }

      const offset = agendaDate.getTimezoneOffset();      
      const agendaBody = agendaItem.body;
      const agendaRecommendation = agendaItem.recommendations[0].recommendation;

      body = agendaBody.map((string, index) => {
        return <p key={index}>{string}</p>;
      });

      recommendation = agendaRecommendation ? (
        <div>
          {agendaRecommendation.map((string, index) => {
            return <p key={index}>{string}</p>;
          })}
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
          <Container style={{ margin: 24, color: "black" }}>
            <Card style={{ width: "auto" }}>
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Card.Description
                  style={{
                    alignSelf: "center"
                  }}
                >
                  {/* Date formatting consistency, but still is in user's local time zone :-( */}
                    <div>{format(agendaDate, "MM/DD/YYYY")}</div>
                    <div>{format(agendaDate, "hh:mm a", {locale: "PST"})}</div>
                  <div>{agendaItem.department}</div>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Header>{agendaItem.title}</Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Header>BODY:</Card.Header>
                {body}
              </Card.Content>
              <Card.Content>
                <Card.Header>RECOMMENDED ACTION:</Card.Header>
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
                      onClick={evt => {
                        this.showForm("pro");
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={evt => {
                        this.showForm("con");
                      }}
                    >
                      Decline
                    </Button>
                    <Button basic color="black">
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
              <Card.Content style={{ textAlign: "center" }}>
                <Link to={`/feed`} style={{ color: "brown" }}>
                  Return to Agenda Feed
                </Link>
              </Card.Content>
            </Card>
          </Container>
        ) : (
          <Loader active inline="centered" style={{ color: "black" }}>
            Loading agenda...
          </Loader>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const agendas = state.agendas;
  return {
    agendaItems: agendas.agendaItems,
    agendaLoading: agendas.agendaLoading
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ agenda_item_received, requestAgendas }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AgendaItem);
