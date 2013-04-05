// Save (key, value) to chrome's local storage
function saveGlobalStorage(key, value){
  chrome.extension.sendMessage({cmd: "saveStorage", key: key, value: value});
    // ptr = response;
}

// Get value associated with key from chrome's local storage
function getGlobalStorage(key, callback){
  chrome.extension.sendMessage({cmd: "getStorage", key: key}, function(response) {
    callback(response);
  });
}

// Save (key, value) to chrome's local storage
function saveGlobalStorage(key, value){
  chrome.extension.sendMessage({cmd: "saveStorage", key: key, value: value});
    // ptr = response;
}

// Get value associated with key from chrome's local storage
function getGlobalStorage(key, callback){
  chrome.extension.sendMessage({cmd: "getStorage", key: key}, function(response) {
    callback(response);
  });
}

function clearBookmarks(){
	saveGlobalStorage("bookmarks", {});
	grabBookmarks();
}

function createBookmark(){
	return {
		"url": document.URL,
		"title": document.title,
	    "time": Date.now(),
	    "image": "",
	    "description": "",
	    "tags": []
	  };
}

function notAlreadySaved(){
	getGlobalStorage("bookmarks", function(bookmarks){
		var bookmarks = bookmarks;
		bookmarks[document.URL] = newBookmark;
		saveGlobalStorage("bookmarks", bookmarks);
	});
	for(var url in bookmarks){
		if(document.URL==url){
			console.log("duplicate detected");
			return false;
		}
	}
	return true;
}

function saveBookmark(){
	if(notAlreadySaved){
		var newBookmark = createBookmark();
		getGlobalStorage("bookmarks", function(bookmarks){
			bookmarks[document.URL] = newBookmark;
			saveGlobalStorage("bookmarks", bookmarks);
		});
		setTimeout(function(){
			grabBookmarks();	
		}, 200);
	}
}

function deleteBookmark(url){
	console.log("delete bookmark:"+url);
	var remainingBookmarks = {};
	getGlobalStorage("bookmarks", function(bookmarks){
		for(var bookmark in bookmarks){
			if(bookmark!=url){
				remainingBookmarks[bookmark] = bookmarks[bookmark];
			}
		}
		saveGlobalStorage("bookmarks", remainingBookmarks);
	});
	grabBookmarks();
}

function bookmarkView(){
	$('body').append('<div id="bookmark-view"><div id="bookmark-options"></div></div>');
	$('#bookmark-options').append('<div id="expand-bookmarks"> << </div>');
	$('#bookmark-options').append('<img id="add-bookmark" src="'+chrome.extension.getURL("images/plus.png")+'"/><br/>');
	$('#bookmark-options').append('<a id="clear-bookmarks">Clear All</a>');
	$('#bookmark-view').append('<ul id="bookmark-list"></ul>');
}

function grabBookmarks(){
	getGlobalStorage("bookmarks", function(bookmarks){
		$('#bookmark-list').empty();
		for(var key in bookmarks){
			$('#bookmark-list').append('<li class="bookmark-element"><a href="'+bookmarks[key]['url']+'"><div class="visual-bookmark">'+bookmarks[key]['title']+'</div></a><div class="delete-bookmark" url="'+bookmarks[key]['url']+'">delete</div></li>');
		}
	});
}