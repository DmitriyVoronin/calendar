var dateForCalculation = {
	currentMonthFirstDayNumber: 0,
	currentMonthLastDayNUmber: 0,
	number: 0
};

function onOpen() {
	
    	
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
    monthPrepare(number, dayNumber);   
}

function monthPrepare(number, dayNumber) {
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
    	ruMonth = "Октябрь";
    }
    if ($.MonthLabel.text == "Ноябрь") {
    	currentMothDayCount = 30;
    	prevMonthDayCount = 31;
    }
    if ($.MonthLabel.text == "Декабрь") {
    	currentMothDayCount = 31;
    	prevMonthDayCount = 30;
    }    
    fillMonth(currentMothDayCount, prevMonthDayCount, number, dayNumber);	
}

function fillMonth(dayCount, dayCountPrev, number, dayNumber) {	          
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
    for(var i = 0; i < 42; i++) {
    	if (i < dayNumberOfFirst) {    		
    		month[i] = parseInt(dayCountPrev) - parseInt(dayNumberOfFirst) + parseInt(1) + parseInt(i);
    	}
    	if (i == dayNumberOfFirst) {
    		month[i] = 1;
    	}
    	if ((i > dayNumberOfFirst) && i < (parseInt(dayCount) + parseInt(dayNumberOfFirst))) {
    		month[i] = parseInt(month[i - 1]) + parseInt(1);
    	}
    	if (i > (parseInt(dayCount) + parseInt(dayNumberOfFirst) - parseInt(1))) {      		
    		month[i] = parseInt(i) - parseInt(dayCount) - parseInt(dayNumberOfFirst) + parseInt(1);
    	}
    	if (i == (parseInt(dayCount) + parseInt(dayNumberOfFirst) - parseInt(1))) {
    		dateForCalculation.currentMonthLastDayNUmber = parseInt(i)%7;    		
    	}
    }
    dateForCalculation.number =  dayCountPrev;   
    var weekView;
    $.lbl11.text = month[0];
    $.lbl12.text = month[1];
    $.lbl13.text = month[2];
    $.lbl14.text = month[3];
    $.lbl15.text = month[4];
    $.lbl16.text = month[5];
    $.lbl17.text = month[6];
    $.lbl21.text = month[7];
    $.lbl22.text = month[8];
    $.lbl23.text = month[9];
    $.lbl24.text = month[10];
    $.lbl25.text = month[11];
    $.lbl26.text = month[12];
    $.lbl27.text = month[13];
    $.lbl31.text = month[14];
    $.lbl32.text = month[15];
    $.lbl33.text = month[16];
    $.lbl34.text = month[17];
    $.lbl35.text = month[18];
    $.lbl36.text = month[19];
    $.lbl37.text = month[20];
    $.lbl41.text = month[21];
    $.lbl42.text = month[22];
    $.lbl43.text = month[23];
    $.lbl44.text = month[24];
    $.lbl45.text = month[25];
    $.lbl46.text = month[26];
    $.lbl47.text = month[27];
    $.lbl51.text = month[28];
    $.lbl52.text = month[29];
    $.lbl53.text = month[30];
    $.lbl54.text = month[31];
    $.lbl55.text = month[32];
    $.lbl56.text = month[33];
    $.lbl57.text = month[34];
    $.lbl61.text = month[35];
    $.lbl62.text = month[36];
    $.lbl63.text = month[37];
    $.lbl64.text = month[38];
    $.lbl65.text = month[39];
    $.lbl66.text = month[40];
    $.lbl67.text = month[41];   
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
$.mainWindow.open();
