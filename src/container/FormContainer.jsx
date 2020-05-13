import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormComponent from '../component/FormComponent.jsx';
import { setHours, setMinutes } from 'date-fns';
import { Route, Redirect } from 'react-router-dom';
import {
  verifiedCaptcha,
  resetForm,
  saveForm,
  editingForm,
  submitForm,
  completeForm,
} from '../actions/Form';
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if (this.props.submitted) {
      this.props.resetForm();
    }
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

  onVerify(evt) {
    // only executes on success
    this.props.verifiedCaptcha(evt);
  }

  handleSubmit(values) {
    this.props.saveForm(values);
    this.props.submitForm(this.props.token);
  }

  returnToItem(id) {
    this.props.resetForm();
    this.props.history.push(`/feed/${id}`);
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
    return (
      <React.Fragment>
        <Route
          path="/feed/:id/vote"
          render={() => (
            <FormComponent
              history={this.props.history}
              Committee={this.props.Committee}
              Id={this.props.Id}
              Pro={this.props.Pro}
              Recommendations={this.props.Recommendations}
              Summary={this.props.Summary}
              Title={this.props.Title}
              complete={this.props.complete}
              editing={this.props.editing}
              completeForm={this.props.completeForm}
              resetForm={this.props.resetForm}
              returnToItem={this.returnToItem}
              scrollToAppTop={this.scrollToAppTop}
            />
          )}
        />
        <Route
          path="/feed/:id/review-submission"
          render={() => {
            //Will redirect if user trys to go to url and form is not filled correctly
            let location = this.props.location.pathname.split('/');
            location.pop();
            location.push('vote');
            const redirectPath = location.join('/');

            return (Object.keys(this.props.complete).length === 0 ||
              this.props.editing) &&
              !this.props.submitted ? (
              <Redirect to={redirectPath} />
            ) : (
              <ConfirmFormContentComponent
                history={this.props.history}
                Pro={this.props.Pro}
                Recommendations={this.props.Recommendations}
                AgendaItemId={this.props.AgendaItemId}
                Id={this.props.Id}
                Summary={this.props.Summary}
                Title={this.props.Title}
                content={this.props.content}
                complete={this.props.complete}
                onVerify={this.onVerify}
                handleSubmit={this.handleSubmit}
                resetForm={this.props.resetForm}
                editingForm={this.props.editingForm}
                scrollToAppTop={this.scrollToAppTop}
                firstName={this.props.firstName}
                token={this.props.token} // captcha token
              />
            );
          }}
        />
        
      </React.Fragment>
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
      businessOwner: Form.businessOwner,
      childSchool: Form.childSchool,
      homeOwner: Form.homeOwner,
      resident: Form.resident,
      school: Form.school,
      works: Form.works,
      submitted: Form.submitted,
      editing: Form.editing,
      complete: Form.complete,
      token: Form.token, // captcha token
    };
  }
  return {};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetForm,
      saveForm,
      verifiedCaptcha,
      editingForm,
      submitForm,
      completeForm,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(FormContainer);
