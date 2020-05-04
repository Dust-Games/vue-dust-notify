<template>
  <transition name="slide">
    <div
      v-show="isActive"
      class="notify"
      :class="[`notify-${type}`, `is-bottom-right`]"
      @click="whenClicked"
    >
      <div class="notify-icon"></div>
      <h1 class="notify-title">{{ title }}</h1>
      <p class="notify-text">{{ message }}</p>
    </div>
  </transition>
</template>

<script lang="ts"></script>

<script>
import eventBus from "./js/bus";

export default {
  name: "NotifyComponent",

  props: {
    type: { type: String, default: "success" },
    title: { type: String, default: "" },
    message: { type: String, required: true },
    timeout: { type: Number, default: 3000 },
    onClose: { type: Function, default: () => {} },
    onClick: { type: Function, default: () => {} }
  },

  data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null
    };
  },

  beforeMount() {
    this.setupContainer();
  },

  mounted() {
    this.showNotice();
    eventBus.$on("toast.clear", this.close);
  },

  beforeDestroy() {
    eventBus.$off("toast.clear", this.close);
  },

  methods: {
    setupContainer() {
      this.parentTop = document.querySelector(".notices.is-top");
      this.parentBottom = document.querySelector(".notices.is-bottom");
      // No need to create them, they already exists
      if (this.parentTop && this.parentBottom) return;
      if (!this.parentTop) {
        this.parentTop = document.createElement("div");
        this.parentTop.className = "notices is-top";
      }
      if (!this.parentBottom) {
        this.parentBottom = document.createElement("div");
        this.parentBottom.className = "notices is-bottom";
      }
      const container = document.body;
      container.appendChild(this.parentTop);
      container.appendChild(this.parentBottom);
      let containerParentClass = "is-custom-parent";
      if (this.container) {
        this.parentTop.classList.add(containerParentClass);
        this.parentBottom.classList.add(containerParentClass);
      }
    },

    removeElement(el) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else {
        el.parentNode.removeChild(el);
      }
    },

    close() {
      clearTimeout(this.timer);
      this.isActive = false;
      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.onClose.apply(null, arguments);
        this.$destroy();
        this.removeElement(this.$el);
      }, 150);
    },

    showNotice() {
      this.parentBottom.insertAdjacentElement("afterbegin", this.$el);
      this.isActive = true;
      this.timer = setTimeout(() => this.close(), this.timeout);
    },

    whenClicked() {
      this.onClick.apply(null, arguments);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
$notify-colors: () !default;
$notify-colors: map-merge(
  (
    "success": #28a745,
    "info": #17a2b8,
    "warning": #ffc107,
    "error": #dc3545,
    "default": #343a40
  ),
  $notify-colors
);

@keyframes slideIn {
  from {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translate3d(0, 0, 0);
    // opacity: 1;
  }

  to {
    // opacity: 0;
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
}
.slide-enter-active,
.slide-leave-active {
}

.slide-enter-active {
  animation-name: slideIn;
  animation-duration: 0.7s;
}

.slide-leave-active {
  animation-name: slideOut;
  animation-duration: 4s;
}

.notify {
  margin: 0.5em 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 0.25em;
  pointer-events: auto;
  opacity: 0.92;
  color: #fff;
  min-height: 3em;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  &-title {
    font-size: 18px;
    margin: 0;
    padding: 10px 15px 0;
    word-break: break-all;
  }

  &-text {
    font-size: 14px;
    margin: 0;
    padding: 10px 15px 15px;
    word-break: break-all;
  }

  &-icon {
    display: none;
  }

  &.is-bottom-right {
    align-self: flex-end;
  }

  // Colors
  @each $color, $value in $notify-colors {
    &-#{$color} {
      background-color: $value;
    }
  }
}
</style>
