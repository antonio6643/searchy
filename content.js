function IsSearchRelated(element){
	let curId = (element.id || "").toLowerCase()
	let placeholder = (element.placeholder || "").toLowerCase()
	let title = (element.title || "").toLowerCase()
	let name = (element.name || "").toLowerCase()
	let className = (element.className || "").toLowerCase()
	return (
		curId.indexOf("search") >= 0 || 
		placeholder.indexOf("search") >= 0 || 
		title.indexOf("search") >= 0 || 
		name.indexOf("search") >= 0 ||
		className.indexOf("search") >= 0
	)
}

function FindSearchbar(){
	let inputElements = document.getElementsByTagName("input")
	for(let n=0; n < inputElements.length; n++){
		let currentElement = inputElements[n]
		if(currentElement.type == "search"){
			return currentElement
		} else if(currentElement.type == "text"){
			if(IsSearchRelated(currentElement)){
				return currentElement
			}
		}
	}
}

function FindSearchButton(){
	let interactives = [...document.getElementsByTagName("button"), ...document.getElementsByTagName("input")]
	for(let n=0; n < interactives.length; n++){
		let currentElement = interactives[n]
		if(currentElement.tagName.toLowerCase() == "button" || currentElement.type == "button"){
			if(IsSearchRelated(currentElement)){
				return currentElement
			}
		}
	}
}

console.log("Content loaded")

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request == "focus"){
		let Searchbar = FindSearchbar()
		if(Searchbar){
			Searchbar.focus()
		} else { // Look for a search button
			let SearchButton = FindSearchButton()
			if(SearchButton){
				SearchButton.click()
				let KnuSearchbar = FindSearchbar()
				if(KnuSearchbar){
					KnuSearchbar.focus()
				}
			}
		}
	}
})