import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FormComponent from "../component/FormComponent.jsx";

class FormContainer extends Component {
  render() {
    return (
      <FormComponent
        Title={this.props.Title}
        Recommendations={this.props.Recommendations}
        Summary={this.props.Summary}
        Id={this.props.Id}
      />
    );
  }
}

function mapStateToProps(state) {
  if (state.form) {
    return {
      Title: state.form.Title,
      Recommendations: state.form.Recommendations,
      Summary: state.form.Summary,
      Id: state.form.Id
    };
  }
}

function matchDispatchToProps(dispatch) {
  //return bindActionCreators({ submit_form }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FormContainer);
