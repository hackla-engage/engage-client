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
import './Landing.scss';

import MailChimpForm from './MailChimpForm.jsx';

const copyText = require('../../public/static/landing_page_copy.json');
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
          style={{
            position: 'relative',
            minHeight: 380,
            padding: '1em 0em',
            border: 'None',
          }}
          vertical>
          <Container fluid style={{ marginTop: '5em' }}>
            <Header
              as="h2"
              content={copyText.page_header.body_text}
              inverted
              style={{
                fontSize: '2.8em',
                fontWeight: '500',
                color: 'black',
                marginBottom: '0.5em',
                textAlign: 'center',
              }}
            />
            <p
              style={{
                fontSize: '1.5em',
                color: 'black',
                textAlign: 'center',
                fontWeight: '300',
                lineHeight: '1.5em',
              }}>
              Start using Engage today and be part of the discussion! Vote and
              comment on proposals from your local government
            </p>
            <Link
              to="/feed"
              style={{
                color: '#FFF',
              }}>
              <Button
                primary
                size="large"
                style={{
                  backgroundColor: '#192a56',
                  marginTop: '1rem',
                }}>
                Start Engaging
              </Button>
            </Link>
          </Container>
        </Segment>
        <Segment
          style={{
            backgroundColor: '#e8ecf1',
            border: 'None',
            boxShadow: 'None',
            paddingTop: '4em',
            paddingBottom: '4em',
          }}>
          <Container>
            <Header
              as="h2"
              content="Stay up to date! Get the latest proposals in your inbox."
              inverted
              style={{
                fontSize: '1.8em',
                fontWeight: '500',
                color: '#000',
                textAlign: 'center',
              }}
            />
            <MailChimpForm id="home-page" />
          </Container>
        </Segment>
        <Segment
          vertical
          style={{
            padding: '6em 0em',
          }}>
          <Container text>
            <Grid stackable columns="equal" align="center">
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src="/static/image/news-feed-icon.png"
                    style={{
                      height: '120px',
                      width: '120px',
                      textAlign: 'center',
                    }}
                  />
                  <div
                    style={{
                      color: 'black',
                      marginTop: '1em',
                      maxWidth: '220px',
                    }}>
                    Get Informed on City Developments
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Image
                    src="/static/image/comment-icon.png"
                    style={{
                      borderRadius: '50%',
                      height: '120px',
                      width: '120px',
                    }}
                  />
                  <div
                    style={{
                      color: 'black',
                      marginTop: '1em',
                      maxWidth: '220px',
                    }}>
                    View, Read, and Comment on Recent Agenda Items
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Image
                    src="/static/image/people-icon.png"
                    style={{
                      height: '120px',
                      width: '120px',
                    }}
                  />
                  <div
                    style={{
                      color: 'black',
                      marginTop: '1em',
                      marginBottom: '3em',
                      maxWidth: '220px',
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
