var args = arguments[0] || {};

function onOpen() {
	var arr = [];
	for(var i = 0; i < 24; i++) {
		if(i > 9) {
			arr[i] = { hour:{text : i}};
		} else {
			arr[i] = { hour:{text : "0" + i}};
		}
	}
	$.listSectionDay.setItems(arr);
}
