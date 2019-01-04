import * as mutations from './mutationTypes';

export default {
  [mutations.updateGroup]: (state, payload) => { state.group = payload; },
  [mutations.updateWeek]: (state, payload) => { state.week = payload; },
};
