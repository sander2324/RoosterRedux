<template>
  <div class="scheduleArea">
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
        :key="course.st"
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
          v-if="hasBreak(course, day.items)"
          class="breakbox"
        >
          {{ getBreakTime(course, day.items) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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

    // Determine if the current course has a break between the next course
    hasBreak(currentCourse, dayItems) {
      const index = this.getCurrentCourseIndex(currentCourse, dayItems);
      if (dayItems[index] && dayItems[index + 1]) {
        if (dayItems[index].et === dayItems[index + 1].st) return false;
        return true;
      }
      return false;
    },

    getCurrentCourseIndex(currentCourse, dayItems) {
      let index;
      for (let i = 0; i < dayItems.length; i++) {
        if (dayItems[i].st === currentCourse.st) index = i;
      }
      return index;
    },

    getBreakTime(currentCourse, dayItems) {
      if (!this.hasBreak(currentCourse, dayItems)) return '';
      const index = this.getCurrentCourseIndex(currentCourse, dayItems);
      if (!dayItems[index] && !dayItems[index + 1]) return '';
      const breakTime = new Date(dayItems[index + 1].st - dayItems[index].et);
      const breakTimeMin = breakTime.getMinutes();
      return `Pauze van ${breakTimeMin} minuten`;
    },
  },
};
</script>
