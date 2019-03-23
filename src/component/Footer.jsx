import React from 'react';
import { Button, Container, Image, Grid, Segment } from 'semantic-ui-react';

const breakPointSize = 767;
const Footer = () => (
  <Segment
    attached
    style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      margin: 0,
      border: 'solid #192a56',
      backgroundColor: '#192a56',
      color: '#ffffff',
    }}>
    <Container textAlign="center">
      <h2 className="social-links__title">
        Have a question? <br />
        Want to help?
      </h2>
      <p>
        Join us at <a href="https://www.meetup.com/hackforla/">Hack for LA</a>,
        Mondays at 6:00pm in Santa Monica
      </p>

      <a
        style={{ display: 'block', marginBottom: '1rem' }}
        href="mailto:engagelosangeles@gmail.com">
        <Button style={{ backgroundColor: '#8CB474', color: 'white' }}>
          Send us a message
        </Button>
      </a>
      <Grid verticalAlign="middle" centered>
        <Grid.Column mobile={4} tablet={2} computer={2}>
          <a
            className="social-links__link"
            href="https://www.meetup.com/hackforla/"
            target="_blank">
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
          <a
            className="social-links__link"
            href="https://hackforla-slack.herokuapp.com/"
            target="_blank">
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
          <a
            className="social-links__link"
            href="https://github.com/hackforla"
            target="_blank">
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

      <p>
        This is an open source project
        <br />
        You can download or contribute to the code on GitHub
      </p>
    </Container>
  </Segment>
);

export default Footer;
