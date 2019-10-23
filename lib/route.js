import Login from "./page/login.vue"
import Page404 from "./page/Page404.vue"
import example from "ty-component/example"

let routes = [
    {
        path: '/',
        components: {
            default: Login
        }
    },
    ...example
];
let route404=[
    { path: '/404', component: Page404 },
    { path: '*', redirect: '/404' }
];

export {routes,route404}