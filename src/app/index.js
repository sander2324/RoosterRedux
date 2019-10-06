import '@babel/polyfill';
import Vue from 'vue';
import 'bulma/css/bulma.css';
import '../scss/index.scss';

import store from './store';
import router from './router';

import App from './App.vue';

Vue.config.productionTip = false;

window.app = new Vue({
  // Bind Vue to the div#root in our index.html.
  // The root div will be replaced by our App component.
  el: '#root',
  components: { App },
  template: '<App/>',
  store,

  router,
  // This will have the webpack vue-loader plugin do some optimization
  // in advance that makes it possible to include a more lightweight version of Vue.
  render: (h) => h(App),
});
