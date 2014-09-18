var dateForCalculation = {
	currentMonthFirstDayNumber: 0,
	currentMonthLastDayNUmber: 0,
	number: 0
};

function onOpen() {
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
    	menuItem2.addEventListener("click", function(){
    		alert("remove");
    	});   	
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
}

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
    		if((month[i] == moment().format('DD')) && ($.MonthLabel.text == "Сентябрь") && ($.YearLabel.text == moment().format('YYYY'))) {
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
    dateForCalculation.number =  dayCountPrev;      
    $.lbl11.text = month[0];$.lbl11.color = color[0];
    $.lbl12.text = month[1];$.lbl12.color = color[1];
    $.lbl13.text = month[2];$.lbl13.color = color[2];
    $.lbl14.text = month[3];$.lbl14.color = color[3];
    $.lbl15.text = month[4];$.lbl15.color = color[4];
    $.lbl16.text = month[5];$.lbl16.color = color[5];
    $.lbl17.text = month[6];$.lbl17.color = color[6];
    $.lbl21.text = month[7];$.lbl21.color = color[7];
    $.lbl22.text = month[8];$.lbl22.color = color[8];
    $.lbl23.text = month[9];$.lbl23.color = color[9];
    $.lbl24.text = month[10];$.lbl24.color = color[10];
    $.lbl25.text = month[11];$.lbl25.color = color[11];
    $.lbl26.text = month[12];$.lbl26.color = color[12];
    $.lbl27.text = month[13];$.lbl27.color = color[13];
    $.lbl31.text = month[14];$.lbl31.color = color[14];
    $.lbl32.text = month[15];$.lbl32.color = color[15];
    $.lbl33.text = month[16];$.lbl33.color = color[16];
    $.lbl34.text = month[17];$.lbl34.color = color[17];
    $.lbl35.text = month[18];$.lbl35.color = color[18];
    $.lbl36.text = month[19];$.lbl36.color = color[19];
    $.lbl37.text = month[20];$.lbl37.color = color[20];
    $.lbl41.text = month[21];$.lbl41.color = color[21];
    $.lbl42.text = month[22];$.lbl42.color = color[22];
    $.lbl43.text = month[23];$.lbl43.color = color[23];
    $.lbl44.text = month[24];$.lbl44.color = color[24];
    $.lbl45.text = month[25];$.lbl45.color = color[25];
    $.lbl46.text = month[26];$.lbl46.color = color[26];
    $.lbl47.text = month[27];$.lbl47.color = color[27];
    $.lbl51.text = month[28];$.lbl51.color = color[28];
    $.lbl52.text = month[29];$.lbl52.color = color[29];
    $.lbl53.text = month[30];$.lbl53.color = color[30];
    $.lbl54.text = month[31];$.lbl54.color = color[31];
    $.lbl55.text = month[32];$.lbl55.color = color[32];
    $.lbl56.text = month[33];$.lbl56.color = color[33];
    $.lbl57.text = month[34];$.lbl57.color = color[34];
    $.lbl61.text = month[35];$.lbl61.color = color[35];
    $.lbl62.text = month[36];$.lbl62.color = color[36];
    $.lbl63.text = month[37];$.lbl63.color = color[37];
    $.lbl64.text = month[38];$.lbl64.color = color[38];
    $.lbl65.text = month[39];$.lbl65.color = color[39];
    $.lbl66.text = month[40];$.lbl66.color = color[40];
    $.lbl67.text = month[41];$.lbl67.color = color[41];    
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
}

function onClickMonthForward() {
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
$.mainWindow.open();
