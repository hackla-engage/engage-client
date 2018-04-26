import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
    requestAgendas2
} from '../ducks/agendas';

class AgendaFeed extends Component {
    componentDidMount() {
        // Kick off action to make async call to our server for tags/topics.
        // This will then get stored in our redux state.
        const { requestAgendas, requestAgendas2} = this.props;
        requestAgendas();
    }
    render () {
        const { agendaItems } = this.props;
      
        if(!agendaItems || agendaItems.length === 0){
            return (<div style={{color: 'black'}}>Error: retrieving agenda items</div>)
        }
        return (
            <div style={{color: 'black'}}>
                {agendaItems.map(agenda => {
                    return (
                        <div>
                            <h1>{agenda.title}</h1>
                            <div>{agenda.body[0]}</div>
                            <div>{agenda.body[1]}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        agendaItems: state.agendas.agendaItems,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ requestAgendas, requestAgendas2 }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AgendaFeed)