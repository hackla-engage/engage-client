import React, { Component } from 'react';

class Preference extends Component {
    renderList() {
        console.log(this.props)
        return this.props.preferenceList.map(preference => {
            return (
                <li 
                    key={ preference.title } 
                    // onClick = { () => this.props.selectBook(book) }
                    style={{ "color":"black", "textAlign": "center" }}
                    className='list-group-item'>
                    { preference.title }
                </li>
            )
        })
    }

    render() {
        return (
            <ul className='list-group col-sm-4'>
                { this.renderList() }
            </ul>
        )
    }
}

export default Preference;