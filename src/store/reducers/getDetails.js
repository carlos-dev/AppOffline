const INITIAL_STATE = {
  data: null,
  loading: false,
  error: false,
};

export default function getData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_DETAILS_REQUEST': {
      return { ...state, loading: true };
    }
    case 'GET_DETAILS_SUCCESS':
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
      };
    case 'GET_DETAILS_FAILURE':
      return {
        data: action.payload.data,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}
