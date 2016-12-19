import VueRouter from "vue-router";
import addPlugin from "../views/Plugins/addPlugin";
import NotFoundComponent from "../components/NotFound"

const routes = [{
	path: '/addPlugin',
	component: addPlugin
}, {
	path: '*',
	component: NotFoundComponent
}];

const router = new VueRouter({
	mode: 'history',
	routes
});

module.exports = router;