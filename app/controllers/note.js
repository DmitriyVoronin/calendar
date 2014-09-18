var args = arguments[0] || {};
var labelId;
var startDate = {
	day: 0,
	month: 0,
	year: 0,
	hour: 0,
	minute: 0,	
};
var endDate = {
	day: 0,
	month: 0,
	year: 0,
	hour: 0,
	minute: 0,	
};

function onOpen() {
	var activity = $.noteWindow.activity;	
	activity.actionBar.icon = "/logo1.png";		
	activity.actionBar.title = "Заметка";
    activity.onCreateOptionsMenu = function(e) {
    	var menu = e.menu;
    	var menuItem1 = menu.add({
    		title : "X",    	   
    		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
    	});
    	menuItem1.addEventListener("click", function(){
    		var noteCollection = Alloy.Collections.note;
    		noteCollection.fetch();
    		var a = noteCollection;    		
    	});
    	var menuItem2 = menu.add({
    		title : "ok",    	    
    		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
    	});
    	menuItem2.addEventListener("click", saveNote);   	
    };	
}

function showDatePicker(e) {
	labelId = e.source;
	$.dayPickerView.visible = "true";
}

function hideDataPicker() {
	$.dayPickerView.visible = "false";	 
	var dayName = dayNameByDayNumber($.dayPicker.value.getDay());
	if(parseInt($.dayPicker.value.getMonth()+1) > 9) {	
		var date = dayName + ", " + $.dayPicker.value.getDate() + "." + parseInt($.dayPicker.value.getMonth()+1) + "." + $.dayPicker.value.getFullYear();
	} else {
		var date = dayName + ", " + $.dayPicker.value.getDate() + "." + "0" + parseInt($.dayPicker.value.getMonth()+1) + "." + $.dayPicker.value.getFullYear();
	}
	labelId.text = date;
	$.dayPickerView.visible = "false";	
	if(labelId.id == "startDate") {
		startDate.day = $.dayPicker.value.getDate();
		startDate.month = parseInt($.dayPicker.value.getMonth()+1);
		startDate.year = $.dayPicker.value.getFullYear();
	}
	if(labelId.id == "endDate") {
		endDate.day = $.dayPicker.value.getDate();
		endDate.month = parseInt($.dayPicker.value.getMonth()+1);
		endDate.year = $.dayPicker.value.getFullYear();
	}
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
	if($.timePicker.value.getMinutes() > 9) {
		minutes = $.timePicker.value.getMinutes();
	} else {
		minutes = "0" + $.timePicker.value.getMinutes();
	}
	labelId.text = hours + ":" + minutes;	
	if(labelId.id == "startTime") {		
		startDate.hour = hours;
		startDate.minute = minutes;		
	}
	if(labelId.id == "endTime") {
		endDate.hour = hours;
		endDate.minute = minutes;	
	}
}

function saveNote() {
	var name = $.nameTextField.value;
	var place = $.placeTextField.value;
	var startDay = startDate.day;
	var startMonth = startDate.month;
	var startYear = startDate.year;
	var startHour = startDate.hour;
	var startMinutes = startDate.minute;
    var endDay = endDate.day; 
	var endMonth = endDate.month;
	var endYear = endDate.year;
	var endHour = endDate.hour;
	var endMinutes = endDate.minute;
	var guests = $.guestsTextiels.value;
	var description = $.descriptionTextField.value;
	var color = $.colorView.backgroundColor;
	var noteCollection = Alloy.Collections.note;
	var noteModel = Alloy.createModel('note', {
		"name": name,
		"place": place,
		"startDay": startDay,
		"startMonth": startMonth,
		"startYear": startYear,
		"startHour": startHour,
		"startMinutes": startMinutes,
		"endDay": endDay,
		"endMonth": endMonth,
		"endYear": endYear,
		"endHour": endHour,
		"endMinutes": endMinutes,
		"guests": guests,
		"description": description,
		"color": color
	});		
	noteCollection.add(noteModel);
	noteModel.save();
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
