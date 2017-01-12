import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isShow: false
	},
	mutations: {
		show (state) {
			state.isShow = true;
		},
		hide (state){
			state.isShow = false;
		}
	}
});

module.exports = store;
