/**
 * Created by chenjiajun on 2016/12/20.
 */
import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

es6Promise.polyfill();

module.exports = function (the, url, data, succFun, failFun, errFun, noloading) {
	
	var isLoading = noloading === false ? false : true;
	
	var options = {
		method: 'POST',
		headers: {'Connection': 'close', 'Content-Type': 'application/json; charset=utf-8', 'node': 'open'},
		body: JSON.stringify(data)
	};
	
	isLoading && the.$store.commit('show');
	
	fetch('/api/' + url, options).then(response => {
		isLoading && the.$store.commit('hide');
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			var error = new Error(response.statusText);
			error.response = response;
			throw error
		}
	}).then(data => {
		
		if (data.resultCode != 0) {
			the.$toast.show(data.resultMsg, 2000);
			failFun && failFun();
		} else {
			succFun && succFun(data);
		}
		
	}).catch(e => {
		the.$toast.show('服务器内部错误，请联系管理员', 2000);
		errFun && errFun();
	});
}