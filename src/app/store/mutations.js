import * as mutations from './mutationTypes';

export default {
  [mutations.UPDATE_GROUP]: (state, payload) => { state.group = payload; },
  [mutations.UPDATE_WEEK]: (state, payload) => { state.week = payload; },
  [mutations.UPDATE_WEEK_NUMBER]: (state, payload) => { state.weekNumber += payload; },
  [mutations.SET_WEEK_NUMBER]: (state, payload) => { state.weekNumber = payload; },
  [mutations.SET_LOADING]: (state, payload) => { state.isLoading = payload; },
};
