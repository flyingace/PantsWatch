import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SettingsActions from '../actions/SettingsActions';
import Settings from '../components/Settings';

function mapStateToProps(state) {
    return {
        // brandValues: state.formReducer.brandValues,
        // colorValues: state.formReducer.colorValues,
        // styleValues: state.formReducer.styleValues,
        // pantsBrand: state.formReducer.pantsBrand,
        // pantsColor: state.formReducer.pantsColor,
        // pantsName: state.formReducer.pantsName,
        // pantsStyle: state.formReducer.pantsStyle,
        // pantsWearCount: state.formReducer.pantsWearCount,
        // pantsWearLimit: state.formReducer.pantsWearLimit,
        // lastWornDate: state.formReducer.lastWornDate,
        // selected: state.formReducer.selected
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
