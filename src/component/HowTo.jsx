import React from 'react';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';

import copyText from '../../public/static/landing_page_copy.json';

const linkStyle = {
  color: '#074d91',
};

const HowTo = props => (
  <div>
    <Segment
      style={{
        padding: '4em 0em',
      }}
      vertical>
      <Container text style={{}}>
        <Header as="h1">How To Use Engage</Header>
        <Header as="h4" style={{ fontSize: '1.5em' }}>
          {copyText.submit_feedback.header_text}
        </Header>

        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_1}
        </p>
        <img src="static/image/engage_howto_img1.png" />
        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_2}
        </p>
        <img src="static/image/engage_howto_img2.png" />
        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_3}
        </p>
        <img src="static/image/engage_howto_img3.png" />
        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_4}
        </p>
        <img src="static/image/engage_howto_img4.png" />
        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_5}
        </p>
        <img src="static/image/engage_howto_img5.png" />
        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_6}
        </p>
        <img src="static/image/engage_howto_img6.png" />
        <p style={{ fontSize: '1em' }}>
          {copyText.submit_feedback.body_text_step_7}
        </p>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '1em 0em', textTransform: 'uppercase' }}
        />
        <Header as="h4" style={{ fontSize: '1.5em' }}>
          {copyText.city_council.header_text}
        </Header>
        <p style={{ fontSize: '1em' }}>{copyText.city_council.body_text}</p>
        <p style={{ fontSize: '1em' }}>
          More information about the City Council Meetings and the Council
          itself can be found at the City’s official Council Website here:{' '}
          <a href="https://www.smgov.net/departments/council/">
            https://www.smgov.net/departments/council/
          </a>
        </p>
      </Container>
    </Segment>
  </div>
);
export default HowTo;
