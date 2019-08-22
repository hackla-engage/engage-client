import React from 'react';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';

import copyText from '../../public/static/landing_page_copy.json';

const linkStyle = {
  color: '#074d91',
};

const Faq = props => (
  <div>
    <Segment
      style={{
        padding: '8em 0em',
        backgroundImage: 'linear-gradient(180deg, #80C3F3, #4A90E2)',
      }}
      vertical>
      <Container text style={{}}>
        <Header as="h1">FAQ</Header>
        <Header as="h3" style={{ fontSize: '2em' }}>
          {copyText.what_is_engage.header_text}
        </Header>

        <p style={{ fontSize: '1.33em' }}>
          {copyText.what_is_engage.body_text}
        </p>
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
export default Faq;
