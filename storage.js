chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
if(request.cmd == "getHistory") {
 var pgLimit = parseInt(localStorage["num_pg_limit"]);
 var startTime = parseInt(localStorage["start_time"]);
 var microsecondsPerDay = 1000 * 60 * 60 * 24;
 var microsecondsPerWeek = microsecondsPerDay * 7;

 if(!startTime) startTime = 2;
 if(!pgLimit) pgLimit = 100;

 startTime = (new Date).getTime() - microsecondsPerWeek * startTime;
 // console.log(startTime);
 chrome.history.search({
   'text': '',
   'startTime': startTime,
   'maxResults': pgLimit
 	}, 
 	function(historyItems){
 	  sendResponse(historyItems);

}
 );
}
else if(request.cmd == "getStorage") {
 var json = localStorage.getItem(request.key);
 if (json == null)
   sendResponse(undefined);
 try {
   sendResponse(JSON.parse(json));
 } catch (e) {
   log("Couldn't parse json for " + key);
   sendResponse(undefined);
 }
}
else if(request.cmd == "saveStorage") {
 if (request.value === undefined) {
   localStorage.removeItem(request.key);
   return;
 }
 try {
   localStorage.setItem(request.key, JSON.stringify(request.value));
 } catch (ex) {
   if (ex.name == "QUOTA_EXCEEDED_ERR") {
     alert("storage_quota_exceeded");
   }
 }
}
else if(request.cmd == "openDigest"){
chrome.tabs.create({
     'url': chrome.extension.getURL("/digest.html")
   }, function(tab){

   });
}
else if(request.cmd == "getURL"){
sendResponse(sender.tab.url);
}
else{
 sendResponse("invalid command");
}
});
