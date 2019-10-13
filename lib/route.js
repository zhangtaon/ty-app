import { Page404 } from "ty-component"

export default [
    { path: '/404', component: Page404 },
    { path: '*', redirect: '/404' }
]