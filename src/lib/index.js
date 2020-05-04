// import _Vue from "vue";
import Notify from "./Notify.vue";
import Api from "./js/api";

// declare module "vue/types/vue" {
//   interface Vue {
//     $notify: any;
//   }

//   interface VueConstructor {
//     $notify: any;
//   }
// }

// Импортируем стили для уведомлений, общие
import "./index.scss";

const Plugin = (Vue, options = {}) => {
  const methods = Api(Vue, options);
  Vue.$notify = methods;
  Vue.prototype.$notify = methods;
};

Notify.install = Plugin;

export default Notify;

// export default {
//   install(Vue, options = {}) {
//     const methods = Api(Vue, options);
//     Vue.$notify = methods;
//     Vue.prototype.$notify = methods;
//   },
// };
