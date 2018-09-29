{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import vuex from 'vuex'
import store from './vuex/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Loading from "@/components/loading.js"
import "@/assets/css/common.scss"

Vue.use(Loading);
Vue.use(ElementUI);
Vue.config.productionTip = false;

window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 19.2 + 'px';
};
setHtmlFontSize();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  store,
  vuex,
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
