import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
import Book from "@/components/Book.vue";
import BookList from '@/components/BookList.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/books/edit/:id',
        name: 'bookEdit',
        component: Book
    },
    {
        path: '/books/create',
        name: 'bookAdd',
        component: Book
    },
    {
        path: '/books',
        name: 'bookList',
        component: BookList
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;


