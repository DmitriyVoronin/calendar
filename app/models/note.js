exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "name": "TEXT",
		    "place": "TEXT",
		    "startDay": "INTEGER",
		    "startMonth": "INTEGER",
		    "startYear": "INTEGER",
		    "startHour": "INTEGER",
		    "startMinutes": "INTEGER",
		    "endDay": "INTEGER",
		    "endMonth": "INTEGER",
		    "endYear": "INTEGER",
		    "endHour": "INTEGER",
		    "endMinutes": "INTEGER",
		    "guests": "TEXT",
		    "description": "TEXT",
		    "color": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "note"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};