export const getDataRequest = (data) => ({
  type: 'GET_DATA_REQUEST',
  payload: {
    data,
  },
});

export const getDataSuccess = (data) => ({
  type: 'GET_DATA_SUCCESS',
  payload: {
    data,
  },
});

export const getDataFailure = (data) => ({
  type: 'GET_DATA_FAILURE',
  payload: {
    data,
  },
});
