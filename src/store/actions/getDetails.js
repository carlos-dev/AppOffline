export const getDetailsRequest = (user) => ({
  type: 'GET_DETAILS_REQUEST',
  payload: {
    user,
  },
});

export const getDetailsSuccess = (data) => ({
  type: 'GET_DETAILS_SUCCESS',
  payload: {
    data,
  },
});

export const getDetailsFailure = (data) => ({
  type: 'GET_DETAILS_FAILURE',
  payload: {
    data,
  },
});
