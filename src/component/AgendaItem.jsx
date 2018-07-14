import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import format from "date-fns/format";

//I can just get the id from the param and use to to fetch from Application state's agenda agendaitems
//Now I just need to design a page and put informations on them
import { Button, Card, Container } from "semantic-ui-react";

class AgendaItem extends Component {
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

  render() {
    const agendaItem = this.props.agendaItems[this.props.match.params.id];

    const agendaTime = this.timeConverter(agendaItem.meeting_time);
    const agendaBody = agendaItem.body;
    console.log(agendaItem);
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
            {agendaBody.map((string, index) => {
              return <p key={index}>{string}</p>;
            })}
          </Card.Content>
          <Card.Content>
            <Card.Header>
              WHAT IS YOUR POSITION ON THE RECOMMENDED ACTION?
            </Card.Header>
            <div className="ui three buttons" style={{ padding: 24 }}>
              <Button basic color="green">
                Approve
              </Button>
              <Button basic color="red">
                Decline
              </Button>
              <Button basic color="black">
                Need More Info
              </Button>
            </div>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaItem);
