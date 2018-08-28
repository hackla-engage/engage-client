import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormComponent from '../component/FormComponent.jsx';
import ReactDOM from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { setHours, setMinutes } from 'date-fns';
import { verifiedCaptcha, resetForm, saveForm, editForm, submitForm } from '../actions/Form';
import ConfirmFormContentComponent from '../component/ConfirmFormContentComponent.jsx';
import PositionFormFinalStep from '../component/PositionFormFinalStep.jsx';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      captchaHidden: 'block',
    };
    this.onVerify = this.onVerify.bind(this);
    this.returnToItem = this.returnToItem.bind(this);
    this.scrollToAppTop = this.scrollToAppTop.bind(this);
  }

  componentDidMount() {
    if (this.props.Time) {
      // If past 11:59 AM PST on the day of the meeting, don't show comment form
      const meetTime = new Date(this.props.Time * 1000);
      const meetTimeObj = setMinutes(setHours(meetTime, 11), 59);
      if (new Date() < meetTimeObj) {
        this.setState({
          showForm: true,
          captchaHidden: 'none',
        });
      }
    }
  }

  onVerify(evt) { // only executes on success
    this.props.verifiedCaptcha(evt);
  }

  returnToItem() {
    this.props.history.push(`/feed/${this.props.Id}`);
  }

  scrollToAppTop() {
    window.scrollTo(0, 0);
    document.getElementById('app').scrollTo(0, 0);
    const menu = document.getElementById('menu');
    menu.scrollTop = 0;
    menu.scrollIntoView(true);
    this.forceUpdate();
  }

  render() {
    if (this.state.showForm && this.props.editing) {
      return (
        <div style={{ position: 'relative' }}>
          <ReCAPTCHA
            ref="recaptcha"
            sitekey="6Lex02wUAAAAAI6g5DnS3iIMMqhQSXReUINtVi94"
            onChange={this.onVerify}
            style={{ position: 'relative', display: this.props.token == null ? 'block' : 'none' }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 50,
              display: this.props.token == null ? 'none' : 'block',
            }}
          >
            <FormComponent
              Committee={this.props.Committee}
              Id={this.props.Id}
              Pro={this.props.Pro}
              Recommendations={this.props.Recommendations}
              Summary={this.props.Summary}
              Title={this.props.Title}
              content={this.props.content}
              email={this.props.email}
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              zipcode={this.props.zipcode}
              businessOwner={this.props.businessOwner}
              childSchool={this.props.childSchool}
              homeOwner={this.props.homeOwner}
              resident={this.props.resident}
              school={this.props.school}
              works={this.props.works}
              submitted={this.props.submitted}
              saveForm={this.props.saveForm}
              resetForm={this.props.resetForm}
              returnToItem={this.returnToItem}
              scrollToAppTop={this.scrollToAppTop}
            />
          </div>
        </div>
      );
    }
    if (this.state.showForm && !this.props.editing && !this.props.submitted) {
      return (
        <ConfirmFormContentComponent
          Pro={this.props.Pro}
          Recommendations={this.props.Recommendations}
          AgendaItemId={this.props.AgendaItemId}
          Id={this.props.Id}
          Summary={this.props.Summary}
          Title={this.props.Title}
          content={this.props.content}
          email={this.props.email}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          zipcode={this.props.zipcode}
          businessOwner={this.props.businessOwner}
          childSchool={this.props.childSchool}
          homeOwner={this.props.homeOwner}
          resident={this.props.resident}
          school={this.props.school}
          works={this.props.works}
          submitted={this.props.submitted}
          saveForm={this.props.saveForm}
          resetForm={this.props.resetForm}
          editForm={this.props.editForm}
          submitForm={this.props.submitForm}
          scrollToAppTop={this.scrollToAppTop}
        />
      );
    }
    return (
      <PositionFormFinalStep returnToItem={this.returnToItem} />
    );
  }
}

function mapStateToProps(state) {
  const { Form } = state;
  if (state.Form) {
    return {
      Committee: Form.Committee,
      Id: Form.Id,
      AgendaItemId: Form.AgendaItemId,
      Pro: Form.Pro,
      Recommendations: Form.Recommendations,
      Summary: Form.Summary,
      Title: Form.Title,
      content: Form.content,
      email: Form.email,
      firstName: Form.firstName,
      lastName: Form.lastName,
      zipcode: Form.zipcode,
      submitted: Form.submitted,
      editing: Form.editing,
      businessOwner: Form.businessOwner,
      childSchool: Form.childSchool,
      homeOwner: Form.homeOwner,
      resident: Form.resident,
      school: Form.school,
      works: Form.works,
      token: Form.token, // captcha token
    };
  }
  return {};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    resetForm,
    saveForm,
    verifiedCaptcha,
    editForm,
    submitForm,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(FormContainer);
