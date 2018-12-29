<template>
  <div id="App">
    <SiteHeader />
    <TempSchedule />
  </div>
</template>

<script>
import SiteHeader from './SiteHeader.vue';
import TempSchedule from './TempSchedule.vue';

export default {
  components: { SiteHeader, TempSchedule },
};
</script>
