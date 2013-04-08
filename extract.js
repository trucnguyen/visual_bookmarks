function getBiggestImage(){
	var images = document.getElementsByTagName("img");
	var ignoreSrc = ["chrome-extension://"]
	var area = 0;
	var imageSrc = '';

	for(var i in images){
		var tempArea = (images[i]).width*(images[i]).height;
		if(tempArea>area){
			area = tempArea;
			imageSrc = images[i].src+'';
			console.log(imageSrc);
		}

	}

	return imageSrc;
	/*var images = $('img');
	var imageSrc = '';
	var area = 0;
	for(var i in images){
		var tempArea = images[i].width*images[i].height;
		var tempSrc = $(images[i]).attr('src');
		if(tempArea>area && tempSrc !=undefined & tempSrc !="" && tempSrc.indexOf("chrome-extension")==-1){
			imageSrc = tempSrc;
			console.log(imageSrc+': '+tempArea);
			area = tempArea;
		}
	}
	console.log(imageSrc);
	return imageSrc;*/
}