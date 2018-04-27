import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FormComponent from "../component/FormComponent.jsx";
const Recaptcha = require("react-recaptcha");
import agenda_item_received from "../actions/Form";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptchaSuccess: false
    };
  }

  /////// DEBUGGING! XXX
  componentDidMount() {
    this.props.agenda_item_received({
      Title: "Strategic Goals and SMART Metrics",
      Recommendations:
        "Staff recommends that the City Council establish three to five priority strategic goals with measurable three to five  year outcomes, with the goal of identifying game changing priorities that will make a difference in community safety, wellbeing, prosperity, quality of life, and sustainability.",
      Summary: null,
      Id: "5abdd46f02f4b99c11cc39a9"
    });
  }
  ///////

  verifyCallback(evt) {
    console.log(evt);
  }
  loadCallback(evt) {
    console.log("loaded");
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
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  if (state.Form) {
    return {
      Title: state.Form.Title,
      Recommendations: state.Form.Recommendations,
      Summary: state.Form.Summary,
      Id: state.Form.Id
    };
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ agenda_item_received }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FormContainer);
