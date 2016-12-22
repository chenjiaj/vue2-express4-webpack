import VueRouter from "vue-router";
import AddPlugin from "../views/Plugins/addPlugin";
import Detail from "../views/Plugins/detail";
import NotFoundComponent from "../components/NotFound"

const routes = [{
	path: '/addPlugin',
	component: AddPlugin
}, {
	path: '/detail',
	component: Detail
}, {
	path: '*',
	component: NotFoundComponent
}];

const router = new VueRouter({
	mode: 'history',
	routes
});

module.exports = router;