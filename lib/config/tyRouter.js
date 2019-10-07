
import VueRouter from 'vue-router'
import MyApp from '../../../../src/module/main'
//解决重复路由报错
const originalPush = VueRouter.prototype.push;

/**
 * app后台系统专用
 */
VueRouter.prototype.tyPush = function (location) {
    // console.log("tyPush location:", location);
    return originalPush.call(this, `/app${location}`).catch(function(err){
        // console.log("tyPush e");
        MyApp.$store.dispatch("addTab",MyApp.$route.params);
        return err;
    });
}