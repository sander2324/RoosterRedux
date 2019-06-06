<template>
  <header>
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
          class="SearchBox__input input"
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
  </header>
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
    // If the user entered a group in the URL ({host}/{groupname}) show that group right away!
    if (this.$route.params.group) {
      this.$store.commit(mutations.UPDATE_GROUP, this.$route.params.group);
      this.$store.dispatch(actions.GET_WEEK);
    }
  },
  methods: {
    submitGroup(elem) {
      // Unfocus the input box
      elem.target.blur();
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
