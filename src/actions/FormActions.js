import {push} from 'react-router-redux';

export const UPDATE_CURRENT_DESCRIPTION = 'UPDATE_CURRENT_DESCRIPTION';

export function updateCurrentDescription(data) {
    return {type: UPDATE_CURRENT_DESCRIPTION, state: data}
}

export function goToDrawingPage() {
    return (dispatch) => {
        dispatch(push('/draw'));
    }
}
