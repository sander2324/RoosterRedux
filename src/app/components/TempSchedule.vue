<template>
  <div class="container">
    <div class="scheduleArea">
      <!-- ALWAYS include a :key attribute with a unique property (like an id)-->
      <div class="dayBox" v-for="day in week" :key="day.date">
        <div class="dayTitle">{{ day.date_f }}</div>
        <div class="courseBox" v-for="course in day.items" :key="course.et">
          <div id="courseTimespan">{{ course.t }}</div>
          <div id="courseName">{{ course.v }}</div>
          <div id="courseLecturer">{{ course.l }}</div>
          <div id="courseRoom">{{ course.r }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getCurrentWeek from "../helpers/getCurrentWeek";

export default {
  // This data only exists within this component.
  data() {
    return { // Don't forget the return keyword!
      group: "IC1E",
      week: [],
      today: new Date().toLocaleDateString()
    };
  },
  mounted() {
    axios
      .get(`https://roosters-api.stormheg.co/api/v1/roster?group=${this.group}`)
      .then(response => {
        this.week = getCurrentWeek(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
// Normally there would be a style tag at the end of this file.
// I prefer for now to handle this separately
</script>

