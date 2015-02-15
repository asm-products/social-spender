/*
 * Please see the included README.md file for license terms and conditions.
 */

/* json_storage.js
 * @danott
 * 26 APR 2011
 *
 * Building on a thread from Stack Overflow, override localStorage and sessionStorage's
 * getter and setter functions to allow for storing objects and arrays.
 *
 * Original thread:
 * http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
 *
 * Modified by emanb29 to include actual getters and setters
 */
Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value)
{
  this._setItem(key, JSON.stringify(value));
}

Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function(key)
{
  try
  {
    return JSON.parse(this._getItem(key));
  }
  catch(e)
  {
    return this._getItem(key);
  }
}

/* shake from http://www.bootply.com/zKLuRYPyXS*/
jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
  this.each(function() {
    $(this).css("position","relative");
    for (var x=1; x<=intShakes; x++) {
      $(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
        .animate({left:intDistance}, ((intDuration/intShakes)/2))
        .animate({left:0}, (((intDuration/intShakes)/4)));
    }
  });
  return this;
};


//Parse classes
var Request = Parse.Object.extend('Request');

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {} ;         // there should only be one of these...



// Set to "true" if you want the console.log messages to appear.

app.LOG = false ;

app.consoleLog = function() {           // only emits console.log messages if app.LOG != false
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;



// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should "kick off" your application by initializing app events, etc.

// NOTE: Customize this function to initialize your application, as needed.

app.initEvents = function() {
    "use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;

    // NOTE: initialize your third-party libraries and event handlers

    // initThirdPartyLibraryNumberOne() ;
    // initThirdPartyLibraryNumberTwo() ;
    // initThirdPartyLibraryNumberEtc() ;

    // NOTE: initialize your application code

    // initMyAppCodeNumberOne() ;
    // initMyAppCodeNumberTwo() ;
    // initMyAppCodeNumberEtc() ;

    // NOTE: initialize your app event handlers, see app.js for a simple event handler example

    // TODO: configure following to work with both touch and click events (mouse + touch)
    // see http://msopentech.com/blog/2013/09/16/add-pinch-pointer-events-apache-cordova-phonegap-app/

    var el, evt ;

    if( navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
        evt = "click" ;                                             // let touch become a click event
    else                                                            // else, assume touch events available
        evt = "touchend" ;                                          // not optimum, but works



    // NOTE: ...you can put other miscellaneous init stuff in this function...
    // NOTE: ...and add whatever else you want to do now that the app has started...

    app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
} ;
document.addEventListener("app.Ready", app.initEvents, false) ;



// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.

app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;

    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }

    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }

    app.consoleLog(fName, "exit") ;
} ;



// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    // $.ui.launch() ;

    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }

    app.consoleLog(fName, "exit") ;
} ;

angular.module('socialshopping', ['ngRoute', 'ui.bootstrap']);
angular.module('socialshopping')
  .run(function($rootScope, $route, $location) {
    //globally necessary function
    if (localStorage.getItem('user')) {
      Parse.User.become(localStorage.getItem('user')).then(function(user) {
        $rootScope.$apply(function(){$rootScope.user = user});
      }, function(error){
        console.log(error);
        localStorage.removeItem('user');
      })
    }


    $rootScope.closereq = function(req) {
      req.set('status', 'closed');
      req.save();
    };
    $rootScope.cancelreq = function(req) {
      alert('Cancel this request');
      //TODO: follow up
    };
    $rootScope.flagreq = function(req) {
      alert('Report this incident');
      //TODO: follow up
    };
    $rootScope.updatePage = function(){
      $route.reload();
    }
    $rootScope.gotoreq = function(req, isClient){
      $location.path('/order/'+req.id+'/'+isClient);
      $location.replace();
      $rootScope.$apply();
    }
  })
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'indexCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerCtrl'
        })
        .when('/runner', {
          templateUrl: 'views/runner.html',
          controller: 'runnerCtrl'
        })
        .when('/request', {
          templateUrl: 'views/request.html',
          controller: 'requestCtrl'
        })
        .when('/history', {
          templateUrl: 'views/history.html',
          controller: 'historyCtrl'
        })
        .when('/order/:oid/:isClient', {
          templateUrl: 'views/order.html',
          controller: 'orderCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
  }])
  .controller('orderCtrl', ['$scope', '$rootScope', '$location', '$routeParams', function($scope, $rootScope, $location, $routeParams){
    var q = new Parse.Query(Request);
    q.include('runner');
    q.include('client');
    q.get($routeParams.oid, {
      success: function(req){
        $scope.req = req;
        req.fetch();
        $scope.$apply();
      }, error: function(req, error) {
        alert('error retrieving object');
      }
    })
  }])
  .controller('navCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
      $scope.isActive = function(page) {
          var current = $location.path().substring(1);
          //console.log('current: ', current, ' page: ', page, ' location: ', $location.path());
          return (page === current || page === $location.path()) ? "active" : "";
      };
      $scope.logout = function(){
        delete $rootScope.user;
        localStorage.removeItem('user');

      }
  }])
  .controller('indexCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

  }])
  .controller('loginCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    $scope.form = {};
    $scope.login = function() {
      Parse.User.logIn($scope.form.username, $scope.form.password, {
        success: function(user) {
          $rootScope.user = user;
          localStorage.setItem('user', user.getSessionToken());
          console.log(user);
          $scope.$apply(function() { $location.path("/"); });
        },
        error: function(user, error) {
          $('.loginform').shake(2, 7, 400);
        }
      })
    }
  }])
  .controller('registerCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){

    document.scope = $rootScope;
    $scope.form = {};
    $scope.registerUser = function() {
      var user = new Parse.User();
      user.set('username', $scope.form.username);
      user.set('password', $scope.form.password);
      user.set('email', $scope.form.email);
      user.set('isRunner', true);
      user.signUp(null, {
        success: function(user) {
          $rootScope.user = user;
          $scope.$apply(function() { $location.path("/"); });
        },
        error: function(user, error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  }])
  .controller('requestCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.form = {};
    $scope.makeRequest = function() {
      var request = new Request();
      request.set('offer', $scope.form.offer);
      request.set('order', $scope.form.order);
      request.set('address', $scope.form.address);
      request.set('client', $rootScope.user);
      request.set('status', 'open');
      request.save(null, {
        success: function(request) {
          $scope.$apply(function() {
            $scope.request = request;
            console.log(request);
          });
        },
        error: function(request, error) {
          alert('Failed to create new request, with error code: ' + error.message);
        }
      });
      //TODO add and secure payment platform, set up percentage cut for app
    };
  }])
  .controller('historyCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.requests = [];
    $scope.hidereq = function(req){
      req.set('hidden', true);
      req.save();
    }
    $scope.hideallreq = function () {
      var newrequests=[];
      var query = new Parse.Query(Request);
      query.equalTo('client', $rootScope.user);
      query.include('runner');
      query.each(function(req) {
        if(req.get('status') == 'closed'){
          req.set('hidden', true);
          req.save();
          //TODO test show and hide all with multiple users
        }
        newrequests.push(req);
        $scope.requests=newrequests;
        $scope.$apply();
      });
    }
    $scope.showallreq = function () {
      var newrequests=[];
      var query = new Parse.Query(Request);
      query.equalTo('client', $rootScope.user);
      query.include('runner');
      query.each(function(req) {
        req.set('hidden', false);
        req.save();
        newrequests.push(req);
        $scope.requests=newrequests;
        $scope.$apply();
      });
    }
    if ($rootScope.user){
      var query = new Parse.Query(Request);
      query.equalTo('client', $rootScope.user);
      query.include('runner');
      query.find().then(function(results){
          //$scope.$apply(function () { //TODO check if this is necessary
            $scope.requests = results;
            $scope.$apply();
            console.log(results);
          //})
        },function(error){
          alert("Error: " + error.code + " " + error.message);
        }
      );
    }
  }])
  .controller('runnerCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    /*$scope.mineFirst = function(req){
      if (req.get('runner')){
        console.log('maybe mine ', req);
        if (req.get('runner').get('username') == $rootScope.user.username){
          console.log('mine ', req);
          return 5
        }
      }
      return 0
    }*/
    $scope.claimreq = function(req) {
      req.set('runner', $rootScope.user);
      req.set('status', 'claimed'); //TODO replace status with mock enum
      req.save();
    }
    $scope.markpurchased = function(req){
      req.set('status', 'purchased');
      req.save();
    }
    $scope.requests = [];
    if ($rootScope.user){
      var queryIsOpen = new Parse.Query(Request);
      queryIsOpen.equalTo('status', 'open');
      var queryIsMine = new Parse.Query(Request);
      queryIsMine.equalTo('runner', $rootScope.user);
      var query = new Parse.Query.or(queryIsMine, queryIsOpen);
      query.notEqualTo('status', 'closed'); //TODO: replace with front end filtering
      query.find().then(function(results){
          //$scope.$apply(function () { //TODO check if this is necessary
            $scope.requests = results;
            $scope.$apply();
            console.log(results);
          //})
        },function(error){
          alert("Error: " + error.code + " " + error.message);
        }
      );
    }
  }])
;