var args = arguments[0] || {};
var labelId;

function onOpen() {
	var a = $.dsa;
	var b =a;	
}

function showDatePicker(e) {
	labelId = e.source;
	$.dayPickerView.visible = "true";
}

function hideDataPicker() {
	$.dayPickerView.visible = "false";	 
	var dayName = dayNameByDayNumber($.dayPicker.value.getDay());
	if(parseInt($.dayPicker.value.getMonth()+1) > 9) {	
		var a = dayName + ", " + $.dayPicker.value.getDate() + "." + parseInt($.dayPicker.value.getMonth()+1) + "." + $.dayPicker.value.getFullYear();
	} else {
		var a = dayName + ", " + $.dayPicker.value.getDate() + "." + "0" + parseInt($.dayPicker.value.getMonth()+1) + "." + $.dayPicker.value.getFullYear();
	}
	labelId.text = a;
	$.dayPickerView.visible = "false";	
}

function showTimePicker(e) {
	labelId = e.source;	
	$.timePickerView.visible = "true";
	
}

function hideTimePicker() {
	$.timePickerView.visible = "false";
	var hours, minutes;
	if($.timePicker.value.getHours() > 9) {
		hours = $.timePicker.value.getHours();
	} else {
		hours = "0" + $.timePicker.value.getHours();
	}
	if($.timePicker.value.getHours() > 9) {
		minutes = $.timePicker.value.getMinutes();
	} else {
		minutes = "0" + $.timePicker.value.getMinutes();
	}
	labelId.text = hours + ":" + minutes;	
}


function dayNameByDayNumber(dayNumber) {
	var dayName;
	if(dayNumber == 1) {
    	dayName = "Пн";
    }
    if(dayNumber == 2) {
    	dayName = "Вт";
    }
    if(dayNumber == 3) {
    	dayName = "Ср";
    }
    if(dayNumber == 4) {
    	dayName = "Чт";
    }
    if(dayNumber == 5) {
    	dayName = "Пт";
    }
    if(dayNumber == 6) {
    	dayName = "Сб";
    }
    if(dayNumber == 0) {
    	dayName = "Вс";
    }
    return dayName;
}
