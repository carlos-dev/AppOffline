export const getDataRequest = (page, results) => ({
  type: 'GET_DATA_REQUEST',
  payload: {
    page,
    results,
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
