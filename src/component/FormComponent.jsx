import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './FormComponent.scss';
import CommentForm from './CommentForm.jsx';
import {Connect} from 'react-redux';
import {bindActionCreators} from 'redux'

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
      <div
          style={{
            display: 'flex',
            minHeight: '63vh',
            flexDirection: 'column',
          }}>
          <div
            style={{
              position: 'relative',
              zIndex: 50,
            }}>
      <Segment className="form-background">
        <Segment className="vote-recommendations-holder">
          <div className="vote-title-title">{this.props.Title}</div>
          <div className="vote-recommendations-keyword">Summary:</div>
          <div className="vote-recommendations-recommendations">
            {this.props.Summary}
          </div>
          <div className="vote-recommendations-keyword">
            Recommended Action(s):
          </div>
          <div className="vote-recommendations-recommendations">
            {this.props.Recommendations}
          </div>
        </Segment>
        <Segment>
          <Segment
            className={className}
            color="teal"
            style={{ float: 'right', position: 'relative' }}>
            {' '}
            {divContent}{' '}
          </Segment>
          <CommentForm
            history={this.props.history}
            id={this.props.Id}
            pro={this.props.Pro}
            committee={this.props.Committee}
            complete={this.props.complete}
            completeForm={this.props.completeForm}
            editing={this.props.editing}
            resetForm={this.props.resetForm}
            returnToItem={this.props.returnToItem}
            scrollToAppTop={this.props.scrollToAppTop}
          />
        </Segment>
      </Segment>
      </div></div>
    );
  }
}

FormComponent.propTypes = {
  Committee: PropTypes.string,
  Id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  Pro: PropTypes.number,
  Recommendations: PropTypes.array,
  Summary: PropTypes.string,
  Title: PropTypes.string,
  complete: PropTypes.object,
  editing: PropTypes.bool,
  completeForm: PropTypes.func,
  resetForm: PropTypes.func,
  returnToItem: PropTypes.func,
  scrollToAppTop: PropTypes.func,
};

export default FormComponent;
