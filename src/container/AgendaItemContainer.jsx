import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import qs from 'query-string';
import {
  Button,
  Card,
  Container,
  Divider,
  Icon,
  Modal,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
    } = this.props;

    const meetTime = new Date(meeting_time * 1000);

    return (
      <Container text style={{ margin: '2%' }}>
        <Card style={{ width: 'auto' }}>
          <Card.Content
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Card.Description
              style={{
                alignSelf: 'flex-end',
              }}>
              <div>Meeting Date</div>
              <div>{format(meetTime, 'M/D/YYYY')}</div>
              <div>{format(meetTime, 'h:mm a')}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Link to={`/feed/${id}`}>
              <Card.Header style={{ color: 'black', fontSize: 24 }}>
                {title}
              </Card.Header>
            </Link>
          </Card.Content>
          <Card.Content>
            <Link to={`/feed/${id}`}>
              <Button
                fluid
                style={{ backgroundColor: '#192a56', color: 'white' }}>
                <Icon name="list layout" />
                View Item Details
              </Button>
            </Link>
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
