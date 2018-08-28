import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { ReactDOM } from 'react-dom';

import './FormComponent.scss';
import CommentForm from './CommentForm.jsx';

class FormComponent extends Component {
  componentDidMount() {
    this.props.scrollToAppTop();
  }
  render() {
    let className;
    let divContent;
    if (this.props.Pro === 1) {
      className = 'pro';
      divContent = 'Agree';
    } else if (this.props.Pro === 0) {
      className = 'con';
      divContent = 'Disagree';
    } else {
      className = 'need';
      divContent = 'Need more information';
    }
    return (
      <Segment className="form-background">
        <Segment className="vote-recommendations-holder">
          <div className="vote-title-title">{this.props.Title}</div>
          <div className="vote-recommendations-keyword">Summary:</div>
          <div
            className="vote-recommendations-recommendations"
            dangerouslySetInnerHTML={{ __html: this.props.Summary }}
          />
          <div className="vote-recommendations-keyword">
            Recommended Action(s):
          </div>
          <div
            className="vote-recommendations-recommendations"
            dangerouslySetInnerHTML={{ __html: this.props.Recommendations }}
          />
        </Segment>
        <Segment>
          <Segment className={className} color="teal" style={{ float: 'right', position: 'relative' }}> { divContent } </Segment>
          <CommentForm
            id = {this.props.Id}
            pro = {this.props.Pro}
            committee = {this.props.Committee}
            content = {this.props.content}
            email = {this.props.email}
            firstName = {this.props.firstName}
            lastName = {this.props.lastName}
            zipcode = {this.props.zipcode}
            businessOwner = {this.props.businessOwner}
            childSchool = {this.props.childSchool}
            homeOwner = {this.props.homeOwner}
            resident = {this.props.resident}
            school = {this.props.school}
            works = {this.props.works}
            submitted = {this.props.submitted}
            saveForm = {this.props.saveForm}
            resetForm = {this.props.resetForm}
            returnToItem = {this.props.returnToItem}
            scrollToAppTop = {this.props.scrollToAppTop}
          />
        </Segment>
      </Segment>
    );
  }
}

export default FormComponent;
