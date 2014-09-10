function onOpen() {
	var moment = require('alloy/moment');
	moment.lang('ru');	
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
