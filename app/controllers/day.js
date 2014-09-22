var args = arguments[0] || {};

function onOpen() {
	var activity = $.dayWindow.activity;	
	activity.actionBar.icon = "/logo1.png";
	var titleDay;
	var titleMonth;
	if(args.day > 9) {
		titleDay = parseInt(args.day); 
	} else {
		titleDay = "0" + parseInt(args.day);
	}
	if(args.month > 9) {
		titleMonth = args.month; 
	} else {
		titleMonth = "0" + args.month;
	}
	activity.actionBar.title = titleDay + "." + titleMonth + "." + args.year;
    activity.onCreateOptionsMenu = function(e) {
    	var menu = e.menu;
    	var menuItem1 = menu.add({
    		icon: Ti.Android.R.drawable.ic_menu_edit,  	   
    		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
    	});
    	menuItem1.addEventListener("click", addNote);    	   	
    };   
    loadView(); 
}

function addNote() {
	var win = Alloy.createController("note", args).getView();    
    win.open();	
}

Ti.App.addEventListener("app:updateViews", loadView);
function loadView() {
	$.activityIndicatorBackground.visible = true;
	$.activityIndicator.show();
	var noteCollection = Alloy.Collections.note;
    noteCollection.fetch();
    noteCollectionJSON = noteCollection.toJSON();		
    for(var i = 0; i < noteCollectionJSON.length; i++) {
    	if((noteCollectionJSON[i].startYear <= args.year) && (noteCollectionJSON[i].endYear >= args.year)) {
    		if(noteCollectionJSON[i].startYear == noteCollectionJSON[i].endYear) {
    			if((noteCollectionJSON[i].startMonth == noteCollectionJSON[i].endMonth) && (noteCollectionJSON[i].startDay == noteCollectionJSON[i].endDay) && (args.day == noteCollectionJSON[i].startDay)) {
    				if(noteCollectionJSON[i].endMinutes == 0) {
    					durationArr[counter] = parseInt(noteCollectionJSON[i].endHour) - parseInt(noteCollectionJSON[i].startHour);
    				} else {    				
    					durationArr[counter] = parseInt(noteCollectionJSON[i].endHour) - parseInt(noteCollectionJSON[i].startHour) + parseInt(1);
    				}
    				startArr[counter] = noteCollectionJSON[i].startHour;
    				idArr[counter] = noteCollectionJSON[i].id;
    				counter++;    				
    			} else {
    				var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    				var end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    				var current = new Date(args.year, (parseInt(args.month) - parseInt(1)), args.day);
    				viewFiller(start, end, current, noteCollectionJSON[i]);			
    			}    			
    		} else {
    			for(var j = 0; j <= (parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear)); j++) {    				
    				if((parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear)) == 1) {
    					var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    					var end = new Date(noteCollectionJSON[i].startYear, 11, 31);
    					var current = new Date(args.year, (parseInt(args.month) - parseInt(1)), args.day);
    					viewFiller(start, end, current);
    					start = new Date(noteCollectionJSON[i].endYear, 0, 1);
    					end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    					viewFiller(start, end, current, noteCollectionJSON[i]);
    				} else {
    					if(j == 0) {
    						var start = new Date(noteCollectionJSON[i].startYear, (parseInt(noteCollectionJSON[i].startMonth) - parseInt(1)), noteCollectionJSON[i].startDay);
    						var end = new Date(noteCollectionJSON[i].startYear, 11, 31);
    						var current = new Date(args.year, (parseInt(args.month) - parseInt(1)), args.day);
    						viewFiller(start, end, current, noteCollectionJSON[i]);
    						continue;
    					}
    					if(j == (parseInt(noteCollectionJSON[i].endYear) - parseInt(noteCollectionJSON[i].startYear))) {
    						var start = new Date(noteCollectionJSON[i].endYear, 0, 1);
    						var end = new Date(noteCollectionJSON[i].endYear, (parseInt(noteCollectionJSON[i].endMonth) - parseInt(1)), noteCollectionJSON[i].endDay);
    						var current = new Date(args.year, (parseInt(args.month) - parseInt(1)), args.day);
    						viewFiller(start, end, current, noteCollectionJSON[i]);    						
    						continue;	
    					}
    					var start = new Date((parseInt(noteCollectionJSON[i].startYear) + parseInt(j)), 0, 1);
    				    var end = new Date((parseInt(noteCollectionJSON[i].startYear) + parseInt(j)), 11, 31);
    					var current = new Date(args.year, (parseInt(args.month) - parseInt(1)), args.day);
    					viewFiller(start, end, current, noteCollectionJSON[i]);      					
    				}
    			}
    		}
    	}
	}
	sort();
	updateList();
	startArr = [];
	durationArr = []; 
	idArr = []; 
	counter = 0;
	$.activityIndicatorBackground.visible = false;
	$.activityIndicator.hide();
}
    	
var startArr = [], durationArr = [], idArr = [], counter = 0;

function viewFiller(start, end, current, model) {
	var startDay = parseInt(getDayOfYear(start)) + parseInt(1);
    var endDay = parseInt(getDayOfYear(end)) + parseInt(1);    				
    var currentDay = parseInt(getDayOfYear(current)) + parseInt(1);
    if ((startDay < currentDay) && (currentDay < endDay)) {
    	durationArr[counter] = 24;
    	startArr[counter] = 0;
    	idArr[counter] = model.id;
    	counter++;
    }
    if ((startDay == currentDay) && (endDay > currentDay)) {
    	durationArr[counter] = (parseInt(24) - parseInt(model.startHour));
    	startArr[counter] = model.startHour;
    	idArr[counter] = model.id;
    	counter++;
    }
    if ((endDay == currentDay) && (startDay < currentDay)) {
    	durationArr[counter] = model.endHour;
    	startArr[counter] = 0;
    	idArr[counter] = model.id;
    	counter++;
    }
}

function sort() {
	for(var i = 0; i < startArr.length; i++) {
		for(var j = 0; j < startArr.length-1; j++) {
			if(startArr[j] > startArr[j+1]) {
				var a = startArr[j];
				startArr[j] = startArr[j+1];
				startArr[j+1] = a;
				a = durationArr[j];
				durationArr[j] = durationArr[j+1];
				durationArr[j+1] = a;
				a = idArr[j];
				idArr[j] = idArr[j+1];
				idArr[j+1] = a;
			}
		}
	}
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

function updateList() {
	var noteCollection = Alloy.Collections.note;
    noteCollection.fetch();
    noteCollectionJSON = noteCollection.toJSON();
	$.mainView.removeAllChildren();
	var model;
	var localCounter = 0;	
    for(var i = 0; i < 24; i++) {
    	var itemView = Titanium.UI.createView({			
			height: parseInt(Titanium.Platform.displayCaps.platformHeight/30),			
		});
		var numView = Titanium.UI.createView({
			backgroundColor: "#F2F1EC",
			width: "10%",			
			left: 0,								
		});
		var verticalSeparator = Titanium.UI.createView({
			width: 1,
			backgroundColor: "#BBBBB3",
			right: 0
		});
		if(i > 9) {
			var numLabel = Ti.UI.createLabel({
				text: i
			});
		} else {
			var numLabel = Ti.UI.createLabel({
				text: "0" + i
			});
		}		
		var separator = Titanium.UI.createView({
			height: 1,
			backgroundColor: "#BBBBB3"
		});
		var backgroundView = Titanium.UI.createView({
			width: "90%",			
			right: 0,			
		});
		backgroundView.addEventListener('click', function(e) {			
			var data = {
				id: e.source.children[2].text
			};
			var win = Alloy.createController("note", data).getView();    
    		win.open();	
		});
		numView.add(numLabel);
    	if(i == startArr[localCounter]) {
    		itemView.height = parseInt(Titanium.Platform.displayCaps.platformHeight/30 * durationArr[localCounter]) + parseInt(1);
    		var verticalView = Titanium.UI.createView({
    			layout: "vertical",    			
    			left: 0,
    			width: "10%"
    		});    		  		
    		for(var j = i; j < (parseInt(i)+parseInt(durationArr[localCounter])); j++) {
    			var numView1 = Titanium.UI.createView({
					backgroundColor: "#F2F1EC",								
					height: parseInt(Titanium.Platform.displayCaps.platformHeight/30),
					left: 0,								
				});
				if(j > 9) {
					var numLabel1 = Ti.UI.createLabel({
						text: j
					});
				} else {
					var numLabel1 = Ti.UI.createLabel({
						text: "0" + j
					});
				}
				var verticalSeparator = Titanium.UI.createView({
					width: 1,
					backgroundColor: "#BBBBB3",
					right: 0
				}); 	
				var separator1 = Titanium.UI.createView({
					height: 1,					
					backgroundColor: "#BBBBB3"
				});			
				numView1.add(numLabel1);
				numView1.add(verticalSeparator);
    			numView.width = "100%";    			 
    			verticalView.add(numView1);
    			if(j != (parseInt(i) + parseInt(durationArr[localCounter]) - parseInt(1))) {
    				verticalView.add(separator1);   
    			}   			
    		}
    		var timeLabel = Ti.UI.createLabel({
    			top:0,
    			left: 0
    		});
    		var nameLabel = Ti.UI.createLabel({    			
    			left: 0
    		});
    		var hiddenLabel = Ti.UI.createLabel({    			
    			left: 0
    		});    		        		
    		model = _.findWhere(noteCollectionJSON, {id: idArr[localCounter]});
    		timeLabel.text = model.startHour + ":" + model.startMinutes + " - " + model.endHour + ":" + model.endMinutes; 
    		nameLabel.text = model.name;
    		nameLabel.top = 15; 
    		hiddenLabel.visible = false;
    		hiddenLabel.text = model.id;
    		backgroundView.backgroundColor = model.color;
    		backgroundView.add(timeLabel);
    		backgroundView.add(nameLabel);
    		backgroundView.add(hiddenLabel);    		
    		itemView.add(verticalView);
    		itemView.add(backgroundView);
    		$.mainView.add(itemView);
    		i = parseInt(i) + parseInt(durationArr[localCounter]) - parseInt(1);
    		$.mainView.add(separator);
    		localCounter++;
    		continue;
    	}    			
        //numView.add(numLabel);
        numView.add(verticalSeparator);
        itemView.add(numView);
        itemView.add(backgroundView);
    	$.mainView.add(itemView);
    	$.mainView.add(separator);
    }
}
