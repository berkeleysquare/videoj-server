import {
  FETCH_COLLECTION_REQUEST,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE
} from './actions'


function rootReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_COLLECTION_REQUEST:
    case FETCH_COLLECTION_SUCCESS:
    case FETCH_COLLECTION_FAILURE:
      if (!action.resource) {
        throw new Error(`${action.type} actions must specify a resource`);
      }
      const resource_state = state[action.resource];
      const new_resource_state = resource(resource_state, action);
      return Object.assign({}, state, {[action.resource]: new_resource_state});
    default:
  }
  return state;
}

function resource(state = {}, action) {

  switch (action.type) {
    case FETCH_COLLECTION_REQUEST:
      return Object.assign({}, state, {fetching: true});
    case FETCH_COLLECTION_SUCCESS:
      let newState;
      if (action.data && typeof action.data.data !== 'undefined') {
        newState = {...action.data, error: false, fetching: false}
      } else {
        newState = {data: action.data, error: false, fetching: false}
      }
      return Object.assign(
        {},
        state,
        newState
      );
    case FETCH_COLLECTION_FAILURE:
      return Object.assign(
        {},
        state,
        {data: [], error: true, fetching: false}
      );
    default:
  }
  return state;
}

export default rootReducer;
