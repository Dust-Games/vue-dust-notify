<template>
  <div>
    <button @click="addNotify">Добавить уведомление</button>
    <p>Тип (success, error, default)</p>
    <input v-model="type" />
    <p>Заголовок</p>
    <input v-model="title" />
    <p>Сообщение</p>
    <input v-model="message" />
    <p>Количество мс, через которое сообщение исчезнет</p>
    <input v-model="timeout" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Example",

  data() {
    return {
      type: "default",
      title: "Заголовок",
      message: "Кастомное сообщение",
      timeout: 3000
    };
  },

  methods: {
    addNotify() {
      const { type, message, title, timeout } = this;
      this.$notify.show(message, { message, type, title, timeout: Number(timeout) });
    }
  }
});
</script>
