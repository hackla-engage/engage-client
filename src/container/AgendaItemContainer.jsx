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
            title,
            body,
            meeting_time
        } = this.props;

        return (
        <Container text>

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
        </Container>)
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