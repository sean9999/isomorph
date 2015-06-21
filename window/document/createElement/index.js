var parseuri = require('parseuri'),
	document = require('../document');

//	let's create something that can do this: https://gist.github.com/jlong/2428561

var createElement = function(tagName) {
	var el;
	switch (tagName) {
		case 'a':
		el = {};
		el.setAttribute = function(k,v){
			el[k]=v;
		};
		Object.defineProperty(el,'href',{
			enumerable: true,
			set: function(newval) {
				var u = parseuri(newval);
				this.protocol = u.protocol + ':';
				this.hostname = u.host;
				this.port = u.port;
				this.pathname = u.path;
				this.search = '';
				this.hash = '';
				this.host = u.host;
				if (u.port) {
					this.host += ':' + u.port;
				}
				if (u.query) {
					this.search = '?' + u.query;
				}
				if (u.anchor) {
					this.hash = '#' + u.anchor;	
				}
			}
		});
		break;
	}
	return el;
};

global.document.createElement = createElement;