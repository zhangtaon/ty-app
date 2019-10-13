import { Page404 } from "ty-componeny"

export default [
    { path: '/404', component: Page404 },
    { path: '*', redirect: '/404' }
]