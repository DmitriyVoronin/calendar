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
    	if(args.id) {
    		var menuItem1 = menu.add({
    			title : "X",    	   
    			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
    		});
    		menuItem1.addEventListener("click", removeNote);
    	}
    	var menuItem2 = menu.add({
    		title : "ok",    	    
    		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
    	});
    	menuItem2.addEventListener("click", saveNote);   	
    };	
	if(args.day && args.year && args.month) {
		var pickerDate = new Date(args.year, (parseInt(args.month) - parseInt(1)), args.day);
		var dayName = dayNameByDayNumber(pickerDate.getDay());
		if(parseInt(pickerDate.getMonth() + 1) > 9) {	
			var month = parseInt(pickerDate.getMonth() + 1);
		} else {
			var month = "0" + parseInt(pickerDate.getMonth() + 1);
		}
		if(pickerDate.getDate() > 9) {	
			var day = pickerDate.getDate();
		} else {
			var day = "0" + pickerDate.getDate();
		}
		$.startDate.text = dayName + ", " + day + "." + month + "." + pickerDate.getFullYear();
		$.startDate.touchEnabled = "false";
		$.endDate.text = dayName + ", " + day + "." + month + "." + pickerDate.getFullYear();
		$.endDate.touchEnabled = "false";
		startDate.day = pickerDate.getDate();
		startDate.month = parseInt(pickerDate.getMonth() + 1);
		startDate.year = pickerDate.getFullYear();	
		endDate.day = pickerDate.getDate();
		endDate.month = parseInt(pickerDate.getMonth() + 1);
		endDate.year = pickerDate.getFullYear();		
	}
	if(args.id) {
		var noteCollection = Alloy.Collections.note;
    	noteCollection.fetch();
    	noteCollectionJSON = noteCollection.toJSON();
    	model = _.findWhere(noteCollectionJSON, {id: args.id});
    	$.nameTextField.value = model.name;
		$.placeTextField.value = model.place;
		startDate.day = model.startDay;
		startDate.month = model.startMonth;
		startDate.year = model.startYear;
		startDate.hour = model.startHour;
		startDate.minute = model.startMinutes;
    	endDate.day = model.endDay; 
		endDate.month = model.endMonth;
		endDate.year = model.endYear;
		endDate.hour = model.endHour;
		endDate.minute = model.endMinutes;
		$.guestsTextiels.value = model.guests;
		$.descriptionTextField.value = model.description;
		$.colorView.backgroundColor = model.color;	
		if(startDate.month > 9) {	
			var month = startDate.month;
		} else {
			var month = "0" + startDate.month;
		}
		if(startDate.day > 9) {	
			var day = startDate.day;
		} else {
			var day = "0" + startDate.day;
		}
		var modelDate = new Date(startDate.year, (parseInt(startDate.month) - parseInt(1)), startDate.day);
		var dayName = dayNameByDayNumber(modelDate.getDay());
		$.startDate.text = " " + dayName + ", " + day + "." + month + "." + startDate.year;
		if(endDate.month > 9) {	
			month = endDate.month;
		} else {
			month = "0" + endDate.month;
		}
		if(endDate.day > 9) {	
			day = endDate.day;
		} else {
			day = "0" + endDate.day;
		}		
		modelDate = new Date(endDate.year, (parseInt(endDate.month) - parseInt(1)), endDate.day);
		dayName = dayNameByDayNumber(modelDate.getDay());
		$.endDate.text = " " + dayName + ", " + day + "." + month + "." + endDate.year;
		if(endDate.hour > 9) {	
			var hour = endDate.hour;
		} else {
			var hour = "0" + endDate.hour;
		}
		if(endDate.minute > 9) {	
			var minute = endDate.minute;
		} else {
			var minute = "0" + endDate.minute;
		}	
		$.endTime.text = hour + ":" + minute;
		if(startDate.hour > 9) {	
			hour = startDate.hour;
		} else {
			hour = "0" + startDate.hour;
		}
		if(startDate.minute > 9) {	
			minute = startDate.minute;
		} else {
			minute = "0" + startDate.minute;
		}	
		$.startTime.text = hour + ":" + minute;		
	}    
}

function showDatePicker(e) {
	labelId = e.source;
	$.dayPickerView.visible = "true";
}

function hideDataPicker() {
	$.dayPickerView.visible = "false";	 
	var dayName = dayNameByDayNumber($.dayPicker.value.getDay());
	if(parseInt($.dayPicker.value.getMonth()+1) > 9) {	
		var month = parseInt($.dayPicker.value.getMonth()+1);
	} else {
		var month = "0" + parseInt($.dayPicker.value.getMonth()+1);
	}
	if($.dayPicker.value.getDate() > 9) {	
		var day = $.dayPicker.value.getDate();
	} else {
		var day = "0" + $.dayPicker.value.getDate();
	}
	labelId.text = dayName + ", " + day + "." + month + "." + $.dayPicker.value.getFullYear();
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
	if(args.id) {		
    	noteCollection.fetch();
    	var model = noteCollection.where({id: args.id})[0];
    	model.set({
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
    	model.save();
	} else {		
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
	$.noteWindow.close();
	if((args.day && args.year && args.month) || args.id) {
		Ti.App.fireEvent("app:updateViews");
	}
}

function removeNote() {
	var noteCollection = Alloy.Collections.note;			
    noteCollection.fetch();
    var model = noteCollection.where({id: args.id})[0];   	
    model.destroy();
    $.noteWindow.close();
    Ti.App.fireEvent("app:updateViews");
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
