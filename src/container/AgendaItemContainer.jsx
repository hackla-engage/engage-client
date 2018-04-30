import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';

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

        return (<div>
            <h1>{title}</h1>
            <div>{body[0]}</div>
            <div>{body[1]}</div>
        </div>)
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