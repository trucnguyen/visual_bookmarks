console.log('start.js');
getGlobalStorage("bookmarks", function(bookmarks){
  if(bookmarks == undefined || bookmarks == null) {
    saveGlobalStorage('bookmarks', {});
  }
  console.log(bookmarks);
});
console.log("Begin stuff");
bookmarkView();
grabBookmarks();
$(document).ready(function(){
  $('#expand-bookmarks').click(function(){
    $('#bookmark-list').toggle();
  })
  $('#add-bookmark').click(function(){
    saveBookmark();
    grabBookmarks();
    $('#bookmark-list').show();

  })
});