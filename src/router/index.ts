import { createWebHistory, createRouter } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import store from '@/store/index';

export const routes = [
  {
    path: '/',
    name: '',
    redirect: (to: any) => {
      return 'dashboard'
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard" },
    component: DashboardView,
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login" },
    component: LoginView
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const log = JSON.parse(JSON.stringify(store.state));
  console.log(localStorage.getItem('user'), from.path, to.path)
})

export default router;