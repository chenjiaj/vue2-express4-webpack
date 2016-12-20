/**
 * Created by chenjiajun on 2016/12/20.
 */

module.exports = function (data,the,succFun) {
	var options = {
		method: 'POST',
		headers: {'Connection': 'close', 'Content-Type': 'application/json; charset=utf-8', 'node': 'open'},
		body: JSON.stringify(data)
	};
		
	fetch('/api',options).then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			var error = new Error(response.statusText);
			error.response = response;
			throw error
		}
	}).then(data => {
		console.log('--data--',data);
		if(data.resultCode != 0){
			the.$toast.show(data.resultMsg,2000);
		}
		
		succFun(data);
		
	}).catch(e => console.log("Oops, error", e));
}