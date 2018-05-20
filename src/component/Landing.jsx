import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

const copyText = require('../../public/static/landing_page_copy.json');

//const appLink = "https://www.figma.com/proto/DFWuuo5ZVOEgEmKedY6I8bRd/engage_prototype---Page-1?scaling=contain&node-id=158%3A393"
const appLink = '#/feed';
const breakPointSize = 767;

const linkStyle = {
  color: '#074d91',
};

class Landing extends Component {
  componentDidMount() {
    gtag('config', 'UA-116538234-1', {
      page_title: 'home',
      page_path: '/',
    });
  }
  render() {
    return (
      <div>
        <Segment
          textAlign="center"
          style={{ position: 'relative', minHeight: 536, padding: '1em 0em' }}
          vertical
        >
          <Container text>
            <Header
              as="h1"
              content={copyText.page_header.header_text}
              inverted
              style={{
                fontSize: '4em',
                color: '#7FB800',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '1.5em',
              }}
            />
            <Header
              as="h2"
              content={copyText.page_header.body_text}
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                color: '#000',
                marginBottom: '1em',
              }}
            />
            <Button primary size="huge" style={{ backgroundColor: '#7FB800', marginTop: '1rem' }}>
              <Link style={{ color: '#FFF' }} to="/feed">
                Click to Engage
              </Link>
              <Icon name="right arrow" />
            </Button>
          </Container>
          <div
            style={{
              width: '100%',
            }}
          >
            <Responsive minWidth={breakPointSize}>
              <Image
                src="/static/image/city-council@2x.jpg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  width: '100%',
                  height: 'auto',
                  minHeight: '536px',
                  objectFit: 'cover',
                }}
              />
            </Responsive>
            <Responsive maxWidth={breakPointSize}>
              <Image
                src="/static/image/city-council-mobile@3x.jpg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  width: '100%',
                  height: 'auto',
                  minHeight: '536px',
                  objectFit: 'cover',
                }}
              />
            </Responsive>
          </div>
        </Segment>
        <Segment
          style={{
            padding: '8em 0em',
            backgroundImage: 'linear-gradient(180deg, #80C3F3, #4A90E2)',
          }}
          vertical
        >
          <Container text style={{}}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              {copyText.what_is_engage.header_text}
            </Header>

            <p style={{ fontSize: '1.33em' }}>{copyText.what_is_engage.body_text}</p>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            />
            <Header as="h3" style={{ fontSize: '2em' }}>
              {copyText.use_engage.header_text}
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              {copyText.use_engage.body_text}
              <br />

              <a style={linkStyle} href="mailto:engagelosangeles@gmail.com">
                engagelosangeles@gmail.com
              </a>
            </p>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            />
            <Header as="h3" style={{ fontSize: '2em' }}>
              {copyText.city_council.header_text}
            </Header>
            <p style={{ fontSize: '1.33em' }}>{copyText.city_council.body_text}</p>
          </Container>
        </Segment>
      </div>
    );
  }
}
export default Landing;
