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
    $('#clear-bookmarks').toggle();
  });
  $('#add-bookmark').click(function(){
    saveBookmark();
    $('#bookmark-list').show();
  });
  $('#clear-bookmarks').click(function(){
    clearBookmarks();
  });
  $('.delete-bookmark').click(function(e){
    console.log("Win");
    console.log(jQuery(this).attr('url'));
    deleteBookmark(jQuery(this).attr('url'));
  });
});