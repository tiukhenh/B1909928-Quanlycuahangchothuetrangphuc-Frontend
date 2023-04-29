import { createWebHistory, createRouter} from "vue-router";
import Home from "@/views/Home.vue";
import Login from "../views/Login.vue";
const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/items/:id",
        name: "item.edit",
        component: () => import("@/views/ItemEdit.vue"),
        props: true
    },
    {
        path: "/items",
        name: "item.add",
        component: () => import("@/views/ItemAdd.vue"),
        props: true
    },
    {
        path: "/bill",
        name: "bill",
        component: () => import("@/views/Bill.vue"),
    },
    {
        path: "/bill/add",
        name: "bill.add",
        component: () => import("@/views/BillAdd.vue"),
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import("@/views/Cart.vue"),
    },
    {
        path: "/user",
        name: "user",
        component: () => import("@/views/User.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;