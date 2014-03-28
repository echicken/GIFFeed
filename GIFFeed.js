var	util = require('util'),
	events = require('events'),
	http = require('http'),
	url = require('url'),
	omggif = require('omggif');

var logError = function(err) {
	if(err)
		console.log(err);
}

var GIFFeed = function(options) {

	var self = this;
	events.EventEmitter.call(this);

	var settings = {
		'feedURL' : 'http://www.reddit.com/r/gifs/.json',
		'limit' : 100,
		'seen' : []
	};

	this.load = function() {

		var feed = "";

		var expandMetadata = function(item) {
			try {
				var decoded = new omggif.GifReader(item.gif);
				item.width = decoded.width;
				item.height = decoded.height;
				item.frames = decoded.numFrames();
				item.duration = 0; // In milliseconds
				for(var f = 0; f < item.frames; f++) {
					item.duration += (
						(Number(decoded.frameInfo(f).delay) * 10) || 1
					);
				}
				return item;
			} catch(err) {
				console.log(err);
				return false;
			}
		}
		
		var cacheItem = function(item) {
	
			http.get(
				item.url,
				function(response) {
					var buffers = [];
					response.on(
						"data",
						function(data) {
							buffers.push(data);
						}
					);
					response.on(
						"end",
						function() {
							item.gif = Buffer.concat(buffers);
							item = expandMetadata(item);
							if(!item)
								return;
							self.emit("GIF", item);
							settings.seen.push[item.id];
						}
					);
				}
			);
		}	
		
		var handleData = function(data) {
			feed += data.toString();
		}

		var handleItem = function(item) {
			var u = url.parse(item.data.url);
			if(u.protocol != "http:")
				return;
			if(u.pathname.substr(-4, 4).toLowerCase() != ".gif")
				return;
			if(settings.seen.indexOf(item.id) < 0)
				cacheItem(item.data);
		}
		
		var handleFeed = function() {
			var theFeed = JSON.parse(feed);
			theFeed.data.children.forEach(handleItem);
			feed = "";
		}

		var handleResponse = function(response) {
			response.on("data", handleData);
			response.on("end", handleFeed);
		}
	
		http.get(
			util.format("%s?limit=%s", settings.feedURL, settings.limit),
			handleResponse
		);

	}

	var init = function(options) {
		for(var o in options) {
			if(typeof settings[o] == typeof options[o]) {
				settings[o] = options[o];
			} else {
				self.emit(
					"error",
					util.format(
						"GIFFeed error: %s must be %s.",
						o,
						typeof settings[o]
					)
				);
			}
		}
	}

	init(options);

}
util.inherits(GIFFeed, events.EventEmitter);

module.exports = GIFFeed;