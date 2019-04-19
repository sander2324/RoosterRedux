import axios from 'axios';
import filterAPI from '../helpers/filterAPIdata';
import * as actions from './actionTypes';
import * as mutations from './mutationTypes';
import currentWeekNumFunc from '../helpers/getCurrentWeekNum';

let currentWeekNum = currentWeekNumFunc();

export default {
  [actions.GET_WEEK]: async (context) => {
    const weekData = await axios.get(`https://roosters-api.stormheg.co/api/v1/roster?group=${context.state.group}`).catch((err) => {
      console.log(err);
    });
    context.commit(mutations.UPDATE_WEEK, filterAPI(weekData.data,
      context.state.weekNumber));
  },
  [actions.SET_CURRENT_WEEK_NUMBER]: async (context) => {
    if (new Date().getDay() === 0 || new Date().getDay() === 6) currentWeekNum += 1;
    context.commit(mutations.UPDATE_WEEK_NUMBER, currentWeekNum);
  },
  [actions.UPDATE_WEEK_NUMBER]: async (context, payload) => {
    if (context.state.weekNumber === 1 && payload === -1) {
      context.commit(mutations.SET_WEEK_NUMBER, 52);
    } else if (context.state.weekNumber === 52 && payload === 1) {
      context.commit(mutations.SET_WEEK_NUMBER, 1);
    } else {
      context.commit(mutations.UPDATE_WEEK_NUMBER, payload);
    }
    if (context.state.group !== '') context.dispatch(actions.GET_WEEK);
  },
};
