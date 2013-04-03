console.log('start.js');
getGlobalStorage("bookmarks", function(bookmarks){
  if(bookmarks == undefined || bookmarks == null) {
    saveGlobalStorage('bookmarks', {});
  }
  console.log(bookmarks);
});
console.log("Begin stuff");
bookmarkView();

$(document).live(function(){
  $('#expand-bookmarks').onclick(function(){
    console.log("expand");
  })
});