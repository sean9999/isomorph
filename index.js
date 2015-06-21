var isomorph = (function(undefined){
	/**
	* Isomorph is designed to allow the same code to be used on the server as in the browser.
	* It returns an object meant for glomming onto the global object.
	* It supports only modern browsers and runtimes.
	* @TODO: add requirejs support
	* @TODO: add ES6 support
	**/

	var r = {
		isNode: null,	//	true or false
		isBrowser: null,	//	true or false
		isOn: null,	//	browser or server
		microtime: null // a very accurate timestamp
	};


	r.isNode = (typeof process !== "undefined" && {}.toString.call(process) === "[object process]" && typeof require !== "undefined" && typeof module !== "undefined" && typeof module.exports !== "undefined");
	r.isBrowser = (typeof window !== "undefined" && typeof window.document !== "undefined");
	if (r.isNode) {
		var little_now = process.hrtime();
		var big_now = Date.now();
		require('./window/document'); // creates global.document
		r.isOn = 'server';
		r.publish = module.exports;
		r.microtime = function(){
			var hrtime = process.hrtime(ztamp);
			var seconds = hrtime[0];
			var microsecond = hrtime[1];
			var now = Date.Now();
			return now + hrtime[0] + (hrtime[1]/1000000);
		};
	} else if (r.isBrowser) {
		r.globe = window;
		r.dom = window.document;
		r.isOn = 'browser';
		r.publish = window;
		r.microtime = function(){
			return window.performance.timing.navigationStart + window.performance.now();
		} 
	} else {
		throw new Error('The environment is odd. isomorph doesn`t know what to do');
	}
	return r;
})();
