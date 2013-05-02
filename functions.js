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
	    "tags": [pageType()]
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
	$('#bookmark-options').append('<a id="expand-bookmarks" class="opt-btn"> << </a>');
	$('#bookmark-options').append('<a id="add-bookmark" class="opt-btn"> + </a>');
	$('#bookmark-options').append('<a id="clear-bookmarks" class="opt-btn"> Clear All </a>');
	$('#bookmark-options').append('<a id="reset-tags" class="opt-btn"> View All </a>')
	$('#bookmark-view').append('<div id="tags-row"><ul id="tagsField" /></div>');
	$('#bookmark-view').append('<ul id="bookmark-list"></ul>');
}

function grabTags(url, tags){
	console.log(url, tags);
	for(var t in tags){
		$('.bookmark-url[href="'+url+'"] .bookmark-tags').append('<li class="tag-'+tags[t]+'">'+tags[t]+'</li>')
	}
}

function grabBookmarks(){
	getGlobalStorage("bookmarks", function(bookmarks){
		$('#bookmark-list').empty();
		for(var key in bookmarks){
			if(bookmarks[key]['pageType']=="video"){
			$('#bookmark-list').prepend('<li class="bookmark-element"><div class="bookmark-title"><a href="'+bookmarks[key]['url']+'">'+bookmarks[key]['title']+'</a></div><a class="delete-bookmark" url="'+bookmarks[key]['url']+'">delete</a><a class="bookmark-url" href="'+bookmarks[key]['url']+'"><ul class="bookmark-tags"></ul><iframe class="bookmark-video" width="300" height="170" src="'+bookmarks[key]['video']+'" frameborder="0" allowfullscreen></iframe></a></li>');
			}
			else{
				$('#bookmark-list').prepend('<li class="bookmark-element"><div class="bookmark-title"><a href="'+bookmarks[key]['url']+'">'+bookmarks[key]['title']+'</a></div><a class="delete-bookmark" url="'+bookmarks[key]['url']+'">delete</a><a class="bookmark-url" href="'+bookmarks[key]['url']+'"><ul class="bookmark-tags"></ul><img class="bookmark-image" src="'+bookmarks[key]['image']+'#ignore"/></a></li>');
			}
			grabTags(bookmarks[key]['url'], bookmarks[key]['tags']);
		}
/* 		$('.bookmark-element').last().css('padding-bottom','40px'); */
		$('.bookmark-element').droppable({
    		drop: function(evt, ui){
    		if($(this).find(".bookmark-tags").children('.tag-'+ui.draggable.find(".tagit-label").text()).length==0){
    			var url = $(this).find(".bookmark-url").attr('href');
    			console.log(url);
    			addTag(url, ui.draggable.find(".tagit-label").text())
    			$(this)
    			.addClass( "ui-state-highlight" )
    			.find(".bookmark-tags")
    			.prepend('<li class="tag-'+ui.draggable.find(".tagit-label").text()+'">'+ui.draggable.find(".tagit-label").text()+'</li>');
    		}
    	}
	});	
	});
}
function addTag(url, tag){
	getGlobalStorage("bookmarks", function(bookmarks){
		if(jQuery.inArray(tag, bookmarks[url]['tags'])==-1){
			bookmarks[url]['tags'].push(tag);
			saveGlobalStorage("bookmarks", bookmarks);
		}
		//bookmarks[url]['']
	});
}
// Bind event handlers to tags and bookmark-elements