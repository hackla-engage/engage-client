import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import format from "date-fns/format";
import qs from "query-string";
import {
  Button,
  Card,
  Container,
  Divider,
  Icon,
  Modal
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { requestAgendas } from "../ducks/agendas";

class AgendaItemContainer extends Component {
  render() {
    const {
      addId,
      id,
      body,
      defaultOpen,
      location,
      meeting_time,
      recommendations,
      removeId,
      title,
      showForm
    } = this.props;

    const meetTime = new Date(meeting_time * 1000);

    const container = (
      <Modal
        closeIcon
        defaultOpen={defaultOpen}
        onOpen={() => {
          addId(id);
        }}
        onClose={removeId}
        trigger={container}
        style={{ color: "black" }}
      >
        <Modal.Content
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              marginTop: "2rem"
            }}
          >
            <div>Meeting Date</div>
            {/* <div>{meetTime.format("M/D/YYYY")}</div> */}
            {/* <div>{meetTime.format("h:mm a")}</div> */}
            <div>{format(meetTime, "M/D/YYYY")}</div>
            <div>{format(meetTime, "h:mm a")}</div>
          </div>
        </Modal.Content>
        <Divider />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          {summary}
          {recommendation}
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            style={{ backgroundColor: "#8CB474", color: "white" }}
            onClick={evt => {
              showForm("pro");
            }}
          >
            Pro <Icon name="right chevron" />
          </Button>
          <Button
            primary
            style={{ backgroundColor: "#e74c3c", color: "white" }}
            onClick={evt => {
              showForm("con");
            }}
          >
            Con <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );

    const summary =
      body.length > 0 ? (
        <div
          style={{
            marginBottom: "10px"
          }}
        >
          <p>{body[0]}</p>
          <p>{body[1]}</p>
        </div>
      ) : (
        <div
          style={{
            marginBottom: "10px"
          }}
        >
          <p>There is no summary for this agenda.</p>
        </div>
      );

    const recommendation = recommendations[0] ? (
      <div
        style={{
          marginBottom: "10px"
        }}
      >
        <h5>Recommendation:</h5>
        <p>{recommendations[0].recommendation}</p>
        <h5>What is your stance on the recommended action?</h5>
      </div>
    ) : (
      <div
        style={{
          marginBottom: "10px"
        }}
      >
        <p>No recommended action has been proposed.</p>
      </div>
    );

    return (
      <Container text style={{ margin: "2%" }}>
        <Card style={{ width: "auto" }}>
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Card.Description
              style={{
                alignSelf: "flex-end"
              }}
            >
              <div>Meeting Date</div>
              <div>{format(meetTime, "M/D/YYYY")}</div>
              <div>{format(meetTime, "h:mm a")}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Button
              fluid
              style={{ backgroundColor: "#192a56", color: "white" }}
            >
              <Link to={`/feed/${id}`}>
                <Icon name="list layout" />View Item
              </Link>
            </Button>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ requestAgendas }, dispatch);
}

export default connect(
  undefined,
  matchDispatchToProps
)(AgendaItemContainer);
