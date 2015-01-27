$(function(){
	
    var model = {
		adminMode: false,
		currentCat: null,
        init: function() {
			// HTML5 Local Storage Objects
            if (!localStorage.cats) {
				// Store cats in a JSON array
                this.loadDummyData();
            }
			this.currentCat = this.getAllCats()[0];
			this.adminMode = false;
		},
		loadDummyData: function() {
			var cat1 = { name: "cat1", img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSr78hc5SRq_gx99Xw1cipmSWhP5YpDf08y-XW07SaoDEI2xjkFJvjnaw", clickCount: 0 };
			var cat2 = { name: "cat2", img: "http://scienceblogs.com/gregladen/files/2012/12/Beautifull-cat-cats-14749885-1600-1200.jpg", clickCount: 0 };
			var cat3 = { name: "cat3", img: "http://www.cromo.com.uy/wp-content/uploads/2013/11/grumpy-cat.jpg", clickCount: 0 };
			var cat4 = { name: "cat4", img: "http://case.ntu.edu.tw/blog/wp-content/uploads/2014/12/Tortoiseshell_she-cat.jpg", clickCount: 0 };
			var cat5 = { name: "cat5", img: "http://www.globalpost.com/sites/default/files/imagecache/gp3_slideshow_large/photos/2013-October/germany_cat.jpg", clickCount: 0 };
			localStorage.cats = JSON.stringify([ cat1, cat2, cat3, cat4, cat5 ]);
		},
        add: function(obj) {
			// add a new cat to the existing JSON cats array
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data);
        },
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },
		getCurrentCat: function () {
			return this.currentCat;
		},
		setCurrentCat: function (cat) {
			this.currentCat = cat;
		},
		incrementCounter: function () {
			this.currentCat.clickCount++;
		},
	
		updateCurrentCat: function( name, imgURL, nclicks)
		{
			this.currentCat.name = name;
			this.currentCat.img = imgURL;
			this.currentCat.clickCount = nclicks;
		},
		inAdminMode: function() {
			return this.adminMode;
		},
		exitAdminMode: function( ) {
			this.adminMode = false;
		},
		enterAdminMode: function( ) {
			this.adminMode = true;
		}
    };


    var octopus = {
        catClicked: function() {
			var currentCat = model.getCurrentCat();
			console.log('Cat "' + currentCat.name + '" clicked ' + currentCat.clickCount + ' times');
			model.incrementCounter();
			catDetailView.render();
        },
		
		catSelected: function(cat) {
			console.log('New cat (' + cat.name + ') selected in list');
			model.setCurrentCat( cat );
			catDetailView.render();
        },

        getCats: function() {
            return model.getAllCats();
        },
		
		getCurrentCat: function() {
			return model.getCurrentCat();
		},
		
		inAdminMode: function () {
			return model.inAdminMode();
		},

        init: function() {			
            model.init();
			adminView.init();
            catListView.init();
			catDetailView.init();
        },
		
		cancelUpdate: function( ) {
			model.exitAdminMode();
			adminView.render();
		},
		
		saveUpdate: function( catName, catImgURL, catClicks ) {
			model.updateCurrentCat( catName, catImgURL, catClicks );
			model.exitAdminMode();
			adminView.render();
			catDetailView.render();
		},
		
		enterAdminMode: function() {
			console.log("Entering admin mode");
			model.enterAdminMode();
			adminView.render();
		}
    };


    var catListView = {
        init: function() {
            this.catList = $('#cat-list');
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
            
        }
    };
	
	var catDetailView = {
        init: function() {
			this.catName = $('#cat-name');
			this.catImage = $('#cat-img');
			this.catClickCount = $('#cat-clicks');
            this.catImage.click(function(e){
                octopus.catClicked( );
            });
            this.render();
        },
        render: function(){
			var currentCat = octopus.getCurrentCat();
			this.catName.text( currentCat.name );
			this.catImage.attr( "src", currentCat.img );
			this.catClickCount.text( currentCat.clickCount );
        }
    };
	
	var adminView = {
        init: function() {
			this.adminForm = $('#form-admin');
			this.adminButton = $('#admin-button');
			this.saveButton = $('#form-save-button');
			this.cancelButton = $('#form-cancel-button');
			this.inputName = $('#form-cat-name');
			this.inputImgURL = $('#form-cat-img-url');
			this.inputClicks = $('#form-cat-nclicks');
			
			this.cancelButton.click(function(e){
                octopus.cancelUpdate( );
            });
			
            this.saveButton.click(function(e){
                octopus.saveUpdate( adminView.inputName.val(), adminView.inputImgURL.val(), adminView.inputClicks.val() );
            });
			
			this.adminButton.click(function(e){
				octopus.enterAdminMode();
            });
			
            this.render();
        },
        render: function(){
			if ( !octopus.inAdminMode() )
			{
				console.log("Hiding admin form");
				this.adminForm.hide();
				return;
			}
			this.adminForm.show();
			console.log("Showing admin form");
			var currentCat = octopus.getCurrentCat();
			this.inputName.val( currentCat.name );
			this.inputImgURL.val( currentCat.img  );
			this.inputClicks.val( currentCat.clickCount );
        }
		
    };
	
    octopus.init();
});