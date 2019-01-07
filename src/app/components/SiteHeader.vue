<template>
  <div class="header">
    <div class="header__title">
      <h2>Deltion Roosters Redux</h2>
    </div>
    <div class="header__SearchBox">
      <input
        v-model="groupInput"
        class="header__SearchBox__input"
        type="text"
        placeholder="Vul hier je klas in"
        @keyup.enter="submitGroup"
      >
    </div>
    <div class="header__GroupDisplay">
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
  },
  methods: {
    submitGroup() {
      this.$store.commit(mutations.UPDATE_GROUP, this.groupInput);
      this.$store.dispatch(actions.GET_WEEK);
    },
  },
};
</script>
