import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DetailActions from '../actions/DetailActions';
import PantsDetail from '../components/DetailComponents/PantsDetail';

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(DetailActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PantsDetail);
