# vue-dust-notify

Vue notifications for Dust Games project.

## Install

```bash
npm install vue-dust-notify
```

## Usage

```js
import Vue from "vue";

import Notify from "vue-dust-notify";
Vue.use(Notify);

// default message without options
this.$notify.default("Message!");
// success message with title
this.$notify.success("Message!", { title: "Title" });
// warning message with overridden message
this.$notify.warning("Message!", { message: "Another mes" });
// error message without options
this.$notify.error("Message!");
// custom message with options (no first parameter in custom)
this.$notify.show({ type: "default", title: "Tit", message: "Mes" });
```

## Options

In `this.$notify.` + `success`/`warning`/`error`/`default` you should write message as first parameter and object with this options as second parameter.
In `this.$notify.show` you should write object with this options as fisrt (and last) parameter.

| Attribute |  Type  |  Default  | Description                                              |
| :-------- | :----: | :-------: | :------------------------------------------------------- |
| message   | String |     -     | Message (required)                                       |
| title     | String |     -     | Title                                                    |
| type      | String | `success` | One of `success`, `error`, `default`                     |
| timeout   | Number |  `3000`   | The number of milliseconds after which the notice closes |
