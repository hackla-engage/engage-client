import React from 'react';
import {
  Button,
  Container,
  Image,
  Grid,
  Segment,
  Icon,
} from 'semantic-ui-react';

const breakPointSize = 767;
const Footer = () => (
  <Segment
    attached
    style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      margin: 0,
      border: '0px solid #192a56',
      backgroundColor: '#192a56',
      color: '#ffffff',
      width: '100%',
    }}>
    <Container
      textAlign="center"
      style={{ paddingTop: '3em', paddingBottom: '3em' }}>
      <h2 style={{ fontSize: '1.1em' }} className="social-links__title">
        Have a question? <br />
        Want to help?
      </h2>
      <div style={{ marginTop: '2em', marginBottom: '2em' }}>
        <strong>
          <p style={{ color: '#fff' }}>
            Join us at{' '}
            <u>
              <a
                href="https://www.meetup.com/hackforla/"
                style={{ color: '#fff' }}>
                Hack for LA
              </a>
            </u>
            , Mondays at 6:00pm in Santa Monica
          </p>
        </strong>
        <Grid verticalAlign="middle" centered style={{ marginTop: '1.1em' }}>
          <a
            href="https://www.meetup.com/hackforla/"
            target="_blank"
            style={{ color: '#fff' }}>
            <Icon name="meetup" size="huge" />
          </a>
          <a
            href="https://hackforla-slack.herokuapp.com/"
            target="_blank"
            style={{ color: '#fff' }}>
            <Icon name="slack hash" size="huge" />
          </a>
          <a
            href="https://github.com/hackforla"
            target="_blank"
            style={{ color: '#fff' }}>
            <Icon name="github" size="huge" />
          </a>
        </Grid>
      </div>
      <a
        style={{ display: 'block', marginBottom: '4em', marginTop: '4em' }}
        href="mailto:engagelosangeles@gmail.com">
        <Button style={{ backgroundColor: '#82BA2D', color: 'white' }}>
          Send us a message
        </Button>
      </a>
      <p style={{ marginTop: '4em' }}>
        Engage is an open source project
        <br />
        You can download or contribute to the code on GitHub
      </p>
    </Container>
  </Segment>
);

export default Footer;
