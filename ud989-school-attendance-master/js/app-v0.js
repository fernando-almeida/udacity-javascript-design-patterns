$(function(){
	
    var model = {
		attendance: [],
        init: function() {
			// HTML5 Local Storage Objects
            if (!localStorage.attendance) {
				// Store cats in a JSON array
                this.loadDummyData();
            }
		},
		loadDummyData: function() {
			console.log('Creating attendance records...');
			
			function getRandom() {
				return (Math.random() >= 0.5);
			}

			var nameColumns = $('tbody .name-col')
				attendance = {};

			nameColumns.each(function() {
				var name = this.innerText;
				attendance[name] = [];

				for (var i = 0; i <= 11; i++) {
					attendance[name].push(getRandom());
				}
			});

			localStorage.attendance = JSON.stringify(attendance);
		},
        setAttendance: function(studentName, day, presence ) {
			// add a new cat to the existing JSON cats array
            var data = this.getAttendance();
            data[studentName][day-1] = presence;
            localStorage.attendance = JSON.stringify(data);
        },
        getAttendance: function() {
            return JSON.parse(localStorage.attendance);
        },
		getStudentAttendance: function( student ) {
            return getAttendance()[student];
        },
		countMissedDays: function( student ) {
			var studentAttendance = this.getStudentAttendance( student );
			var numMissed = 0;
			for ( d = 0; d < studentAttendance.length; d++ )
			{
				if ( studentAttendance[d] )	
					numMissed++;
			}
			return numMissed;
		}
    };


    var octopus = {
        dayChecked: function() {
			var currentCat = model.getCurrentCat();
			console.log('Cat "' + currentCat.name + '" clicked ' + currentCat.clickCount + ' times');
			model.incrementCounter();
			catDetailView.render();
        },

        getAttendamce: function() {
            return model.getAttendance();
        },

        init: function() {			
            model.init();
			attendanceView.init();
        }
		
    };

    var attendanceView = {
        init: function() {
            this.attendanceTable = $('#attendance-table');
			// Initialize a handler for each student/day checkbox
            this.render();
        },
        
		render: function(){
			this.catList.empty();
            octopus.getCats().forEach(function(cat) {
                var catListItem = $('<li class="cat-item">'+ cat.name + '</li>');
				catListItem.click( ( function ( catClicked ) 
					{ 
						return function () { octopus.catSelected( catClicked ) };
					})( cat ));
				catListView.catList.append( catListItem );
            });
            
        },
		
		renderStudent: function( name, attendance ){
			var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
			dayChecks = $(studentRow).children('.attend-col').children('input');
			dayChecks.each(function(i) { 
				$(this).prop('checked', attendance[i] );
			});			
		},
		
		renderStudentMissedDays: function(){
		},
    };
	
    octopus.init();
});