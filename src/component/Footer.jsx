import React, { Component } from 'react';
import styles from './Footer.scss';
import { Link } from 'react-router-dom';
import { 
  Container,
  Image,
  Grid,
  Segment,
} from 'semantic-ui-react'

const breakPointSize = 767
const Footer = () => (
  <Segment style={{
    paddingLeft: '1rem',
    paddingRight: '1rem',
    margin: 0,
    backgroundColor: "#7FB800"
  }}>
    <Container textAlign='center'>
      <h2 className="social-links__title">Follow us</h2>
      <Grid verticalAlign='middle' centered>
        <Grid.Column mobile={4} tablet={2} computer={2}>
          <a className="social-links__link" href="https://www.meetup.com/hackforla/" target="_blank">
            <Image 
              src="/static/image/meetup.png"
              style={{
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </a>
        </Grid.Column>
        <Grid.Column mobile={4} tablet={2} computer={2}>
          <a className="social-links__link" href="https://hackforla-slack.herokuapp.com/" target="_blank">
            <Image 
              src="/static/image/slack-light.svg"
              style={{
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </a>
        </Grid.Column>
        <Grid.Column mobile={4} tablet={2} computer={2}>
        <a className="social-links__link" href="https://github.com/hackforla" target="_blank">
          <Image 
            src="/static/image/github-light.png"
            style={{
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </a>
        </Grid.Column>
      </Grid>
    </Container>

  </Segment>
)

export default Footer;
