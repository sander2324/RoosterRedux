<template>
  <div class="header">
    <div class="header__title">
      <h2>RoosterRedux</h2>
    </div>
    <div class="SearchBox">
      <a
        class="SearchBox__weekbtn button"
        @click="updateWeekNumber(-1)"
      >
        <img
          src="../../svg/arrow-left.svg"
          alt="<"
        >
      </a>
      <input
        v-model="groupInput"
        class="SearchBox__input input is-loading"
        type="text"
        placeholder="Vul hier je klas in"
        @keyup.enter="submitGroup"
      >
      <div
        class="SearchBox__infoDisplay box"
      >
        {{ rosterInfo }}
      </div>
      <a
        class="SearchBox__weekbtn button"
        @click="updateWeekNumber(1)"
      >
        <img
          src="../../svg/arrow-right.svg"
          alt=">"
        >
      </a>
    </div>
    <div class="header__SocialDisplay" />
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
    rosterInfo() {
      if (this.$store.state.group !== '') {
        return `Groep ${this.$store.state.group.toUpperCase()}, week ${this.$store.state.weekNumber}`;
      }
      return '';
    },
  },
  mounted() {
    this.$store.dispatch(actions.SET_CURRENT_WEEK_NUMBER);
  },
  methods: {
    submitGroup() {
      // Make the weekNumber reset to the current one every time the user enter in a new group
      this.$store.commit(mutations.UPDATE_GROUP, this.groupInput);
      this.groupInput = '';
      this.$store.dispatch(actions.GET_WEEK);
    },
    updateWeekNumber(num) {
      this.$store.dispatch(actions.UPDATE_WEEK_NUMBER, num);
    },

  },
};
</script>
