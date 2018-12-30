<template>
  <div id="App">
    <SiteHeader />
    <Transition
      name="fade"
      mode="out-in"
    >
      <RouterView />
    </Transition>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue';

export default {
  components: { SiteHeader },
};
</script>
