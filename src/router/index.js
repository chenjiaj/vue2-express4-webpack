import VueRouter from "vue-router";
import Plugin from "../views/Plugins/plugin";
import Detail from "../views/Plugins/detail";
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