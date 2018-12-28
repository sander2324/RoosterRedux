import "@babel/polyfill";
import axios from 'axios';
import Vue from 'vue';
import '../scss/index.scss'

import App from './components/App.vue';

Vue.config.productionTip = false

// Bind Vue to the div#root in our index.html.
// The root div will be replaced by our App component.
new Vue({
  el: '#root',
  template: '<App/>',
  components: { App },

  // This will have the webpack vue-loader plugin do some optimization
  // in advance that makes it possible to include a more lightweight version of Vue.
  render: h => h(App)
})
