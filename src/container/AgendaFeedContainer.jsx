import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';
import AgendaItemContainer from './AgendaItemContainer.jsx';
const queryString = require('query-string');


class AgendaFeed extends Component {
    componentDidMount() {
        // Kick off action to make async call to our server for tags/topics.
        // This will then get stored in our redux state.

        const parsed = queryString.parse(this.props.location.search);
        if (parsed && parsed.id){
            this.requestedID = parseInt(parsed.id);
        }

        const { requestAgendas } = this.props;
        requestAgendas();
    }
    render () {
        const {
            agendaItems,
            agendaLoading,
            agendaLoadError,
        } = this.props;

        if(agendaLoadError.error){
            return (<div style={{color: 'black'}}>Error: retrieving agenda items</div>)
        } else if(agendaLoading){
            return (<div style={{color: 'black'}}>Loading agenda items..</div>)
        } else {
            return (
                <div style={{color: 'black'}}>
                    {Object.values(agendaItems).map((agenda, i) => {
                        console.log('this', this.requestedID, agenda.id)
                        return <AgendaItemContainer key={agenda.id} {...agenda} defaultOpen={agenda.id === this.requestedID} />
                    })}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const agendas = state.agendas;
    return {
        agendaItems: agendas.agendaItems,
        agendaIDs: agendas.agendaIDs,
        agendaLoading: agendas.agendaLoading,
        agendaLoadError: agendas.agendaLoadError,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ requestAgendas }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AgendaFeed)
