import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Image,
  Grid,
  Responsive,
  Segment,
} from 'semantic-ui-react';

const copyText = require('../../public/static/landing_page_copy.json');
// const appLink = "https://www.figma.com/proto/DFWuuo5ZVOEgEmKedY6I8bRd/engage_prototype---Page-1?scaling=contain&node-id=158%3A393"
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
      <div
        style={{
          overflow: 'visible' /* has to be scroll, not auto */,
          webkitOverflowScrolling: 'touch',
        }}>
        <Segment
          textAlign="center"
          style={{ position: 'relative', minHeight: 515, padding: '1em 0em' }}
          vertical
        >
          <Container text>
            <Header
              as="h1"
              content={copyText.page_header.header_text}
              inverted
              style={{
                fontSize: '4em',
                color: '#192a56',
                fontWeight: 'normal',
                fontFamily: 'Pacifico, cursive',
                marginBottom: 0,
                marginTop: '1.5em',
                textAlign: 'left',
              }}
            />
            <Header
              as="h2"
              content={copyText.page_header.body_text}
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'bold',
                color: 'black',
                marginBottom: '1em',
                textAlign: 'left',
              }}
            />
            <Link
              to="/feed"
              style={{
                color: '#FFF',
              }}>
              <Button
                primary
                size="huge"
                style={{
                  backgroundColor: '#192a56',
                  marginTop: '1rem',
                  float: 'left',
                }}>
                Start Engaging
              </Button>
            </Link>
          </Container>
          <div style={{ width: '100%' }} >
            <Responsive minWidth={breakPointSize}>
              <Image
                src="https://source.unsplash.com/VLDDaRX04GM"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  width: '100%',
                  height: '100%',
                  minHeight: 515,
                  objectFit: 'cover',
                  opacity: '0.5',
                }}
              />
            </Responsive>
            <Responsive maxWidth={breakPointSize}>
              <Image
                src="https://source.unsplash.com/VLDDaRX04GM"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  width: '100%',
                  height: 'auto',
                  minHeight: 515,
                  objectFit: 'cover',
                  opacity: '0.5',
                }}
              />
            </Responsive>
          </div>
        </Segment>
        <Segment
          vertical
          style={{
            padding: '6em 0em',
            backgroundColor: '#dfe4ea',
          }}>
          <Container text>
            <Grid columns="equal" align="center">
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src="/static/image/news-feed-icon.png"
                    style={{
                      height: '100px',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  />
                  <div
                    style={{
                      color: 'black',
                      marginTop: '1em',
                    }}>
                    Get Informed on City Developments
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Image
                    src="/static/image/comment-icon.png"
                    style={{
                      borderRadius: '50%',
                      height: '100px',
                      width: '100px',
                    }}
                  />
                  <div
                    style={{
                      color: 'black',
                      marginTop: '1em',
                    }}>
                    View, Read, and Comment on Recent Agenda Items
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Image
                    src="/static/image/people-icon.png"
                    style={{
                      height: '100px',
                      width: '100px',
                    }}
                  />
                  <div
                    style={{
                      color: 'black',
                      marginTop: '1em',
                      marginBottom: '3em',
                    }}>
                    Feel Empowered to Engage In-Person at City Meetings
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <hr
              style={{
                border: 'solid 1px #a4b0be',
                marginBottom: '3em',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <Header as="h2">{copyText.what_is_engage.header_text}</Header>
              <p
                style={{
                  color: 'black',
                  fontSize: '1.1em',
                }}>
                {copyText.what_is_engage.body_text}
              </p>
            </div>
          </Container>
        </Segment>
      </div>
    );
  }
}
export default Landing;
