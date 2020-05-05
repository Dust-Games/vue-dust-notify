<template>
  <transition name="slide">
    <div v-show="isActive" class="notify" :class="[`notify__type_${type}`]">
      <div @click="close">
        <div class="notify__close">
          <div class="notify__close-one" />
          <div class="notify__close-two" />
        </div>
      </div>

      <h1 class="notify__title">{{ title }}</h1>
      <p class="notify__text">{{ message }}</p>
      <div class="notify__strip" />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotifyComponent",

  props: {
    type: { type: String, default: "success" },
    title: { type: String, default: "" },
    message: { type: String, required: true },
    timeout: { type: Number, default: 3000 }
  },

  data() {
    return {
      isActive: false as Boolean,
      parent: null as HTMLElement | null,
      timer: null as any
    };
  },

  beforeMount() {
    this.setupContainer();
  },

  mounted() {
    this.showNotice();
  },

  methods: {
    setupContainer() {
      this.parent = document.querySelector(".notifies");
      // No need to create them, they already exists
      if (!this.parent) {
        this.parent = document.createElement("div");
        this.parent.className = "notifies";
      }

      document.body.appendChild(this.parent);
    },

    removeElement(el: Element) {
      if (typeof el.remove !== "undefined") {
        el.remove();
      } else {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    },

    close() {
      clearTimeout(this.timer);
      this.isActive = false;
      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.$destroy();
        this.removeElement(this.$el);
      }, 500);
    },

    showNotice() {
      if (this.parent) {
        this.parent.insertAdjacentElement("afterbegin", this.$el);
      }

      this.isActive = true;
      this.timer = setTimeout(() => this.close(), this.timeout);
    }
  }
});
</script>

<style lang="scss" scoped>
$primary-color: #14233b;
$white: white;
$orange: #ff9a44;

$success: linear-gradient(0deg, #b7f8db 0%, #50a7c2 100%);
$error: linear-gradient(0deg, #fc6080 0%, #ff9a44 100%);
$default: linear-gradient(0deg, #48c6ef 0%, #6f86d6 100%);

@font-face {
  font-family: "NotoSans";
  src: url("./NotoSans-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}

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
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

.slide-enter-active {
  animation-name: slideIn;
  animation-duration: 0.4s;
}

.slide-leave-active {
  animation-name: slideOut;
  animation-duration: 0.8s;
}

.notify {
  margin: 0.5em 0;
  border-radius: 0.25em;
  pointer-events: auto;
  background: $primary-color;
  color: $white;
  min-height: 3em;
  min-width: 300px;
  position: relative;
  font-family: "NotoSans";
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-self: flex-end;

  &__close {
    position: absolute;
    right: 15px;
    top: 13px;
    height: 25px;
    width: 20px;
    z-index: 2;

    &-one,
    &-two {
      position: relative;
      content: "";
      height: 17px;
      width: 2px;
      background: $white;
      transition: all 0.4s ease-out;
    }

    &-one {
      right: -13px;
      top: -2px;
      transform: rotate(45deg);
    }

    &-two {
      right: -13px;
      top: -19px;
      transform: rotate(-45deg);
    }

    &:hover {
      cursor: pointer;

      & .notify__close-one {
        background: $orange !important;
        transform: rotate(135deg);
      }

      & .notify__close-two {
        background: $orange !important;
        transform: rotate(45deg);
      }
    }
  }

  &__title,
  &__text {
    z-index: 1;
    padding-left: 20px !important;
  }

  &__title {
    font-size: 18px;
    margin: 0;
    padding: 10px 15px 0;
    word-break: break-all;
  }

  &__text {
    font-size: 14px;
    margin: 0;
    padding: 10px 15px 15px;
    word-break: break-all;
  }

  &__strip {
    position: absolute;
    top: 0;
    left: 10px;

    width: 25px;
    height: 100%;
  }

  // Colors
  $colors: (
    "success": $success,
    "error": $error,
    "default": $default
  );
  @each $color, $value in $colors {
    &__type_#{$color} .notify__strip {
      background: $value;
    }
  }
}
</style>
