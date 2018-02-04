import React, { Component } from 'react';

class Preference extends Component {
    renderList() {
        return this.props.preferenceList.map((preference, index) => {
            let item = `item-${index}`;
            return (
                <div key={ index }  className="panel panel-default">
                    <div className="panel-heading" role="tab">
                        <h4 className="panel-title">{ preference.title }<a role="button" data-toggle="collapse" data-parent="#accordion-1" aria-expanded="false" href={ `#accordion-1 .${item}` }><span className="fa fa-info" onClick = { () => this.props.preference_selected(preference) } style={{ "float":"right", "width":"10%" }}></span></a></h4>
                    </div>
                    <div className={ `panel-collapse collapse ${item}` } style={{ "backgroundColor":"white", "color":"#18bc9c", "borderRadius": "10px" }} role="tabpanel">
                        <div className="panel-body" style={{ "paddingLeft": "25px", "paddingRight": "25px" }}><span>{ preference.info }</span></div>
                    </div>
                </div>
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
        console.log(this.props)
        return (
            <div className="container">
                <div className="panel-group" role="tablist" aria-multiselectable="true" id="accordion-1">
                    { this.renderList() }
                </div>
                <hr />
                <div style={{ "textAlign":"center" }}>
                    { this.selected() }
                </div>
            </div>
        )
    }
}

export default Preference;