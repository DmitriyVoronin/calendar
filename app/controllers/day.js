var args = arguments[0] || {};

function onOpen() {
	var activity = $.dayWindow.activity;	
	activity.actionBar.icon = "/logo1.png";
	var titleDay;
	var titleMonth;
	if(args.day > 9) {
		titleDay = args.day; 
	} else {
		titleDay = "0" + args.day;
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
    		title : "ok",    	   
    		showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS 
    	});
    	menuItem1.addEventListener("click", addNote);    	   	
    };
    var duration = 5;
    var startTime = 2;
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
			right: 0
		});
		numView.add(numLabel);
    	if(i == startTime) {
    		itemView.height = parseInt(Titanium.Platform.displayCaps.platformHeight/30 * duration) + parseInt(1);
    		var verticalView = Titanium.UI.createView({
    			layout: "vertical",    			
    			left: 0,
    			width: "10%"
    		});    		  		
    		for(var j = i; j < (parseInt(i)+parseInt(duration)); j++) {
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
    			if(j != (parseInt(i) + parseInt(duration) - parseInt(1))) {
    				verticalView.add(separator1);   
    			}   			
    		}
    		itemView.add(verticalView);
    		itemView.add(backgroundView);
    		$.mainView.add(itemView);
    		i = parseInt(i) + parseInt(duration) - parseInt(1);
    		$.mainView.add(separator);
    		continue;
    	}    			
        //numView.add(numLabel);
        numView.add(verticalSeparator);
        itemView.add(numView);
        itemView.add(backgroundView);
    	$.mainView.add(itemView);
    	$.mainView.add(separator);
    }
	/*var arr = [];
	for(var i = 0; i < 24; i++) {
		if(i > 9) {
			arr[i] = { hour:{text : i}, backgroundView: {backgroundColor: "white"}, noteText: {text: "aaa"}};
		} else {
			arr[i] = { hour:{text : "0" + i}, backgroundView: {backgroundColor: "white"}, noteText: {text: "aaa"}};
		}
	}
	$.listSectionDay.setItems(arr);*/
}

function addNote() {
	// var arr = $.listSectionDay.getItems();
	// arr[4].backgroundView.backgroundColor = "green";
	// arr[4].noteText.text = "dddd";
	// $.listSectionDay.setItems(arr);
	var arr = [];	
	for(var i = 0; i < 24; i++) {
		if(i == 5) {
			arr[i] = {itemView: {height: 70}};
		}
		
		if(i > 9) {
			arr[i] = { hour:{text : i}, backgroundView: {backgroundColor: "white"}, noteText: {text: "aaa"}};
		} else {
			arr[i] = { hour:{text : "0" + i}, backgroundView: {backgroundColor: "white"}, noteText: {text: "aaa"}};
		}
		if(i == 5) {
			arr[i] = {itemView: {height: 70}};
		}
	}
	$.listSectionDay.setItems(arr);
}
