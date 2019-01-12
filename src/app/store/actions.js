import axios from 'axios';
import filterdAPI from '../helpers/filterAPIdata';
import * as actions from './actionTypes';
import * as mutations from './mutationTypes';

export default {
  [actions.GET_WEEK]: async (context) => {
    const weekData = await axios.get(`https://roosters-api.stormheg.co/api/v1/roster?group=${context.state.group}`).catch((err) => {
      console.log(err);
    });
    context.commit(mutations.UPDATE_WEEK, filterdAPI(weekData.data.data,
      context.state.weekNumber));
  },
};
