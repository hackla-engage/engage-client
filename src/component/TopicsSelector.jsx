import React, { Component } from 'react';
import styles from './Landing.scss';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Responsive,
  Segment,
} from 'semantic-ui-react';

const breakPointSize = 767;

const TopicsSelector = props => {
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ position: 'relative', minHeight: 536, padding: '1em 0em' }}
        vertical
      >
        <Container text>
          {props.topics.map((topic, i) => <Headline key={i} text={topic.label} />)}
        </Container>
      </Segment>
    </div>
  );
};

/**
 * Display the label/title of the topic/tag.
 * This is a private component not meant to be exported.
 * It's simpler to leave it in this file for now.
 *
 * @param props.text is required
 */
const Headline = props => (
  <Header
    as="h1"
    content={props.text}
    inverted
    style={{
      fontSize: '4em',
      color: '#7FB800',
      fontWeight: 'normal',
      marginBottom: 0,
      marginTop: '1.5em',
    }}
  />
);

export default TopicsSelector;
