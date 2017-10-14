import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PantsListActions from '../actions/PantsListActions';
import PantsListView from '../components/ListComponents/PantsListView';

function mapStateToProps(state) {
    return {
        pantsData: state.pantsListReducer.pantsData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PantsListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsListView);
