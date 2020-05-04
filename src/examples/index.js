import Vue from "vue";
import NotifyExample from "./NotifyExample.vue";
import Notify from "../lib/index";

Vue.use(Notify);

new Vue({
  render: h => h(NotifyExample)
}).$mount("#app");
