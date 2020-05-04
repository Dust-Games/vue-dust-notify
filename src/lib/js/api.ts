import _Vue from "vue";
import Notify from "../Notify.vue";
import eventBus from "./bus";

export interface INotifyParams {
  message?: string;
  title?: string;
  type?: string;
  timeout?: number;
}

const Api = (Vue: typeof _Vue, globalOptions = {}) => {
  return {
    show(message: string, innerOptions: INotifyParams) {
      return new (Vue.extend(Notify))({
        el: document.createElement("div"),
        propsData: { ...globalOptions, ...innerOptions, message }
      });
    },

    close() {
      eventBus.$emit("notify.clear");
    },

    default(message: string, options = {}) {
      return this.show(message, { ...options, type: "default" });
    },

    success(message: string, options = {}) {
      return this.show(message, { ...options, type: "success" });
    },

    warning(message: string, options = {}) {
      return this.show(message, { ...options, type: "warning" });
    },

    error(message: string, options = {}) {
      return this.show(message, { ...options, type: "error" });
    }
  };
};

export default Api;
