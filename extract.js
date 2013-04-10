function videoExtract(){
	var url = document.URL;
	var iframe = jQuery('iframe');
	var youtube = 'http://www.youtube.com/watch?v=';
	var embed = 'http://www.youtube.com/embed/';
	var iframeSrc = '';
	if(url.indexOf(youtube)!=-1){
		console.log("This is a youtube video");
		docType = "video";
		iframeSrc = embed+url.substring(youtube.length);
	}
	/* Add method for checking if youtube is embedded
	else{
		for(var elem in iframe){
			var iframeSrc = iframe[elem].src
			if(iframeSrc!=undefined && iframeSrc.indexOf(embed)!=-1){
				console.log('This is an embedded youtube video');
				docType = "video";
				iframeSrc = iframe[elem].src+'';
				console.log(iframeSrc)
			}
		}
	}*/
	return iframeSrc;
}
function pageType(){
	var url = document.URL;
	var iframe = jQuery('iframe');
	var imageTypes = [".png", ".jpg"]
	var docType = "html";
	if(url.indexOf('.png')!=-1){ docType = "image";}
	else if(url.indexOf('.jpg')!=-1){ docType = "image";}
	else if(url.indexOf('.gif')!=-1){ docType = "gif";}
	else if(videoExtract()){ docType = "video"; }
	return docType;
}
function validImage(imageSrc){
	imageSrc = imageSrc.toLowerCase();
	var ignoreImage = ["chrome-extension","sprite","#ignore"];
	var valid = true;
	for(var i in ignoreImage){
		if(imageSrc.indexOf(ignoreImage[i])!=-1){
			valid = false;
		}
	}
	return valid;
}
function getBiggestImage(){
	pageType();
	var images = document.getElementsByTagName("img");
	var area = 0;
	var imageSrc = '';
	//ignore sprite, images from chrome://extension
	for(var i in images){
		var tempArea = (images[i]).width*(images[i]).height;
		var tempSrc = images[i].src+'';
		if(validImage(tempSrc) && tempArea>area){
			area = tempArea;
			imageSrc = tempSrc;
			console.log(imageSrc);
		}

	}
	return imageSrc;
}