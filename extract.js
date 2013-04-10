function validImage(imageSrc){
	console.log("validImage");
	imageSrc = imageSrc.toLowerCase();
	var ignoreImage = ["chrome-extension","sprite","#ignore"];
	var valid = true;
	for(var i in ignoreImage){
		if(imageSrc.indexOf(ignoreImage[i])!=-1){
			valid = false;
		}
	}
	console.log(valid);
	return valid;
}
function getBiggestImage(){
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