import React, { Component } from 'react'
import { Button, Checkbox, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { MailChimpSub } from '../reducers/index'
import { MailChimpSubscribe } from '../actions/MailChimpPost'

class MailChimpForm extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: ''
    }
    handleChange = (e, {name, value}) => this.setState({
        [name]: value
    })

    handleSubmit = (e) => {
        const data = this.state
        this.props.fetchResp(data)
        console.log(this.props.fetchedResp)
        e.preventDefault()
    } 

    render() {
        const { first_name, last_name, email } = this.state

        return (
            <div id={this.props.id}>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input width={3} fluid 
                                    placeholder="First Name" 
                                    name="first_name"
                                    value={first_name}
                                    onChange={this.handleChange}
                        />
                        <Form.Input width={3} fluid placeholder="Last Name"
                                            name="last_name"
                                            value={last_name}
                                            onChange={this.handleChange}
                        />
                        <Form.Input width={7} fluid placeholder="Email" 
                                            name="email"
                                            value={email}
                                            onChange={this.handleChange}
                        />
                        <Form.Button width={3} type='submit' size="large" content='Submit' />
                    </Form.Group>
                    {/* <Button size='large' type="submit">Submit</Button> */}
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fetchedResp: MailChimpSub(state)
})

const mapDispatchToProps = {
    fetchResp: MailChimpSubscribe
}

export default connect(mapStateToProps,mapDispatchToProps)(MailChimpForm);

// export default MailChimpForm