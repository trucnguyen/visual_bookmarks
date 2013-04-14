// Init tags


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
	//google favicon: "value", https://plus.google.com/_/favicon?domain=
	return {
		"url": document.URL,
	    "domain": document.domain,		
		"title": document.title,
	    "time": Date.now(),
	    "image": getBiggestImage(),
	    "description": "",
	    "video": videoExtract(),
	    "pageType": pageType(),
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
	setTimeout(function(){
			grabBookmarks();	
		}, 200);
}

function bookmarkView(){
	$('body').append('<div id="bookmark-view"><div id="bookmark-options"></div></div>');
	$('#bookmark-options').append('<div id="expand-bookmarks"> << </div>');
	$('#bookmark-options').append('<img id="add-bookmark" src="'+chrome.extension.getURL("images/plus.png")+'"/><br/>');
	$('#bookmark-options').append('<a id="clear-bookmarks">Clear All</a>');
	$('#bookmark-view').append('<div id="tags-row"><form><ul id="tagsField" /></div>');
	$('#bookmark-view').append('<ul id="bookmark-list"></ul>');
}

function grabBookmarks(){
	getGlobalStorage("bookmarks", function(bookmarks){
		$('#bookmark-list').empty();
		for(var key in bookmarks){
			if(bookmarks[key]['pageType']=="video"){
			$('#bookmark-list').prepend('<li class="bookmark-element"><a href="'+bookmarks[key]['url']+'"><div class="visual-bookmark"><iframe class="bookmark-video" width="300" height="170" src="'+bookmarks[key]['video']+'" frameborder="0" allowfullscreen></iframe></div></a><div class="bookmark-title">'+bookmarks[key]['title']+'</div><a class="delete-bookmark" url="'+bookmarks[key]['url']+'">delete</a></li>');
			}
			else{
				$('#bookmark-list').prepend('<li class="bookmark-element"><a href="'+bookmarks[key]['url']+'"><div class="visual-bookmark"><img class="bookmark-image" src="'+bookmarks[key]['image']+'#ignore"/></div></a><div class="bookmark-title">'+bookmarks[key]['title']+'</div><a class="delete-bookmark" url="'+bookmarks[key]['url']+'">delete</a></li>');
			}
		}
		$('.bookmark-element').last().css('padding-bottom','40px');
	});
}


// Bind event handlers to tags and bookmark-elements
$(function()
{
    $('#tagsField').tagit({
	    beforeTagAdded: function(evt, ui) {
	        if (!ui.duringInitialization) {
	        	ui.tag.draggable({
					zIndex: 1000,
					ghosting: true,
					revert:	true,
					opacity: 0.7
				});
	        }
	    }
    });
    
    $('.bookmark-element').droppable({
    	drop: function(evt, ui){
    		$(this)
    			.addClass( "ui-state-highlight" )
    			.find(".bookmark-title")
    			.prepend("TAG " + ui.draggable.find(".tagit-label").text());
    	}
	});
});