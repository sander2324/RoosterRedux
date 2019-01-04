<template>
  <div class="header">
    <div class="header__title">
      <h2>Deltion Roosters Redux</h2>
    </div>
    <div class="header__SearchBox">
      <input
        class="header__SearchBox__input"
        type="text"
        placeholder="Vul hier je klas in"
        @keyup.enter="submitGroup"
        v-model="groupInput"
      >
    </div>
    <div class="header__GroupDisplay">
      <h3>Rooster voor groep: (groepnaam)</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupInput: ''
    };
  },
  methods: {
    submitGroup() {
      this.$store.commit('updateGroup', this.groupInput);
      this.$store.dispatch('getWeek');
      console.log(this.$store.state.group);
      console.log(this.$store.state.week);
    }
  }
}
</script>
