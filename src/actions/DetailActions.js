import DB from '../../db.js';
import moment from 'moment';

export const RECEIVE_PANTS_DATA = 'RECEIVE_PANTS_DATA';

export function selectPants(pantsId) {
    return (dispatch) => {
        DB.pants.update({ selected: true }, { selected: false }, (results) => {
            DB.pants.get_id(pantsId, (result) => {
                const oldCount = result[0].pantsWearCount || 0;
                const newCount = oldCount + 1;
                const lastWorn = moment().format('L');

                DB.pants.update_id(pantsId, {
                    selected: true,
                    pantsWearCount: newCount,
                    lastWornDate: lastWorn
                }, (data) => {
                    dispatch(receivePantsData(data.pants));
                });
            });
        });
    };
}

export function resetWearCount(pantsId) {
    return (dispatch) => {
        DB.pants.update_id(pantsId, { pantsWearCount: 0 }, (data) => {
            dispatch(receivePantsData(data.pants));
        });
    };
}

export function deletePants(pantsId) {
    DB.pants.remove_id(pantsId);
}

export function receivePantsData(data) {
    return { type: RECEIVE_PANTS_DATA, state: data };
}