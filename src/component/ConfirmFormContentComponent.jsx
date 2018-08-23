import React from 'react';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import './ConfirmFormContent.scss';

class ConfirmFormContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Segment>
          <Header as="h1" className="agenda-item-step" textAlign="center">
            Step 2: Confirm Your Position On:
          </Header>
          <Header as="h2" className="agenda-item-number" textAlign="center">
            Agenda Item #{this.props.AgendaItemId}
          </Header>
          <Segment className="agenda-item-recommendation">
            <Header as="h4">Recommended action:</Header>
            {this.props.Recommendations}
          </Segment>
          <Segment>
            <Button onClick={this.props.editForm} style={{ position: 'relative', float: 'right' }}>Edit</Button>
            <Header as="h4" className="agenda-item-section">Your name and zipcode:</Header>
            {this.props.firstName} {this.props.lastName}, {this.props.zipcode}
            <Header as="h4" className="agenda-item-section">Your e-mail address:</Header> {this.props.email}
            <Header as="h4" className="agenda-item-section">Your position:</Header> {this.props.Pro === 1 ? 'Agree' : this.props.Pro === 0 ? 'Disagree' : 'Need more information'}
            <Header as="h4" className="agenda-item-section">Additional comments:</Header> {this.props.content}
            <Header as="h4" className="agenda-item-section">Additional demographics:</Header>
            {this.props.resident && (<div>{'Resident of the city'}<br/></div>)}
            {this.props.homeOwner && (<div>{'Home owner in the city'}<br/></div>)}
            {this.props.businessOwner && (<div>{'Business owner in the city'}</div>)}
            {this.props.childSchool && (<div>{'Has children in school in the city'}<br/></div>)}
            {this.props.school && (<div>{'Attends school in the city'}<br/></div>)}
            {this.props.works && (<div>{'Employed in the city'}<br/></div>)}
          </Segment>
          <Segment color="orange">
            <Header as="h3">
              {'By submitting this form, you consent to entering the above data, including your email address, as a matter of Public Record and you certify that you are not knowingly submitting false information.'}
            </Header>
          </Segment>
          <Segment textAlign="center">
            <Button color="green" onClick={this.props.submitForm}>
              <Header as="h1" style={{ color: 'white' }}>SUBMIT</Header>
            </Button>
          </Segment>
        </Segment>
      </Container>
    );
  }
}

export default ConfirmFormContentComponent;
