import Vue from "vue"
import App from "./app"
import VueRouter from "vue-router"
import router from "./router/index"

Vue.use(VueRouter);

const app = new Vue({
	el:'#app',
	router:router,
	render: h => h(App)
});
