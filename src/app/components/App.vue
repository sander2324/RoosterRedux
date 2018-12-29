<template>
  <div id="App">
    <site-header></site-header>
    <temp-schedule></temp-schedule>
  </div>
</template>

<script>
import SiteHeader from "./SiteHeader.vue";
import TempSchedule from "./TempSchedule.vue";

export default {
  components: { SiteHeader, TempSchedule }
};
</script>
