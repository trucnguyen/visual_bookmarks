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
	"url": url,
    "time": Date.now()
  };
}

function saveBookmark(){
	var newBookmark = createBookmark();
	getGlobalStorage("bookmarks", function(bookmarks){
		bookmarks.push(newBookmark);
	});
}
function deleteBookmark(url){
	var remainingBookmarks = {};
	getGlobalStorage("bookmarks", function(bookmarks){
		for(var bookmark in bookmarks){
			if(bookmarks[bookmark]["url"]!=url){
				remainingBookmarks.push(bookmarks[bookmark]);
			}
		}
		saveGlobalStorage("bookmarks", remainingBookmarks);
	});
}


