import React from 'react';
import Recaptcha from './Recaptcha.jsx';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import './ConfirmFormContent.scss';
import './EmailConfirmationPopup.scss';
import PropTypes from 'prop-types';
import EmailConfirmationPopup from './EmailConfirmationPopup.jsx';

class ConfirmFormContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       showPopup: false
    };
  }
  
  componentDidMount() {
    this.props.scrollToAppTop();
  }
  
  shouldComponentUpdate(nextProps, nextState) {
     if(this.state.showPopup == true) {
        return false;
     }
     if(nextState.showPopup == true){
        return true;
     }
     if(nextProps.token !== this.props.token && this.state.showPopup == false){
        return true;
     }
     return false;     
  }
  
  render() {
    return (
       <div>
         {this.state.showPopup ? <EmailConfirmationPopup history={this.props.history} /> : null}
         <div
           style={{
             display: 'flex',
             minHeight: '63vh',
             flexDirection: 'column',
           }}>
           <div
             style={{
               position: 'relative',
               zIndex: 50,
               display: this.props.firstName !== '' ? 'none' : 'block',
             }}>
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
                   <div> {this.props.Recommendations} </div>
                 </Segment>
                 <Segment>
                   <Button
                     onClick={() => {
                       this.props.editingForm(true);
                       this.props.history.goBack();
                     }}
                     style={{ position: 'relative', float: 'right' }}>
                     Edit
                   </Button>
                   <Header as="h4" className="agenda-item-section">
                     Your name and zipcode:
                   </Header>
                   {this.props.complete.firstName} {this.props.complete.lastName},{' '}
                   {this.props.complete.zipcode}
                   <Header as="h4" className="agenda-item-section">
                     Your e-mail address:
                   </Header>{' '}
                   {this.props.complete.email}
                   <Header as="h4" className="agenda-item-section">
                     Your position:
                   </Header>{' '}
                   {this.props.Pro === 1
                     ? 'Agree'
                     : this.props.Pro === 0
                     ? 'Disagree'
                     : 'Need more information'}
                   <Header as="h4" className="agenda-item-section">
                     Additional comments:
                   </Header>{' '}
                   {this.props.complete.content}
                   <Header as="h4" className="agenda-item-section">
                     Additional demographics:
                   </Header>
                   {this.props.complete.resident && (
                     <div>
                       {'Resident of the city'}
                       <br />
                     </div>
                   )}
                   {this.props.complete.homeOwner && (
                     <div>
                       {'Home owner in the city'}
                       <br />
                     </div>
                   )}
                   {this.props.complete.businessOwner && (
                     <div>{'Business owner in the city'}</div>
                   )}
                   {this.props.complete.childSchool && (
                     <div>
                       {'Has children in school in the city'}
                       <br />
                     </div>
                   )}
                   {this.props.complete.school && (
                     <div>
                       {'Attends school in the city'}
                       <br />
                     </div>
                   )}
                   {this.props.complete.works && (
                     <div>
                       {'Employed in the city'}
                       <br />
                     </div>
                   )}
                 </Segment>
                 <Segment color="orange">
                   <Header as="h3">
                     {
                       'By submitting this form, you consent to entering the above data, including your email address, as a matter of Public Record and you certify that you are not knowingly submitting false information.'
                     }
                   </Header>
                 </Segment>
                 <Recaptcha onVerify={this.props.onVerify} />
                 <Segment textAlign="center">
                   <Button
                     color="green"
                     disabled={this.props.token === null}
                     onClick={() => {
                       this.setState({showPopup: true}, () => {
                          this.props.scrollToAppTop();
                          this.props.handleSubmit(this.props.complete);
                       });                       
                     }}>
                     <Header as="h1" style={{ color: 'white' }}>
                       SUBMIT
                     </Header>
                   </Button>
                 </Segment>
               </Segment>
             </Container>
           </div>
         </div>
      </div>
    );
  }
}

ConfirmFormContentComponent.propTypes = {
  AgendaItemId: PropTypes.number,
  editingForm: PropTypes.func,
  recommendation: PropTypes.array,
  complete: PropTypes.object,
  scrollToAppTop: PropTypes.func,
  pro: PropTypes.number,
  handleSubmit: PropTypes.func,
};

export default ConfirmFormContentComponent;
