import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';
import {
  Button,
  Container,
  Header,
  Icon,
  Modal,
  Segment,
} from 'semantic-ui-react'
import moment from 'moment';

class AgendaItemContainer extends Component {
    componentDidMount() {

        if(!this.props.id){
            // Kick off action to make async call to our server for tags/topics.
            // This will then get stored in our redux state.
            const { requestAgendas } = this.props;
            requestAgendas();
        }
    }

    render () {
        const {
            id,
            body,
            defaultOpen,
            meeting_time,
            recommendations,
            title,
        } = this.props;

        const meetingDate = () => {
            let meetTime = moment(meeting_time * 1000);
            return (
                <div>
                    <p>Hearing Date: {meetTime.format("M/D/YYYY")}</p>
                    <p>Hearing Time: {meetTime.format("h:mm a")}</p>
                </div>
            );
        }
        
        const container = (
            <Container text style={{ marginBottom: '10px' }}>
                <Segment.Group>
                    <Header
                        as='h3'
                        content={title}
                        textAlign='center'
                    />
                    <Segment>{meetingDate()}</Segment>
                    <Segment>{body[0]}</Segment>
                    <Segment>{body[1]}</Segment>
                </Segment.Group>
            </Container>);

        const recommendation = 
            recommendations[0] ? (
                <div>
                    <p>Recommendation:</p>
                    <p>{recommendations[0].recommendation}</p>
                    <p>What is your stance on the recommended action?</p>
                </div>
            ) : (
                <div>
                    <p>No recommended Action</p>
                </div>
            );

        return  (
            <Modal trigger={container} style={{ color: 'black'}} defaultOpen={defaultOpen}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {meetingDate()}
                        <p>{body[0]}</p>
                        <p>{body[1]}</p>
                        {recommendation}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>
                        Pro <Icon name='right chevron' />
                    </Button>
                    <Button primary>
                        Con <Icon name='right chevron' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        // agendaItems: state.agendas.agendaItems,
        // agendaIDs: state.agendas.agendaIDs,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ requestAgendas }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AgendaItemContainer)