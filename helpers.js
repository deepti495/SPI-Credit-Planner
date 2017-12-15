const handlebars = require('handlebars');
const moment = require('moment');

let helpers = {};

helpers['url-encode'] = (source) => {
  let tweetText = encodeURIComponent(source);
  return tweetText;
};

helpers['tag-generator'] = (source) => {
  let tag =  "<" + source.tagName;
  if (source.content) {
  	tag += ">" + source.content + "</" + source.tagName + ">";
  	return tag;
  }
  if (source.attributes) {
  	let i = 0;
  	for (attribute in source.attributes) {
  		if( Object.values(source.attributes)[0] != "twitter:card" ) {
	  		tag += " " + Object.keys(source.attributes)[i] + "='" + Object.values(source.attributes)[i] + "'"
	  		i++;
	  	}
	  }
	}
  tag += ">"
  return tag;
};

module.exports = helpers;