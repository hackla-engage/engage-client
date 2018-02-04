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
        textAlign='center'
        style={{ position: 'relative', minHeight: 700, padding: '1em 0em' }}
        vertical
      >
        <Container text style={{}}>
          <Header
            as='h1'
            content='Engage'
            inverted
            style={{ fontSize: '4em', color: '#7FB800', fontWeight: 'normal', marginBottom: 0, marginTop: '2.5em' }}
          />
          <Header
            as='h2'
            content='Engage helps you voice your opinions at Santa Monica City Council'
            inverted
            style={{ fontSize: '1.7em', fontWeight: 'normal', color: '#000', }}
          />
          <Button primary size='huge' style=
          {{ backgroundColor: '#7FB800' }}>
          Click to Engage
            <Icon name='right arrow' />
          </Button>
        </Container>
        <div style={{
          width: '100%',
        }}>
          <Image 
            src="/static/image/city-council.jpg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              width: '100%',
              opacity: 0.4,
              height: 'auto',
              minHeight: '700px',
              objectFit: 'cover',
            }}
          />
        </div>
      </Segment>
      <Segment style={{
        padding: '8em 0em',
        backgroundImage: 'linear-gradient(180deg, #80C3F3, #4A90E2)',
        }} vertical>
        <Container text style={{}}>
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
            {/* <a href='#'>Case Studies</a> */}
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
            {/* <a href='#'>Case Studies</a> */}
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
export default Landing;
