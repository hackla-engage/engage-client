import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import './FormComponent.scss';
import CommentForm from './CommentForm';

class FormComponent extends Component {
  render() {
    return (
      <Segment className="form-background">
        <div className={this.props.Pro ? 'pro' : 'con'}>{this.props.Pro ? 'Pro' : 'Con'}</div>
        <div className="vote-title-holder" />
        <div className="vote-recommendations-holder">
          <div className="vote-title-title">{this.props.Title}</div>
          <div className="vote-recommendations-keyword">Summary:</div>
          <div
            className="vote-recommendations-recommendations"
            dangerouslySetInnerHTML={{ __html: this.props.Summary }}
          />
          <div className="vote-recommendations-keyword">Recommended Action(s):</div>
          <div
            className="vote-recommendations-recommendations"
            dangerouslySetInnerHTML={{ __html: this.props.Recommendations }}
          />
        </div>
        {this.props.showCommentForm ?
          <CommentForm /> :
          <div className="nocomment">>> Note: Commenting is closed for this issue.</div>}
      </Segment>
    );
  }
}

export default FormComponent;
