import Vue from "vue";
import App from "./app";
import VueRouter from "vue-router";
import router from "./router/index";
import Toast from './components/queue-toast';
import store from './store/store';

Vue.use(VueRouter);

Vue.use(Toast);

const app = new Vue({
	el:'#app',
	store,
	router:router,
	render: h => h(App)
});
