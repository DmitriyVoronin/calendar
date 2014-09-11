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
    $.YearLabel.text = moment().format('YYYY');
    fillMonth();
    
}

function fillMonth(dayCount, dayCountPrev) {
	dayCount = 30;
	dayCountPrev = 31;
	var moment = require('alloy/moment');
	//moment.lang('ru');	
    var number = moment().format('DD');
    var dayName = moment().format('dddd');
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
    var currentWeek =[];
    currentWeek[dayNumber] = parseInt(number);
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
    }
    var weekView;
    for (var i = 0; i < 42; i++) {
    	if(i > -1 && i < 7){
    		weekView = $.week1;
    	}
    	if(i > 6 && i < 14){
    		weekView = $.week2;
    	}
    	if(i > 13 && i < 21){
    		weekView = $.week3;
    	}
    	if(i > 20 && i < 28){
    		weekView = $.week4;
    	}
    	if(i > 27 && i < 35){
    		weekView = $.week5;
    	}
    	if(i > 34 && i < 42){
    		weekView = $.week6;
    	}    	
    	var lbl = Ti.UI.createLabel({
  			text: month[i],
  			left: 5,
  			right: 5,
  			height: 21,
  			width: 19
		});
    	weekView.add(lbl);
    }
    
    
}

function onClickMonthBack() {	
	debugger
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
}
$.index.open();
