console.log('start.js');
getGlobalStorage("bookmarks", function(bookmarks){
  if(bookmarks == undefined || bookmarks == null) {
    saveGlobalStorage('bookmarks', {});
  }
  console.log(bookmarks);
});
getGlobalStorage("tags", function(tags){
  $('#tagsField').tagit({
    singleField: true,
    singleFieldNode: $('#tagsField')
  });
 $('#tagsField').tagit({
    beforeTagAdded: function(evt, ui) {
    if(!ui.duringInitialization) {
        ui.tag.draggable({
        zIndex: 1000,
        ghosting: true,
        revert: true,
        opacity: 0.7
        });
      }
    }
  }); 
  if(tags == undefined || tags == null) {
    var defaultTags = ["gif", "image", "video", "html"];
    saveGlobalStorage('tags', defaultTags);
    for(var t in defaultTags){
      $('#tagsField').tagit('createTag', defaultTags[t]);
    }
  }
  else{
    for(var t in tags){
      $('#tagsField').tagit('createTag',tags[t]);
    }
  }
});
bookmarkView();
grabBookmarks();
$('#tags-row').toggle();

$(document).ready(function(){
  $('#expand-bookmarks').click(function(){
    $('#bookmark-list').toggle();
    $('#clear-bookmarks').toggle();
    $('#reset-tags').toggle();
    console.log($('#bookmark-view').css('height'));
    if($('#bookmark-view').hasClass("expanded-view")){
		$('#bookmark-view').removeClass("expanded-view");
		$('#expand-bookmarks').html(" << ");
		$('#tags-row').toggle();
    }
    else{
		$('#bookmark-view').addClass("expanded-view");
		$('#expand-bookmarks').html(" >> ");
		$('#tags-row').toggle();
    }
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
      saveGlobalStorage('tags', tags);
    }, 300); 
  });
  $('body').on('click', '.tagit-choice', function(e){
    $('.bookmark-element').hide();
    $('.selected-tag').removeClass('selected-tag');
    $(this).addClass('selected-tag')
    var selector = '.tag-'+$(this).children('.tagit-label').html();
    $(selector).closest(".bookmark-element").show();
  });
  $('#reset-tags').click(function(e){
    $('.bookmark-element').show();
  });
});