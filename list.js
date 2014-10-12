// clear all text from text input field
function clearText() {
	document.getElementById('newItem').value = "";
}

// add item to list and save to cookie if input specifies
function addItem(addMe, cookie)
{
	if (/\S+/.test(addMe)) { // make sure input has at least one non-whitespace character
		// add input to list
		var list = document.getElementById('list');
		list.innerHTML = list.innerHTML + '<li id="' + addMe + '" class="list-group-item">' + addMe + '<input type="button" class="btn btn-danger btn-xs" onclick="removeItem(\'' + addMe + '\');" style="float: right;" value="remove"></li>';

		// clear all text from text input field
		clearText();

		// create/update cookie
		if (cookie) {
			setCookie();
		}
	}
	return false; // disables form submission
}

// removes item specified in input and saves to cookie
function removeItem(removeMe)
{
	var toRemove = document.getElementById(removeMe);
	toRemove.parentNode.removeChild(toRemove);

	setCookie();
}

// removes all items from list and saves to cookie
function removeAll(){
	var items = document.getElementsByClassName('list-group-item');

	for (var i = items.length - 1; i >= 0; i--) {
		items[i].parentNode.removeChild(items[i]);
	}

	setCookie();
}

// sets cookie to remember contents of list
function setCookie(){
	var items = document.getElementsByClassName("list-group-item");
	var itemText = new Array();
	for (var i = 0; i < items.length; i++){
		itemText[i] = items[i].id;
	}
	document.cookie = "items=" + itemText.join("|");
}

// gets contents of previous list from cookie and puts in list
function getCookie(){
	// get items cookie
	var items = "";
	var name = "items=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
	  	if (c.indexOf(name) == 0) {
	  		var items = c.substring(name.length, c.length);
	  	}
	}

	// add each item to list
	items = items.split("|");
	for (var i = 0; i < items.length; i++){
		addItem(items[i], false);
	}
}