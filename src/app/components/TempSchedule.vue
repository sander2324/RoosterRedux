<template>
  <div class="scheduleArea">
    <div
      v-if="isLoading"
      class="loadingArea"
    >
      <div class="loadingArea__loader">
        <span class="loadingArea__loader__dot" />
        <span class="loadingArea__loader__dot" />
        <span class="loadingArea__loader__dot" />
      </div>
    </div>
    <div
      v-if="week === false"
      class="wrongClassError"
    >
      <h2>Deze klas bestaat niet</h2>
    </div>
    <div
      v-for="day in week"
      :key="day.date"
      class="daybox"
    >
      <div class="daybox__title box">
        {{ day.date_f }}
      </div>
      <div
        v-for="course in day.items"
        :key="`${course.st}${course.r}`"
        class="coursearea"
      >
        <div class="coursebox">
          <div class="coursebox__timespan">
            {{ course.t }}
          </div>
          <div class="coursebox__name">
            {{ chopCourseName(course.v) }}
          </div>
          <div class="coursebox__room">
            {{ course.r }}
          </div>
        </div>
        <div
          v-if="getBreakTime(course, day.items)"
          class="coursebox__break"
        >
          Pauze van {{ getBreakTime(course, day.items) }} minuten
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import differenceInMinutes from 'date-fns/differenceInMinutes';

export default {
  computed: {
    group() { return this.$store.state.group; },
    week() { return this.$store.state.week; },
    isLoading() { return this.$store.state.isLoading; },
  },
  methods: {
    chopCourseName(name) {
      if (name.length < 7) return name;
      let finalName = '';
      for (let i = 0; i < 6; i++) {
        finalName += name[i];
      }
      finalName += '..';
      return finalName;
    },

    getCurrentCourseIndex(currentCourse, dayItems) {
      let index;
      for (let i = 0; i < dayItems.length; i++) {
        if (
          dayItems[i].st === currentCourse.st
          && dayItems[i].r === currentCourse.r
        ) index = i;
      }
      return index;
    },

    getBreakTime(currentCourse, dayItems) {
      const index = this.getCurrentCourseIndex(currentCourse, dayItems);
      if (!dayItems[index] || !dayItems[index + 1]) return 0;

      const currentCourseEndDate = new Date(dayItems[index].et);
      const nextCourseStartDate = new Date(dayItems[index + 1].st);

      // Get the diffrence in minutes between the end of the current course
      // and the start of the next.
      // If the difference is negative (two courses with the same start and end date),
      // the difference will be zero instead.
      return Math.max(differenceInMinutes(nextCourseStartDate, currentCourseEndDate), 0);
    },
  },
};
</script>
