import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "nprogress/nprogress.css";
import GStore from "@/store/index.js";

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);
console.log(require.context);

const app = createApp(App);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});
app.use(store).use(router).provide("GStore", GStore).mount("#app");
