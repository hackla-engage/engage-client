import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import './FormComponent.scss';
import CommentForm from './CommentForm.jsx';

class FormComponent extends Component {
  componentDidMount() {
    this.props.scrollToAppTop();
    console.log(this.props, 'FormComponentDidMount');
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
          <Segment className={className} color="teal" style={{ float: 'right', position: 'relative' }}> {divContent} </Segment>
          <CommentForm
            id={this.props.Id}
            pro={this.props.Pro}
            committee={this.props.Committee}
            complete={this.props.complete}
            completeForm={this.props.completeForm}
            resetForm={this.props.resetForm}
            returnToItem={this.props.returnToItem}
            scrollToAppTop={this.props.scrollToAppTop}
          />
        </Segment>
      </Segment>
    );
  }
}

export default FormComponent;
