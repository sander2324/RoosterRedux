import axios from 'axios';
import getCurrentWeek from '../helpers/getCurrentWeek';
import * as actions from './actionTypes';

export default {
  [actions.getWeek]: async (context) => {
    const weekData = await axios.get(`https://roosters-api.stormheg.co/api/v1/roster?group=${context.state.group}`).catch((err) => {
      console.log(err);
    });
    context.commit('updateWeek', getCurrentWeek(weekData.data.data));
  },
};
