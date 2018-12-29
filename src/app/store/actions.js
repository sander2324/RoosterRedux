import * as actions from './actionTypes';
import * as mutations from './mutationTypes';

export default {
  [actions.SET_COUNTER]: async (context, payload) => {
    // Do async stuff like api calls here.

    context.commit(mutations.SET_COUNTER, payload);
  },
};
