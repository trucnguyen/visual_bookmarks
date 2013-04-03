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
}

function createBookmark(){
	return {
		"url": document.URL,
		"title": document.title,
	    "time": Date.now()
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
	}
}

function deleteBookmark(url){
	var remainingBookmarks = {};
	getGlobalStorage("bookmarks", function(bookmarks){
		for(var bookmark in bookmarks){
			if(bookmarks[bookmark]!=url){
				remainingBookmarks[bookmark] = bookmarks[bookmark];
			}
		}
		saveGlobalStorage("bookmarks", remainingBookmarks);
	});
}

function bookmarkView(){
	$('body').append('<div id="bookmark-view"></div>');
	$('#bookmark-view').append('<img id="add-bookmark" src="'+chrome.extension.getURL("images/plus.png")+'"/><br/>');
	$('#bookmark-view').append('<div id="expand-bookmarks"> << </div><br/>');
	$('#bookmark-view').append('<ul id="bookmark-list"></ul>');
}

function grabBookmarks(){
	$('#bookmark-list').empty()
	getGlobalStorage("bookmarks", function(bookmarks){
		for(var bookmark in bookmarks){
			$('#bookmark-list').append('<div class="visual-bookmark">'+bookmark+'</div>')
		}
	});
}