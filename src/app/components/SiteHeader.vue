<template>
  <div class="header">
    <div class="header__title">
      <h2>Deltion Roosters Redux</h2>
    </div>
    <div class="header__SearchBox noselect">
      <div @click="updateWeekNumber(-1)" class="header__weekbtn">Week {{ (weekNum - 1) }}</div>
      <input
        v-model="groupInput"
        class="header__SearchBox__input"
        type="text"
        placeholder="Vul hier je klas in"
        @keyup.enter="submitGroup"
      >
      <div @click="updateWeekNumber(1)" class="header__weekbtn">Week {{ (weekNum + 1) }}</div>
    </div>
    <div class="header__GroupDisplay noselect">
      <h3>Rooster voor groep: {{ group }}</h3>
    </div>
  </div>
</template>

<script>
import * as actions from '../store/actionTypes';
import * as mutations from '../store/mutationTypes';

export default {
  data() {
    return {
      groupInput: '',
    };
  },
  computed: {
    group() { return this.$store.state.group.toUpperCase(); },
    weekNum() { return this.$store.state.weekNumber; },
  },
  methods: {
    submitGroup() {
      // Make the weekNumber reset to the current one every time the user enter in a new group
      this.$store.commit(mutations.UPDATE_GROUP, this.groupInput);
      this.$store.dispatch(actions.GET_WEEK);
    },
    updateWeekNumber(num) {
      this.$store.dispatch(actions.UPDATE_WEEK_NUMBER, num);
    },
  },
  mounted() {
    this.$store.dispatch(actions.SET_CURRENT_WEEK_NUMBER);
  },
};
</script>
