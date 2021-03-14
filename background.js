chrome.commands.onCommand.addListener(function(command){
	console.log(command)
	if(command == "focus-search-bar"){
		console.log("Sending message")
		chrome.tabs.query({ active : true, currentWindow : true }, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, "focus")
		})
	}
})