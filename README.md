GIFFeed
=======

A node.js module that loads all GIFs from a Reddit JSON feed.

####Installation:

```sh
git clone https://github.com/echicken/GIFFeed.git
cd GIFFeed
npm install
```

or add:

```js
"GIFFeed" : "git://github.com/echicken/GIFFeed.git"
```

to your project's *package.json* file's *dependencies* section.

####Usage example:

```js
var GIFFeed = require('./GIFFeed.js'),
	fs = require('fs');

var feed = new GIFFeed({'limit' : 10});

feed.on(
	"GIF",
	function(gif) {
		console.log(gif);
		console.log("---");
		fs.writeFile(gif.id + ".gif", gif.gif, function(err){});
	}
);

feed.load();
```