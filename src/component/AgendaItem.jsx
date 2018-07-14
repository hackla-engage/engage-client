import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import agenda_item_received from "../actions/Form";
import { bindActionCreators } from "redux";

//I can just get the id from the param and use to to fetch from Application state's agenda agendaitems
//Now I just need to design a page and put informations on them
import { Button, Card, Container } from "semantic-ui-react";

class AgendaItem extends Component {
  constructor() {
    super();

    this.recommendationReducer = this.recommendationReducer.bind(this);
    this.summaryReducer = this.summaryReducer.bind(this);
    this.showForm = this.showForm.bind(this);
    this.goToForm = this.goToForm.bind(this);
  }

  componentDidMount = () => {};

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = "0" + a.getHours();
    var min = "0" + a.getMinutes();
    var sec = "0" + a.getSeconds();
    var time =
      month +
      " " +
      date +
      ", " +
      year +
      " - " +
      hour.substr(-2) +
      ":" +
      min.substr(-2) +
      ":" +
      sec.substr(-2);
    return time;
  }

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

    const agendaTime = this.timeConverter(agendaItem.meeting_time);
    const agendaBody = agendaItem.body;
    const agendaRecommendation = agendaItem.recommendations[0].recommendation;

    const body = agendaBody.map((string, index) => {
      return <p key={index}>{string}</p>;
    });

    const recommendation = agendaRecommendation ? (
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

    return (
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
              <div>{agendaTime}</div>
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
          </Card.Content>
          <Card.Content style={{ textAlign: "center" }}>
            <Link to={`/feed`} style={{ color: "brown" }}>
              Return to Agenda Feed
            </Link>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const agendas = state.agendas;
  return {
    agendaItems: agendas.agendaItems
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ agenda_item_received }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AgendaItem);
