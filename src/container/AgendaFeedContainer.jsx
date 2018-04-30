import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';
import AgendaItemContainer from '../container/AgendaItemContainer';

class AgendaFeed extends Component {
    componentDidMount() {
        // Kick off action to make async call to our server for tags/topics.
        // This will then get stored in our redux state.
        const { requestAgendas } = this.props;
        requestAgendas();
    }
    render () {
        const { agendaItems } = this.props;
      
        if(!agendaItems || Object.keys(agendaItems).length === 0){
            return (<div style={{color: 'black'}}>Error: retrieving agenda items</div>)
        }
        Object.values
        return (
            <div style={{color: 'black'}}>
                {Object.values(agendaItems).map(agenda => {
                    return <AgendaItemContainer key={agenda.id} {...agenda} />
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        agendaItems: state.agendas.agendaItems,
        agendaIDs: state.agendas.agendaIDs,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ requestAgendas }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AgendaFeed)