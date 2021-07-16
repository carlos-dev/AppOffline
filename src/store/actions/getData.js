export const getDataRequest = (page) => ({
  type: 'GET_DATA_REQUEST',
  payload: {
    page,
  },
});

export const getDataSuccess = (data) => ({
  type: 'GET_DATA_SUCCESS',
  payload: {
    data,
  },
});

export const getDataFailure = (page) => ({
  type: 'GET_DATA_FAILURE',
  payload: {
    page,
  },
});
