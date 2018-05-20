import React from 'react';
import TopicsSelector from '../component/TopicsSelector.jsx';
import { requestTags } from '../actions/RequestTags.js';
/***
 * Wrapper/container component.
 * This is the screen where the user selects the topics (tags) which they wish
 * to see in their feed.
 *
 * It renders a child component which does most of the actual work.
 * HTTP Requests should be handled here.
 */

class TopicsSelectorContainer extends React.Component {
  componentDidMount() {
    // Kick off action to make async call to our server for tags/topics.
    // This will then get stored in our redux state.
    requestTags();
  }
  render() {
    const topics = [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }];
    return <TopicsSelector topics={topics} />;
  }
}

export default TopicsSelectorContainer;
