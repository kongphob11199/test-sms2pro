import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import TodoListView from "@/views/TodoListView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", name: "todo-list", component: TodoListView },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
