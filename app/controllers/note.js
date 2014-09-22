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
    			icon: Ti.Android.R.drawable.ic_menu_delete,    	   
    			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
    		});
    		menuItem1.addEventListener("click", removeNote);
    	}
    	var menuItem2 = menu.add({
    		icon: Ti.Android.R.drawable.ic_menu_add,    	    
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
function checkBeforeSave() {
	var oneDay = 24*60*60*1000;
	var firstDate = new Date(startDate.year,startDate.month,startDate.day);
	var secondDate = new Date(endDate.year,endDate.month,endDate.day);	
	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	if(diffDays == 0) {
		if (checkDate(endDate.day, endDate.month, endDate.year)) {
			return true;
		} else {
			return false;
		}
	} else {	
		for(var i = 0; i < diffDays;i++) {
			if (checkDate(firstDate.getDate(), parseInt(firstDate.getMonth() + 1), firstDate.getFullYear())) {
				firstDate.setTime(firstDate.getTime() + 86400000);
			} else {
				return false;
			}		
		}
	}
	return true;	 
}

function colorPickerItemClick(e) {
	$.colorView.backgroundColor = e.section.getItems()[e.itemIndex].colorViewInPicker.backgroundColor;
	alert(e.section.getItems()[e.itemIndex].colorViewInPicker.backgroundColor);
	$.colorPickerView.visible = false;	
}

function colorPickerViewShow() {
	$.colorPickerView.visible = true;	
}

function checkDate(day, month, year) {	
	var noteCollection = Alloy.Collections.note;
    noteCollection.fetch();
    noteCollectionJSON = noteCollection.toJSON();		
    for(var i = 0; i < noteCollectionJSON.length; i++) {
    	if((noteCollectionJSON[i].startYear <= year) && (noteCollectionJSON[i].endYear >= year)) {
    		if(noteCollectionJSON[i].startYear == noteCollectionJSON[i].endYear) {
    			if((noteCollectionJSON[i].startMonth == noteCollectionJSON[i].endMonth) && (noteCollectionJSON[i].startDay == noteCollectionJSON[i].endDay) && (day == noteCollectionJSON[i].startDay) && (noteCollectionJSON[i].startMonth == month)) {
    				for(var j = startDate.hour; j <= endDate.hour; j++) {
    					if((noteCollectionJSON[i].startHour < j) && (noteCollectionJSON[i].endHour > j) || (noteCollectionJSON[i].startHour == j) || (noteCollectionJSON[i].endHour == j)) {
    						return true;			
    					}
    				}    				
    			} else {
    				var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    				var end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    				var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    				if(checkDay(start, end, current, noteCollectionJSON[i]), i) {
    					return true;
    				}			
    			}    			
    		} else {
    			for(var j = 0; j <= (parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear)); j++) {    				
    				if((parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear)) == 1) {
    					var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    					var end = new Date(noteCollectionJSON[i].startYear, 11, 31);
    					var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    					if(checkDay(start, end, current, i)) {
    						return true;
    					}    					
    					start = new Date(noteCollectionJSON[i].endYear, 0, 1);
    					end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);    					
    					if (checkDay(start, end, current, noteCollectionJSON[i]), i) {
    						return true;
    					}
    				} else {
    					if(j == 0) {
    						var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    						var end = new Date(noteCollectionJSON[i].startYear, 11, 31);
    						var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    						if(checkDay(start, end, current, noteCollectionJSON[i]), i) {
    							return true;
    						}
    						continue;
    					}
    					if(j == (parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear))) {
    						var start = new Date(noteCollectionJSON[i].endYear, 0, 1);
    						var end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    						var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    						if(checkDay(start, end, current, noteCollectionJSON[i]), i) {
    							return true;
    						}    						
    						continue;	
    					}
    					var start = new Date((parseInt(noteCollectionJSON[i].startYear) + parseInt(j)), 0, 1);
    				    var end = new Date((parseInt(noteCollectionJSON[i].startYear) + parseInt(j)), 11, 31);
    					var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    					if(checkDay(start, end, current, noteCollectionJSON[i]), i) {
    						return true;
    					}      					
    				}
    			}
    		}
    	}
	}
	return false;	
}

function checkDay(start, end, current, model, i) {
	var startDay = parseInt(getDayOfYear(start)) + parseInt(1);
    var endDay = parseInt(getDayOfYear(end)) + parseInt(1);    				
    var currentDay = parseInt(getDayOfYear(current)) + parseInt(1);
    if ((startDay < currentDay) && (currentDay < endDay)) {
    	return true;
    }
    if ((startDay == currentDay) && (endDay > currentDay)) {
    	for(var j = startDate.hour; j <= 24; j++) {
    		if((noteCollectionJSON[i].startHour < j) && (noteCollectionJSON[i].endHour > j) || (noteCollectionJSON[i].startHour == j) || (noteCollectionJSON[i].endHour == j)) {
    			return true;			
    		}
    	}
    }
    if ((endDay == currentDay) && (startDay < currentDay)) {
    	for(var j = 0; j <= endDate.hour; j++) {
    		if((noteCollectionJSON[i].startHour < j) && (noteCollectionJSON[i].endHour > j) || (noteCollectionJSON[i].startHour == j) || (noteCollectionJSON[i].endHour == j)) {
    			return true;			
    		}
    	}
    }
    return false;
}

function getDayOfYear(date) {
	var result = 0;
    daysInMonth[1] = isLeapYear(date) ? 29 : 28;
    for (var i = 0; i < date.getMonth(); ++i) {
        result += daysInMonth[i];
    }
    return result + date.getDate() - 1;
}

function isLeapYear(date) {
    year = date.getFullYear();
    return ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
}

var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

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
	Ti.App.fireEvent("app:updateViews");
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
