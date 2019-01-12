import axios from 'axios';
import filterdAPI from '../helpers/filterAPIdata';
import * as actions from './actionTypes';
import * as mutations from './mutationTypes';

import currentWeekNum from '../helpers/getCurrentWeekNum';

export default {
  [actions.GET_WEEK]: async (context) => {
    const weekData = await axios.get(`https://roosters-api.stormheg.co/api/v1/roster?group=${context.state.group}`).catch((err) => {
      console.log(err);
    });
    context.commit(mutations.UPDATE_WEEK, filterdAPI(weekData.data.data,
      context.state.weekNumber));
  },
  [actions.SET_CURRENT_WEEK_NUMBER]: async (context) => {
    context.commit(mutations.CHANGE_WEEK_NUMBER, currentWeekNum());
  },
  [actions.UPDATE_WEEK_NUMBER]: async (context, payload) => {
    context.commit(mutations.CHANGE_WEEK_NUMBER, payload);
    if (context.state.group !== '') context.dispatch(actions.GET_WEEK);
  },
};
