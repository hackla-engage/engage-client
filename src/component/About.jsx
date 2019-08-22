import React from 'react';

const About = () => (
  <div className="ui vertical stripe segment" style={{ color: 'black' }}>
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="ui text container">
          <h3 className="ui header center">About Engage</h3>
          <p>
            People often never get a chance to speak at a city council meeting.
            There are many causes for this: work schedules, childcare,
            accessibility, they've thought their voice would not be heard, or
            they just haven't followed an issue in detail.
          </p>
          <p>
            Engage is a tool that lets you easily follow issues your city
            council is debating. More importantly, it provides a platform for
            expressing your views on these issues, in a way you know will be
            heard by your city.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="ui text container">
          <h3 className="ui header">Our Mission</h3>
          <p>
            Engage’s mission is to empower citizens to improve their local
            government by making it easy to participate in discussions on
            government policy and agendas. We hope to make a solution that works
            for all local governments, but for now are starting with the city of
            Santa Monica.
          </p>
          <p>
            We are nearing launch on our pilot app for Santa Monica - please
            check back soon for announcements, or follow us on Twitter{' '}
            <a href="https://twitter.com/EngageStaMonica">@EngageStaMonica</a>.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="ui text container">
          <h3 className="ui header">About Hack for LA</h3>
          <p>
            Engage was developed under the auspices of{' '}
            <a href="http://www.hackforla.org/#projects">Hack for LA</a>.
          </p>
          <p>
            Hack for LA is the official Los Angeles chapter of{' '}
            <a href="https://www.codeforamerica.org/">Code for America</a>, a
            national nonprofit that believes government can work for the people,
            by the people, in the 21st century. At our weekly Civic Hack Nights,
            we organize groups of volunteers to build technology addressing the
            LA region’s biggest civic issues. We welcome technologists,
            government officials, designers, students, activists, entrepreneurs
            and community members to join us and collaboratively create a better
            Los Angeles.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="ui text container">
          <h3 className="ui header">Have a question? Want to help?</h3>
          <p>
            We’d love to hear from you! Contact the Engage team at{' '}
            <a href="mailto:engage@engage.town">engage@engage.town</a>.
          </p>
          <p>
            Or come on down to Hack Night! Find out more about Hack for LA's
            current projects and how to contribute{' '}
            <a href="http://www.hackforla.org/#projects">here</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
