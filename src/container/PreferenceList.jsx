import Preference from '../component/Preference.jsx'
import { connect } from 'react-redux';

function mapStateToProps(state) {
    console.log('state: ', state)
    return {
        preferenceList: state.preferenceList,
    };
}

export default connect(mapStateToProps)(Preference)