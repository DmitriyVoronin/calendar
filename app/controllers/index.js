var dateForCalculation = {
	currentMonthFirstDayNumber: 0,
	currentMonthLastDayNUmber: 0,
	number: 0
};

function asd(){
	var image;
	var opengallery = Ti.UI.createOptionDialog({
    title:'Image Saved',
    options:['Open Photo Gallery', 'Close']
    });
 
	opengallery.addEventListener('click', function(e) {
    	Titanium.Media.openPhotoGallery({
    		success:function(event){
        		image = event.media;
        	}
     });
    }); 
	opengallery.show();
	$.mainWindow.backgroundImage = image;
}

function onOpen() {
	$.activityIndicatorBackground.visible = true;
	$.activityIndicator.show();
	var activity = $.mainWindow.activity;
	activity.actionBar.title = " ";
	activity.actionBar.icon = "/logo1.png";		
    activity.onCreateOptionsMenu = function(e) {
    	var menu = e.menu;
    	var menuItem1 = menu.add({
    		title : "Добавить заметку",    	    
    	});
    	menuItem1.addEventListener("click", function(){
    		var win = Alloy.createController("note").getView();    
    		win.open();
    	});
    	var menuItem2 = menu.add({
    		title : "Изменить фон",    	    
    	});
    	menuItem2.addEventListener("click", asd);   	
    }; 
    	
	var moment = require('alloy/moment');
	//moment.lang('ru');	
    var date = moment().format('MMMM');
    var ruMonth;    
    if (date == "January ") {
    	ruMonth = "Январь";    	
    }
    if (date == "February") {
    	ruMonth = "Февраль";    	
    }
    if (date == "March") {
    	ruMonth = "Март";
    }
    if (date == "April") {
    	ruMonth = "Апрель";
    }
    if (date == "May") {
    	ruMonth = "Май";
    }
    if (date == "June") {
    	ruMonth = "Июнь";
    }
    if (date == "July") {
    	ruMonth = "Июль";
    }
    if (date == "August") {
    	ruMonth = "Август";
    }
    if (date == "September") {
    	ruMonth = "Сентябрь";
    }
    if (date == "October") {
    	ruMonth = "Октябрь";
    }
    if (date == "November") {
    	ruMonth = "Ноябрь";
    }
    if (date == "December") {
    	ruMonth = "Декабрь";
    }
    $.MonthLabel.text = ruMonth;
    var number = moment().format('DD');
    $.YearLabel.text = moment().format('YYYY');  
    var dayName = moment().format('dddd');
    var dayNumber = dayNumberByDayName(dayName);  
    monthPrepare(number, dayNumber, ruMonth);   
    $.activityIndicator.hide();
    $.activityIndicatorBackground.visible = false;
}

Ti.App.addEventListener("app:updateViews", onOpen);
function monthPrepare(number, dayNumber, monthName) {
	var currentMothDayCount, prevMonthDayCount, year = parseInt($.YearLabel.text);
	if ($.MonthLabel.text == "Январь") {
    	currentMothDayCount = 31;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Февраль") {    	
    	if(year%4 == 0){
    		currentMothDayCount = 29;
    	} else {
    		currentMothDayCount = 28;
    	}
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Март") {
    	currentMothDayCount = 31;
    	if(year%4 == 0){
    		prevMonthDayCount = 29;
    	} else {
    		prevMonthDayCount = 28;
    	}
    }
    if ($.MonthLabel.text == "Апрель") {
		currentMothDayCount = 30;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Май") {
		currentMothDayCount = 31;
    	prevMonthDayCount = 30;    	
    }
    if ($.MonthLabel.text == "Июнь") {
		currentMothDayCount = 30;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Июль") {
		currentMothDayCount = 31;
    	prevMonthDayCount = 30;    	
    }
    if ($.MonthLabel.text == "Август") {
		currentMothDayCount = 31;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Сентябрь") {
    	currentMothDayCount = 30;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Октябрь") {
    	currentMothDayCount = 31;
    	prevMonthDayCount = 30;    	
    }
    if ($.MonthLabel.text == "Ноябрь") {
    	currentMothDayCount = 30;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Декабрь") {
    	currentMothDayCount = 31;
    	prevMonthDayCount = 30;
    }    
    fillMonth(currentMothDayCount, prevMonthDayCount, number, dayNumber, monthName);	
}

function fillMonth(dayCount, dayCountPrev, number, dayNumber, monthName) {	
            
    var dayNumberOfFirst = dayNumber;
    for (var i= 1; i < 31; i++) {
    	if(parseInt(number) - parseInt(i) == 0) {
    		break;
    	}    	
    	dayNumberOfFirst--;
    	if(dayNumberOfFirst == -1) {
    		dayNumberOfFirst = 6;
    	}
    }
    dateForCalculation.currentMonthFirstDayNumber = dayNumberOfFirst;
    month = [];   
    color = [];
    for(var i = 0; i < 42; i++) {
    	if (i < dayNumberOfFirst) {    		
    		month[i] = parseInt(dayCountPrev) - parseInt(dayNumberOfFirst) + parseInt(1) + parseInt(i);
    	}
    	if (i == dayNumberOfFirst) {
    		month[i] = 1;
    		color[i] = "#0E1E31";
    		if((month[i] == moment().format('DD')) && ($.MonthLabel.text == monthName) && ($.YearLabel.text == moment().format('YYYY'))) {
				color[i] = "gray";    		
    		}	
    	}
    	if ((i > dayNumberOfFirst) && i < (parseInt(dayCount) + parseInt(dayNumberOfFirst))) {
    		month[i] = parseInt(month[i - 1]) + parseInt(1);    		
    		color[i] = "#0E1E31";    		
    		if((month[i] == moment().format('DD')) && ($.MonthLabel.text == monthName) && ($.YearLabel.text == moment().format('YYYY'))) {
				color[i] = "gray";    		
    		}
    	}
    	if (i > (parseInt(dayCount) + parseInt(dayNumberOfFirst) - parseInt(1))) {      		
    		month[i] = parseInt(i) - parseInt(dayCount) - parseInt(dayNumberOfFirst) + parseInt(1);
    	}
    	if (i == (parseInt(dayCount) + parseInt(dayNumberOfFirst) - parseInt(1))) {
    		dateForCalculation.currentMonthLastDayNUmber = parseInt(i)%7;    		
    	}
    }
    for(var i = 0; i < 42; i++) {
    	if(month[i] < 10) {
    		month[i] = "  " + month[i];
    	}
    }
    dateForCalculation.number =  dayCountPrev;
    var labelArr = [];  
    labelArr[0] = $.lbl11;
    labelArr[1] = $.lbl12;
    labelArr[2] = $.lbl13;
    labelArr[3] = $.lbl14;
    labelArr[4] = $.lbl15;
    labelArr[5] = $.lbl16;
    labelArr[6] = $.lbl17;
    labelArr[7] = $.lbl21;
    labelArr[8] = $.lbl22;
    labelArr[9] = $.lbl23; 
    labelArr[10] = $.lbl24;
    labelArr[11] = $.lbl25;
    labelArr[12] = $.lbl26;
    labelArr[13] = $.lbl27;
    labelArr[14] = $.lbl31;
    labelArr[15] = $.lbl32;
    labelArr[16] = $.lbl33;
    labelArr[17] = $.lbl34;
    labelArr[18] = $.lbl35;
    labelArr[19] = $.lbl36;
    labelArr[20] = $.lbl37;
    labelArr[21] = $.lbl41;
    labelArr[22] = $.lbl42;
    labelArr[23] = $.lbl43;
    labelArr[24] = $.lbl44;
    labelArr[25] = $.lbl45;
    labelArr[26] = $.lbl46;
    labelArr[27] = $.lbl47;
    labelArr[28] = $.lbl51;
    labelArr[29] = $.lbl52;
    labelArr[30] = $.lbl53;
    labelArr[31] = $.lbl54;
    labelArr[32] = $.lbl55;
    labelArr[33] = $.lbl56;
    labelArr[34] = $.lbl57;
    labelArr[35] = $.lbl61;
    labelArr[36] = $.lbl62;
    labelArr[37] = $.lbl63;
    labelArr[38] = $.lbl64;
    labelArr[39] = $.lbl65;
    labelArr[40] = $.lbl66;
    labelArr[41] = $.lbl67;
    for(var i = 0; i < 42; i++) {
    	labelArr[i].text = month[i];
    	labelArr[i].color = color[i];
    	labelArr[i].backgroundImage = "/background.png";
    	if(labelArr[i].color) {    		
    		if(checkDate(labelArr[i].text, monthNumberByName($.MonthLabel.text), $.YearLabel.text)){
    			labelArr[i].backgroundImage = "/triangle2.png";
    		}
    	}
    }
}

function dayClick(e) {
	var data = {
		day: e.source.text,
		month: monthNumberByName($.MonthLabel.text),
		year: $.YearLabel.text
	};
	var win = Alloy.createController("day", data).getView();    
    win.open();
}

function dayNumberByDayName(dayName) {
	var dayNumber;
	if(dayName == "Monday") {
    	dayNumber = 0;
    }
    if(dayName == "Tuesday") {
    	dayNumber = 1;
    }
    if(dayName == "Wednesday") {
    	dayNumber = 2;
    }
    if(dayName == "Thursday") {
    	dayNumber = 3;
    }
    if(dayName == "Friday") {
    	dayNumber = 4;
    }
    if(dayName == "Saturday") {
    	dayNumber = 5;
    }
    if(dayName == "Sunday") {
    	dayNumber = 6;
    }
    return dayNumber;
}

function onClickMonthBack() {	
	$.activityIndicatorBackground.visible = true;
	$.activityIndicator.show();
	if($.MonthLabel.text == 'Февраль') {
		$.MonthLabel.text = 'Январь';	
	}
	else if($.MonthLabel.text == 'Март') {
		$.MonthLabel.text = 'Февраль';	
	}
	else if($.MonthLabel.text == 'Апрель') {
		$.MonthLabel.text = 'Март';	
	}
	else if($.MonthLabel.text == 'Май') {
		$.MonthLabel.text = 'Апрель';	
	}
	else if($.MonthLabel.text == 'Июнь') {
		$.MonthLabel.text = 'Май';	
	}
	else if($.MonthLabel.text == 'Июль') {
		$.MonthLabel.text = 'Июнь';	
	}
	else if($.MonthLabel.text == 'Август') {
		$.MonthLabel.text = 'Июль';	
	}
	else if($.MonthLabel.text == 'Сентябрь') {
		$.MonthLabel.text = 'Август';	
	}
	else if($.MonthLabel.text == 'Октябрь') {
		$.MonthLabel.text = 'Сентябрь';	
	}
	else if($.MonthLabel.text == 'Ноябрь') {
		$.MonthLabel.text = 'Октябрь';	
	}
	else if($.MonthLabel.text == 'Декабрь') {
		$.MonthLabel.text = 'Ноябрь';		
	}
	else if($.MonthLabel.text == 'Январь') {
		$.MonthLabel.text = 'Декабрь';
		$.YearLabel.text = parseInt($.YearLabel.text) - 1;	
	}	
	var sendDayNumber;
	if((parseInt(dateForCalculation.currentMonthFirstDayNumber) - parseInt(1)) == -1) {
		sendDayNumber = 6;
	} else {
		sendDayNumber = parseInt(dateForCalculation.currentMonthFirstDayNumber) - parseInt(1);
	}
	
	monthPrepare(dateForCalculation.number, sendDayNumber);
	$.activityIndicatorBackground.visible = false;
	$.activityIndicator.hide();
}

function onClickMonthForward() {
	$.activityIndicatorBackground.visible = true;
	$.activityIndicator.show();
	if($.MonthLabel.text == 'Январь') {
		$.MonthLabel.text = 'Февраль';	
	}
	else if($.MonthLabel.text == 'Февраль') {
		$.MonthLabel.text = 'Март';	
	}
	else if($.MonthLabel.text == 'Март') {
		$.MonthLabel.text = 'Апрель';	
	}
	else if($.MonthLabel.text == 'Апрель') {
		$.MonthLabel.text = 'Май';	
	}
	else if($.MonthLabel.text == 'Май') {
		$.MonthLabel.text = 'Июнь';	
	}
	else if($.MonthLabel.text == 'Июнь') {
		$.MonthLabel.text = 'Июль';	
	}
	else if($.MonthLabel.text == 'Июль') {
		$.MonthLabel.text = 'Август';	
	}
	else if($.MonthLabel.text == 'Август') {
		$.MonthLabel.text = 'Сентябрь';	
	}
	else if($.MonthLabel.text == 'Сентябрь') {
		$.MonthLabel.text = 'Октябрь';	
	}
	else if($.MonthLabel.text == 'Октябрь') {
		$.MonthLabel.text = 'Ноябрь';	
	}
	else if($.MonthLabel.text == 'Ноябрь') {
		$.MonthLabel.text = 'Декабрь';	
	}
	else if($.MonthLabel.text == 'Декабрь') {
		$.MonthLabel.text = 'Январь';	
		$.YearLabel.text = parseInt($.YearLabel.text) + 1;
	}
	var sendDayNumber;
	if((parseInt(dateForCalculation.currentMonthLastDayNUmber) + parseInt(1)) == 7) {
		sendDayNumber = 0;
	} else {
		sendDayNumber = parseInt(dateForCalculation.currentMonthLastDayNUmber) + parseInt(1);
	}
	
	monthPrepare(1, sendDayNumber);
	$.activityIndicatorBackground.visible = false;
	$.activityIndicator.hide();
}

function monthNumberByName(monthName) {
	var monthNumber;
	if (monthName == "Январь") {
    	monthNumber = 1;
    }
    if (monthName == "Февраль") {    	
    	monthNumber = 2;
    }
    if (monthName == "Март") {
    	monthNumber = 3;
    }
    if (monthName == "Апрель") {
		monthNumber = 4;
    }
    if (monthName == "Май") {
		monthNumber = 5;
    }
    if (monthName == "Июнь") {
		monthNumber = 6;
    }
    if (monthName == "Июль") {
		monthNumber = 7;
    }
    if (monthName == "Август") {
		monthNumber = 8;
    }
    if (monthName == "Сентябрь") {
    	monthNumber = 9;
    }
    if (monthName == "Октябрь") {
    	monthNumber = 10;
    }
    if (monthName == "Ноябрь") {
    	monthNumber = 11;
    }
    if (monthName == "Декабрь") {
    	monthNumber = 12;
    }
    return monthNumber;
}

function checkDate(day, month, year) {	
	var noteCollection = Alloy.Collections.note;
    noteCollection.fetch();
    noteCollectionJSON = noteCollection.toJSON();		
    for(var i = 0; i < noteCollectionJSON.length; i++) {
    	if((noteCollectionJSON[i].startYear <= year) && (noteCollectionJSON[i].endYear >= year)) {
    		if(noteCollectionJSON[i].startYear == noteCollectionJSON[i].endYear) {
    			if((noteCollectionJSON[i].startMonth == noteCollectionJSON[i].endMonth) && (noteCollectionJSON[i].startDay == noteCollectionJSON[i].endDay) && (day == noteCollectionJSON[i].startDay) && (noteCollectionJSON[i].startMonth == month)) {
    				return true;    				
    			} else {
    				var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    				var end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    				var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    				if(checkDay(start, end, current, noteCollectionJSON[i])) {
    					return true;
    				}			
    			}    			
    		} else {
    			for(var j = 0; j <= (parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear)); j++) {    				
    				if((parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear)) == 1) {
    					var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    					var end = new Date(noteCollectionJSON[i].startYear, 11, 31);
    					var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    					if(checkDay(start, end, current)) {
    						return true;
    					}    					
    					start = new Date(noteCollectionJSON[i].endYear, 0, 1);
    					end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);    					
    					if (checkDay(start, end, current, noteCollectionJSON[i])) {
    						return true;
    					}
    				} else {
    					if(j == 0) {
    						var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    						var end = new Date(noteCollectionJSON[i].startYear, 11, 31);
    						var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    						if(checkDay(start, end, current, noteCollectionJSON[i])) {
    							return true;
    						}
    						continue;
    					}
    					if(j == (parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear))) {
    						var start = new Date(noteCollectionJSON[i].endYear, 0, 1);
    						var end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    						var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    						if(checkDay(start, end, current, noteCollectionJSON[i])) {
    							return true;
    						}    						
    						continue;	
    					}
    					var start = new Date((parseInt(noteCollectionJSON[i].startYear) + parseInt(j)), 0, 1);
    				    var end = new Date((parseInt(noteCollectionJSON[i].startYear) + parseInt(j)), 11, 31);
    					var current = new Date(year, (parseInt(month) - parseInt(1)), day);
    					if(checkDay(start, end, current, noteCollectionJSON[i])) {
    						return true;
    					}      					
    				}
    			}
    		}
    	}
	}
	return false;	
}

function checkDay(start, end, current, model) {
	var startDay = parseInt(getDayOfYear(start)) + parseInt(1);
    var endDay = parseInt(getDayOfYear(end)) + parseInt(1);    				
    var currentDay = parseInt(getDayOfYear(current)) + parseInt(1);
    if ((startDay < currentDay) && (currentDay < endDay)) {
    	return true;
    }
    if ((startDay == currentDay) && (endDay > currentDay)) {
    	return true;
    }
    if ((endDay == currentDay) && (startDay < currentDay)) {
    	return true;
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

$.mainWindow.open();
