import  React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAgendas,
} from '../ducks/agendas';
import AgendaItemContainer from './AgendaItemContainer.jsx';
import qs from 'query-string';


class AgendaFeed extends Component {
    constructor(props){
        super(props);
        this.addId = this.addId.bind(this);
        this.removeId = this.removeId.bind(this);
    }

    componentDidMount() {
        // Kick off action to make async call to our server for tags/topics.
        // This will then get stored in our redux state.

        gtag('config', 'UA-116538234-1', {
            'page_title' : 'feed',
            'page_path': '/feed'
        });
        const parsed = qs.parse(this.props.location.search);
        if (parsed && parsed.id){
            this.requestedID = parseInt(parsed.id);
        }

        const { requestAgendas } = this.props;
        requestAgendas();
    }

    addId(id){
        const parsed = qs.parse(this.props.location.search);
        parsed['id'] = id;
        this.props.history.push('/feed?' + qs.stringify(parsed))
    }

    removeId() {
        const parsed = qs.parse(this.props.location.search);
        delete parsed.id;
        this.props.history.push('/feed?' + qs.stringify(parsed))
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
                        return (
                            <AgendaItemContainer
                                key={agenda.id}
                                addId={this.addId}
                                {...agenda}
                                defaultOpen={agenda.id === this.requestedID}
                                removeId={this.removeId}
                                searchParams={this.props.location.search}
                                />
                        )
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
