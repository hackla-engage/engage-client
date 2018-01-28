import React, { Component } from 'react';
import styles from './Landing.scss';
// import styles from './Header.scss';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react'

const Landing = (props) =>{
  return (
    <div>
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        vertical
      >
        <Container text>
          <Header
            as='h1'
            content='Engage'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
          />
          <Image
            bordered
            rounded
            size='medium'
            src="http://d33wubrfki0l68.cloudfront.net/ac40c001c60109040dc17c9b42d270616cd9e711/2ac65/images/logo-hfla.svg"
          />
          <Header
            as='h2'
            content='Voice your opinions at Santa Monica City Council'
            inverted
            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
          />
          <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
          </Button>
        </Container>
      </Segment>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>Engage helps you voice your opinions at local goverment meetings
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
            {/* <a href='#'>Case Studies</a> */}
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>How do I start?</Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
          </p>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            {/* <a href='#'>Case Studies</a> */}
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>How does City Council work?</Header>
          <p style={{ fontSize: '1.33em' }}>
            It's a bit daunting but we are here to help
          </p>
          <p>Tutorial</p>
        </Container>
      </Segment>
    </div>
  );
}
export default Landing;
