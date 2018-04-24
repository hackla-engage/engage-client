import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../component/Form.jsx'

function mapStateToProps(state) {
    return {
        Title: state.form.Title,
        Recommendations: state.form.Recommendations,
        Summary: state.form.Summary,
        id: state.form.Id,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ submit_form }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Preference)