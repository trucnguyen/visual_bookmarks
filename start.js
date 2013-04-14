console.log('start.js');
getGlobalStorage("bookmarks", function(bookmarks){
  if(bookmarks == undefined || bookmarks == null) {
    saveGlobalStorage('bookmarks', {});
  }
  console.log(bookmarks);
});
getGlobalStorage("tags", function(tags){
  if(tags == undefined || tags == null) {
    saveGlobalStorage('tags', []);
  }
  else{
    $('#tagsField').tagit({
        // This will make Tag-it submit a single form value, as a comma-delimited field.
        singleField: true,
        singleFieldNode: $('#tagsField')
    });
    for(var t in tags){
      $('#tagsField').tagit('createTag',tags[t]);
    }
  }
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
  });
  $('#clear-bookmarks').click(function(){
    clearBookmarks();
  });
  $('body').on('click', '.delete-bookmark', function(e){
    
    console.log("Win");
    deleteBookmark(jQuery(jQuery(this)[0]).attr('url'));
    //console.log(jQuery(this).children('.deleteBookmark').attr('url'));
    //deleteBookmark(jQuery(this).attr('url'));
  });
  $('#tagsField').change(function(e){
    setTimeout(function(){
      var tags = [];
      for(var t=0; t<jQuery('#tagsField .tagit-choice .tagit-label').length; t++){
        tags.push(jQuery(jQuery('#tagsField .tagit-choice .tagit-label')[t]).html());  
      }
      console.log(tags);
      saveGlobalStorage('tags', tags);
    }, 300); 
  });
});