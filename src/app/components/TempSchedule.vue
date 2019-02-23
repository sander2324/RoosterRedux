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
          {{ chopCourseName(course.v) }}
        </div>
        <div class="coursebox__room">
          {{ course.r }}
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
  },
  methods: {
    chopCourseName(name) {
      if (name.length < 7) return name;
      let finalName = '';
      for(let i = 0; i < 6; i++) {
        finalName += name[i];
      }
      finalName += '..';
      return finalName;
    },
  },
};
</script>
