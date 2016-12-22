import VueRouter from "vue-router";
import Plugin from "../views/Plugins/plugin";
import Detail from "../views/Plugins/detail";
import Test from "../views/Plugins/test";
import NotFoundComponent from "../components/NotFound"

const routes = [{
	path: '/plugin',
	component:{
		template:'<router-view></router-view>'
	},
	children:[
		{
			path: '',
			component: Plugin
		},
		{
			path: 'detail',
			component: Detail
		},
		{
			path: 'test',
			component: Test
		}
	]
},{
	path: '*',
	component: NotFoundComponent
}];

const router = new VueRouter({
	mode: 'history',
	routes
});

module.exports = router;