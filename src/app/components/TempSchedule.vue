<template>
  <div class="scheduleArea">
    <div
      v-for="day in week"
      :key="day.date"
      class="daybox"
    >
      <div class="daybox__title">
        {{ day.date_f }}
      </div>
      <div
        v-for="course in day.items"
        :key="course.et"
        class="coursebox"
      >
        <div class="coursebox__timespan">
          {{ course.t }}
        </div>
        <div class="coursebox__name">
          {{ course.v }}
        </div>
        <div class="coursebox__lecturer">
          {{ course.l }}
        </div>
        <div class="coursebox__room">
          {{ course.r }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import getCurrentWeek from '../helpers/getCurrentWeek';

export default {
  // This data only exists within this component.
  data() {
    return {
      group: 'IC1E',
      week: [],
    };
  },
  mounted() {
    axios
      .get(`https://roosters-api.stormheg.co/api/v1/roster?group=${this.group}`)
      .then((response) => {
        this.week = getCurrentWeek(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
