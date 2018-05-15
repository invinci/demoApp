// @flow
const INITIAL_STATE = {
  loading: false,
  listData: null
};

function listReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "LIST_GET_SUCCESS":
      return Object.assign({}, state, {
        listData: action.payload,
        loading: false
      });
    default:
      return state;
  }
}

export default listReducer;
