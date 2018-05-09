import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FormComponent from "../component/FormComponent.jsx";
const Recaptcha = require("react-recaptcha");

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptchaSuccess: false
    };
    this.returnToAgendaItem = this.returnToAgendaItem.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  verifyCallback(evt) {
    console.log(evt);
  }
  loadCallback(evt) {
    console.log("loaded");
  }
  returnToAgendaItem() {
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <Recaptcha
          sitekey="6LcnmVUUAAAAAKaVa9eHX41Nxpzg42_yEsGh0IOH"
          render="explicit"
          verifyCallback={this.verifyCallback}
          onloadCallback={this.loadCallback}
        />
        <FormComponent
          Title={this.props.Title}
          Recommendations={this.props.Recommendations}
          Summary={this.props.Summary}
          Id={this.props.Id}
          Pro={this.props.Pro}
          returnToAgendaItem={this.returnToAgendaItem}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { Form } = state;
  if (state.Form) {
    return {
      Title: Form.Title,
      Recommendations: Form.Recommendations,
      Summary: Form.Summary,
      Id: Form.Id,
      Pro: Form.Pro
    };
  } else {
    return {};
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FormContainer);
