import Page404 from "./page/Page404.vue"

export default [
    { path: '/404', component: Page404 },
    { path: '*', redirect: '/404' }
]