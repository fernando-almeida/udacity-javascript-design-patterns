$(function() {

	// Model
	var model = {
		// Data
	    bio : { 
			name : 'Fernando Almeida',
			role : 'Role'
        contacts : {
			mobile: 'mobile',
			email: 'email',
			blog: 'none',
			github: 'github',
			twitter: 'twitter',
            location: 'location'
			},
		welcomeMessage: 'Welcome',
        skills: [ 'skill1', 'skill2', 'skill3', 'skill4', 'skill5', 'skill6' ],
        biopic: 'http://www.loungegeeks.com//wp-content/uploads/2014/06/simpson_homer_headshot.jpg'
		},

		education: {
			schools: [ 
				{
					name: 'ESTGV',
					location: 'Viseu'
					degree: 'Bachelor',
					majors: [ 'Programming', 'Operating Systems', 'Networking' ],
					dates: 2007,
					url: 'http://www.estv.ipv.pt'
				}
			],
			onlineCourses: [
				{
					title: 'Javascript Design Patterns',
					school: 'Udacity',
					date: 'Ongoing',
					url: 'http://www.udacity.com'
				}
			]
		},
		
		work: {
			jobs: [
				{
					employer: 'PSA Peugeot Citroen',
					title: 'System Administrator',
					location: 'Mangualde, Viseu',
					dates: '09/2007-08/20080',
					description: 'Description'
				}
			]
		},

		projects: {
			projects: [
				{ 
					title: 'Research',
					dates: 'StartDate-EndDate',
					description: 'Description',
					images: ['http://www.hallaminternet.com/assets/URL-tagging-image.png']
				}
			]
		},
		
		// Methods for data manipulation
		getBio: function() { return this.bio; },
		
		getEducation: function() { return this.education; },
		
		getWorkExperience: function() { return this.work; },
		
		getProjects: function() { return this.projects; }

	};

	// Octopus
	var octopus = {
		init: function() {
			bioView.init();
			educationView.init();
			workView.init();
			projectsView.init();
		}
	};
	
	
	///////////
	// Views //
	///////////
	
	// Biography View
	var bioView = {
		init: function() {
			this.headerEl = $('#header');
			this.topContactsEl = $('#topContacts');
			this.display();
		}, 
		
		display: function () {
			var bio = model.getBio();
			// Header
			var headerName = HTMLheaderName.replace('%data%', bio.name );
			var headerRole = HTMLheaderName.replace('%data%', bio.role);
			var bioPic = HTMLwelcomeMsg.replace('%data', bio.biopic );
			var welcomeMsg = HTMLwelcomeMsg.replace('%data', bio.welcomeMessage);
						
			headerEl.append( headerName );
			headerEl.append( headerRole );
			headerEl.append( bioPic );
			headerEl.append( welcomeMsg );
			
			// Contacts
			var mobile = HTMLmobile.replace('%data%', bio.contacts.mobile );
			var email = HTMLemail.replace('%data%', bio.contacts.email );
			var twitter = HTMLtwitter.replace('%data%', bio.contacts.twitter );
			var github =  HTMLgithub.replace('%data%', bio.contacts.github );
			var blog = HTMLblog.replace('%data%', bio.contacts.blog );
			var location = HTMLlocation .replace('%data%', bio.contacts.location );
			
			topContactsEl.append( mobile );
			topContactsEl.append( email );
			topContactsEl.append( twitter );
			topContactsEl.append( github );
			topContactsEl.append( blog );
			topContactsEl.append( location );

			// Skills
			skills = HTMLskills.replace('%data%', bio.skills.join()  );
			headerEl.append( HTMLskillsStart );
			headerEl.append( skills );
			
			
		}
	};
	
	// Education View
	var educationView = {
			init: function() {
				this.containerEl = $('#projects');
				this.display();
			}
			
			display: function() {
				model.getEducation();
			}
	};
	
	// Work View
	var workView = {
			init: function() {
				this.containerEl = $('#workExperience');
				this.display();
			}
			
			display: function() {
				this.display();
				model.getWorkExperience();
			}
	};
	
	// Project View
	var projectView = {
			init: function() {
				this.containerEl = $('#projects');
				this.display();
			}
			
			display: function() {
				model.getProjects();
			}
	};

	octopus.init();
	
});