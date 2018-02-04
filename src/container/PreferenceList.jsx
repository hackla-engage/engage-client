import Preference from '../component/Preference.jsx'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preference_selected } from '../actions/Preference';



function mapStateToProps(state) {
    return {
        preferenceList: state.preferenceList,
        PreferenceSelected: state.PreferenceSelected,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ preference_selected }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Preference)