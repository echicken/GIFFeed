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

to your project's *package.json* file's *dependencies* section and run:

```sh
npm install
```

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

####The GIFFeed object

#####Instantiation:

```js
var feed = new GIFFeed(
	{	'feedURL' : 'http://www.reddit.com/r/gifs/.json',
		'limit' : 100,
		'seen' : []
	}
);
```

#####Methods:

* *load()* - Loads a feed of 'limit' posts from 'feedURL', fires off a GIF event for each *new* GIF that is encountered in the feed.

#####Events:

* *GIF* - A new GIF has been found in the feed.  One argument will be supplied to your callback function, an object similar to the following:

```js
{	domain: 'giant.gfycat.com',
	banned_by: null,
	media_embed: {},
	subreddit: 'gifs',
	selftext_html: null,
	selftext: '',
	likes: null,
	secure_media: null,
	link_flair_text: null,
	id: '21l70f',
	gilded: 0,
	secure_media_embed: {},
	clicked: false,
	stickied: false,
	author: 'Kruce',
	media: null,
	score: 1842,
	approved_by: null,
	over_18: false,
	hidden: false,
	thumbnail: '',
	subreddit_id: 't5_2qt55',
	edited: false,
	link_flair_css_class: null,
	author_flair_css_class: null,
	downs: 1233,
	saved: false,
	is_self: false,
	permalink: '/r/gifs/comments/21l70f/i_made_parkour_dog_into_an_abandon_thread_gif/',
	name: 't3_21l70f',
	created: 1396039847,
	url: 'http://giant.gfycat.com/VeneratedGenerousBlackfish.gif',
	author_flair_text: null,
	title: 'I made \'Parkour Dog\' into an abandon thread gif!',
	created_utc: 1396011047,
	ups: 3075,
	num_comments: 67,
	visited: false,
	num_reports: null,
	distinguished: null,
	gif: <Buffer 47 49 46 38 39 61 26 02 16 01 f7 00 00 ff ff ff ff fa f7 f7 f7 f7 f7 f6 ee ef f0 ef e6 ef ee e7 e6 de e5 e5 e7 ee de ce dc df dd d7 d6 d8 dc d4 ce cd d6 ...>,
	width: 550,
	height: 278,
	frames: 189,
	duration: 18900
}
```

* The *gif* property is a Buffer containing the actual GIF.
* The *duration* property is the calculated length of one loop of the animated GIF, in milliseconds.
* The *id* property is (I believe) a unique ID for the Reddit posting that this GIF was loaded from.  (You can supply an array of these strings as the *seen* argument when instantiating your GIFFeed object to prevent it from firing off GIF events for images you already know about.)