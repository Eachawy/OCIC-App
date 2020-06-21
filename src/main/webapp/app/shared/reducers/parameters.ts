import { setSessionStorage, getSessionStorage } from 'app/ocic/config/network-service-reducer';
import { Storage } from 'react-jhipster';

export const ACTION_TYPES = {
  SET_PARAMETER: 'parameter/SET_PARAMETER',
  REMOVE_PARAMETER: 'parameter/REMOVE_PARAMETER'
};

const initialState = {
  parameters: new Map(Storage.session.get('param') ? getSessionStorage('param') : null)
};

export type ParametersState = Readonly<typeof initialState>;

export default (state: ParametersState = initialState, action): ParametersState => {
  switch (action.type) {
    case ACTION_TYPES.SET_PARAMETER:
      const key = action.key;
      const value = action.val;
      state.parameters.set(key, value);
      setSessionStorage('param', Array.from(state.parameters.entries()));
      return state;
    case ACTION_TYPES.REMOVE_PARAMETER:
      const keyRm = action.key;
      state.parameters.delete(keyRm);
      setSessionStorage('param', Array.from(state.parameters.entries()));
      return state;
    default:
      return state;
  }
};

export const setParameter = (key, val) => async dispatch => {
  // if (key && val) {
  //
  // }
  dispatch({
    type: ACTION_TYPES.SET_PARAMETER,
    key: key,
    val: val
  });
};

export const removeParameter = key => async dispatch => {
  dispatch({
    type: ACTION_TYPES.REMOVE_PARAMETER,
    key: key
  });
};
