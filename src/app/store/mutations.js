import * as mutations from './mutationTypes';

export default {
  [mutations.UPDATE_GROUP]: (state, payload) => { state.group = payload; },
  [mutations.UPDATE_WEEK]: (state, payload) => { state.week = payload; },
  [mutations.CHANGE_WEEK_NUMBER]: (state, payload) => { state.weekNumber += payload; },
};
