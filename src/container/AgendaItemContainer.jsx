import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';
import {
  Container,
  Header,
  Segment,
} from 'semantic-ui-react'

import {
  Button,
  Icon,
  Image,
  Modal
} from 'semantic-ui-react'

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
            meeting_time,
            recommendations,
            title,
        } = this.props;

        const container = (<Container text>

            <Segment.Group>
                <Header
                    as='h3'
                    content={title}
                    textAlign='center'
                />
                <Segment>{title}</Segment>
                <Segment>{body[0]}</Segment>
                <Segment>{body[1]}</Segment>
            </Segment.Group>
        </Container>);

        return  (
            <Modal trigger={container}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>{body[0]}</p>
                        <p>{body[1]}</p>
                        <p>Recommendation</p>
                        <p>{recommendations[0]}</p>
                    </Modal.Description>
                    <p>What is your stance on the recommended action?</p>
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