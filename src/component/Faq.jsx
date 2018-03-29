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
} from 'semantic-ui-react'

const breakPointSize = 767

const Faq = (props) =>{
  return (
    <div>
      <Segment style={{
        padding: '8em 0em',
        backgroundImage: 'linear-gradient(180deg, #80C3F3, #4A90E2)',
        }} vertical>
        <Container text style={{}}>
          <Header as="h1">FAQ</Header>
          <Header as='h3' style={{ fontSize: '2em' }}>Engage helps you voice your opinions at city council meetings
          </Header>

          <p style={{ fontSize: '1.33em' }}>
            We can give your company superpowers to do things that they never thought possible. Let us delight
            your customers and empower your needs... through pure data analytics.
Engage helps you voice your opinions at local goverment meetings
          </p>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>How do I get started?</Header>
          <p style={{ fontSize: '1.33em' }}>
            Simply click to engage above and sign up with your email!
          </p>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>How does City Council work?</Header>
          <p style={{ fontSize: '1.33em' }}>
            It may seem daunting, but we are here to help!
          </p>
          <p>Click for more</p>
        </Container>
      </Segment>

    </div>
  );
}
export default Faq;
