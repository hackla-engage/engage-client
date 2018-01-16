import React, { Component } from 'react';

class Preference extends Component {
    renderList() {
        return this.props.preferenceList.map(preference => {
            return (
                <li 
                    key={ preference.title } 
                    onClick = { () => this.props.preference_selected(preference) }
                    style={{ "color":"black", "textAlign": "center" }}
                    className='list-group-item'>
                    { preference.title }
                </li>
            )
        })
    }

    selected(){
        if(!this.props.PreferenceSelected){
            return <h4>Select A Preference....</h4>
        }
        else{
            return <h5>The active preference is { this.props.PreferenceSelected.title }</h5>
        }
    }

    render() {

        return (
            <div>
                <ul className='list-group col-sm-4'>
                    { this.renderList() }
                </ul>
                <hr />
                <div style={{ "textAlign":"center" }}>
                    { this.selected() }
                </div>
            </div>
        )
    }
}

export default Preference;