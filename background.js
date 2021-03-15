chrome.commands.onCommand.addListener(function(command){
	if(command == "focus-search-bar"){
		chrome.tabs.query({ active : true, currentWindow : true }, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, "focus")
		})
	}
})