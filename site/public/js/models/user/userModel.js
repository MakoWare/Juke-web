//Events
namespace('juke.events').USER_LOGGED_IN = "ActivityModel.USER_LOGGED_IN";

//User model, holds Current User
var UserModel = EventDispatcher.extend({
    currentUser: null,

    //Injected by the provider
    ParseService:null,
    notifications: null,

    //Load Hubs via Parse service for the Hubs Table
    getHubsForTable: function(){
        var self = this;

	this.ParseService.getHubsForTable().then(function(results){
            console.log("HubsModel " + "Got Hubs:");
            console.log(results);
            self.hubs = results;
            self.notifications.notify(juke.events.HUBS_LOADED);
        });
    },

    //Get a Hub
    getHub: function(){

    }
});

//Provider, as all components will use the same HubsModel instance, $inject will init once, then pull the same object from Instance Cache for all other $injects
(function (){
    var HubsModelProvider = Class.extend({
	instance: new HubsModel(),

        //Init HubsModel
	$get:['ParseService', 'Notifications', function(ParseService, Notifications){
	    this.instance.ParseService = ParseService;
            this.instance.notifications = Notifications;
	    return this.instance;
	}]
    });

    angular.module('juke.HubsModel',[])
	.provider('HubsModel',HubsModelProvider);
}());
