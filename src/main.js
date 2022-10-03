import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "nprogress/nprogress.css";
import GStore from "@/store/gStore.js";

createApp(App).use(store).use(router).provide("GStore", GStore).mount("#app");
