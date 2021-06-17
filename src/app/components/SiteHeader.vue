<template>
  <header>
    <div class="header">
      <div class="header__title">
        <h2>RoosterRedux</h2>
      </div>
      <div class="SearchBox">
        <button
          class="SearchBox__weekbtn button"
          aria-label="Vorige week"
          @click="updateWeekNumber(-1)"
        >
          <img
            src="../../svg/arrow-left.svg"
            alt="<"
            aria-hidden="true"
          >
        </button>
        <input
          v-model="groupInput"
          class="SearchBox__input input"
          type="text"
          placeholder="Vul hier je klas in"
          aria-label="Vul hier je klas in"
          @keyup.enter="submitGroup"
        >
        <div
          class="SearchBox__infoDisplay box"
        >
          {{ rosterInfo }}
        </div>
        <button
          class="SearchBox__weekbtn button"
          aria-label="Volgende week"
          @click="updateWeekNumber(1)"
        >
          <img
            src="../../svg/arrow-right.svg"
            alt=">"
            aria-hidden="true"
          >
        </button>
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
      this.changeTitle(this.$route.params.group);
    }
  },
  methods: {

    // Change the title of the website to the group that is given.
    changeTitle(group) {
      document.title = `RoosterRedux | ${group.toUpperCase()}`;
    },

    // Change the URL of the address bar without reloading the page
    changeUrl(group) {
      window.history.pushState(group, `RoosterRedux | ${group}`, `/group/${group}`);
      this.changeTitle(group);
    },

    submitGroup(elem) {
      // Unfocus the input box
      elem.target.blur();
      this.$store.commit(mutations.UPDATE_GROUP, this.groupInput);
      this.groupInput = '';
      this.$store.dispatch(actions.GET_WEEK);
      this.changeUrl(this.$store.state.group);
    },

    updateWeekNumber(num) {
      this.$store.dispatch(actions.UPDATE_WEEK_NUMBER, num);
    },
  },
};
</script>
