import _Vue from "vue";
import Api from "./api";

declare module "vue/types/vue" {
  interface Vue {
    $notify: any;
  }

  interface VueConstructor {
    $notify: any;
  }
}

// Импортируем стили для уведомлений, общие
import "./index.scss";

export default {
  install(Vue: typeof _Vue, options = {}) {
    const methods = Api(Vue, options);
    Vue.$notify = methods;
    Vue.prototype.$notify = methods;
  }
};
