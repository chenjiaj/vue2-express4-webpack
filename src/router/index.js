import VueRouter from "vue-router";
const Plugin = r => require.ensure([], () => r(require('../views/Plugins/plugin')), 'Plugin');
const Detail = r => require.ensure([], () => r(require('../views/Plugins/detail')), 'Detail');
const NotFoundComponent = r => require.ensure([], () => r(require('../components/NotFound')), 'NotFoundComponent');

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