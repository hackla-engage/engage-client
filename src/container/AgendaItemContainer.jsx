import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import qs from 'query-string';
import {
  Button,
  Card,
  Container,
  Divider,
  Header,
  Icon,
  Modal,
  Segment
} from 'semantic-ui-react';
import { requestAgendas } from '../ducks/agendas';

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

    const meetingDate = () => {
      let meetTime = moment(meeting_time * 1000);
      return <div style={{ marginBottom: "2%" }}>
          <div
            style={{
              width: "70%",
              float: "left",
              padding: "1%"
            }}
          >
            <p style={{ margin: "0" }}>Hearing Date: {meetTime.format("M/D/YYYY")}</p>
            <p>Hearing Time: {meetTime.format("h:mm a")}</p>
          </div>
          <div
            style={{
              width: "30%",
              float: "left",
              padding: "1%",
              textAlign: "center"
            }}
          >
            <Icon name="add to calendar" />
            <h4 style={{ margin: "0" }}>Add to Calendar</h4>
          </div>
        </div>;
    };

    const container = (
      <Container
        text
        style={{ margin: "2%" }}
      >
        <Card style={{ width: "auto" }}>
          <Card.Content>
            {meetingDate()}
          </Card.Content>
          <Card.Content>
            <h3
              style={{
                textDecoration: "underline"
              }}
            >
              {title}
            </h3>
            {body[0]}
            {body[1]}
          </Card.Content>
          <Divider />
          <div
            style={{
              textAlign: "center",
              marginBottom: "2%"
            }}
          >
            <Button
              inverted
              color="blue"
              style={{
                width: "40%",
                marginRight: "5%"
              }}
            >
              <Icon name="list layout"/>View Item
            </Button>
            <Button
              style={{
                width: "40%",
                marginLeft: "5%"
              }}
            >
              <Icon name="share alternate"/>Share
            </Button>
            </div>
        </Card>
      </Container>
    );

    const recommendation = recommendations[0] ? (
      <div>
        <h5>Recommendation:</h5>
        <p>{recommendations[0].recommendation}</p>
        <h5>What is your stance on the recommended action?</h5>
      </div>
    ) : (
      <div>
        <p>No recommended Action</p>
      </div>
    );

    return (
      <Modal
        closeIcon
        defaultOpen={defaultOpen}
        onOpen={() => { addId(id); }}
        onClose={removeId}
        trigger={container}
        style={{ color: "black" }}
      >
        <div
          style={{
            padding: "2%",
            paddingBottom: "3%"
          }}
        >
          {meetingDate()}
        </div>
        <Divider />
        <Modal.Content>
          <h3 style={{ textDecoration: "underline" }}>{title}</h3>
          <p>{body[0]}</p>
          <p>{body[1]}</p>
          {recommendation}
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            onClick={evt => { showForm("pro"); }}
          >
            Pro <Icon name="right chevron" />
          </Button>
          <Button
            primary
            onClick={evt => { showForm("con"); }}
          >
            Con <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    // agendaItems: state.agendas.agendaItems,
    // agendaIDs: state.agendas.agendaIDs,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ requestAgendas }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(
  AgendaItemContainer
);
