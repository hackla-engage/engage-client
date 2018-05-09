import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FormComponent from "../component/FormComponent.jsx";
const Recaptcha = require("react-recaptcha");
<<<<<<< HEAD
=======
import agenda_item_received from "../actions/Form";
>>>>>>> a81eec8f7f8f1ed8cadfe15e1aea7757b1416654

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptchaSuccess: false
    };
<<<<<<< HEAD
    this.returnToAgendaItem = this.returnToAgendaItem.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
=======
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

>>>>>>> a81eec8f7f8f1ed8cadfe15e1aea7757b1416654
  verifyCallback(evt) {
    console.log(evt);
  }
  loadCallback(evt) {
    console.log("loaded");
  }
<<<<<<< HEAD
  returnToAgendaItem() {
    this.props.history.goBack()
  }
=======
>>>>>>> a81eec8f7f8f1ed8cadfe15e1aea7757b1416654
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
<<<<<<< HEAD
          Pro={this.props.Pro}
          returnToAgendaItem={this.returnToAgendaItem}
=======
>>>>>>> a81eec8f7f8f1ed8cadfe15e1aea7757b1416654
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
<<<<<<< HEAD
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
=======
  if (state.Form) {
    return {
      Title: state.Form.Title,
      Recommendations: state.Form.Recommendations,
      Summary: state.Form.Summary,
      Id: state.Form.Id
    };
>>>>>>> a81eec8f7f8f1ed8cadfe15e1aea7757b1416654
  }
}

function matchDispatchToProps(dispatch) {
<<<<<<< HEAD
  return bindActionCreators({}, dispatch);
=======
  return bindActionCreators({ agenda_item_received }, dispatch);
>>>>>>> a81eec8f7f8f1ed8cadfe15e1aea7757b1416654
}

export default connect(mapStateToProps, matchDispatchToProps)(FormContainer);
