/*! Authorization Check Module
 * ©Schumann dated on 20170908
 */

/**
 * This module is used to check if a certain user
 * is authorized to view a certain webpage
 */

// new way
function checkAuth(username, functionarea) {
    return $.ajax({
    	method: "POST",
        url: "/kmcj/functionareaAuthorization.ajlog",
        dataType: 'json',
        data: {
			"username": username,
			"functionarea": functionarea
        }
    });
}

// a generous goto link function
function gotoLink(url){
	window.location.href=url;
}

// a generous popout function with fixed id
function popout(header,content){
	$("#mwmHeader").text(header);
	$("#mwmContent").text(content);
	$("#myWarningModal").modal('show');
}

//a generous popout Info function with fixed id
function popoutInfo(header,content){
	$("#infoHeader").text(header);
	$("#infoContent").text(content);
	$("#myInfoModal").modal('show');
}

// callback apply example
var clientData = {
	myResult: "not set",
	serverAuthCheck: function(username, functionarea){
		$.ajax({
	    	method: "POST",
	    	async: false,
	        url: "/kmcj/functionareaAuthorization.ajlog",
	        dataType: 'json',
	        data: {
				"username": username,
				"functionarea": functionarea
	        }, success: function (data) {
	        	//console.log("server answer is " + data.isauthorized);
	            if(data.isauthorized == "yes"){
	            	this.myResult = "yes";
	            	//console.log("client answer is " + this.myResult);
	            }else{
	            	this.myResult = "no";
	            }
	        }
	    });		
	}
}

function getLocalInput(username, webpage, callback, callbackObj){
	callback.apply(callbackObj,[username, webpage]);
}

////simple function + callback
//function authCheck(username, webpage){
//	$.ajax({
//    	method: "POST",
//    	async: false,
//        url: "/kmcj/webpageAuthorization.ajlog",
//        dataType: 'json',
//        data: {
//			"username": username,
//			"webpage": webpage
//        }, success: function (data) {
//        	console.log("server answer is " + data.isauthorized);
//            if(data.isauthorized == "yes"){
//            	this.myResult = "yes";
//            	console.log("client answer is " + this.myResult);
//            	return this.myResult;
//            }else{
//            	myResult = "no";
//            	return this.myResult;
//            }
//        }
//    });		
//}
//
////dynamic prototype pattern
//function AuthCheck(username, webpage){
//	this.username = username;
//	this.webpage = webpage;
//	var strAuthorized;
//	
//	if(typeof this.askServer != "function"){
//		AuthCheck.prototype.askServer = function(){
//			$.ajax({
//		    	method: "POST",
//		    	async: false,
//		        url: "/kmcj/webpageAuthorization.ajlog",
//		        dataType: 'json',
//		        data: {
//					"username": this.username,
//					"webpage": this.webpage
//		        }, success: function (data) {
//		        	console.log("my feedback is " + data.isauthorized);
//		            if(data.isauthorized == "yes"){
//		            	strAuthorized = "yes";
//		            	console.log("hey this is "+ strAuthorized);
//		            }else{
//		            	strAuthorized = "no";
//		            }
//		        }
//		    });		
//		}
//		
//		return strAuthorized;
//	}
//}
//
//
//
//
//// parasitic pattern
//function AuthorizationCheck(username, webpage){
//	var o = new Object();
//	o.username = username;
//	o.webpage = webpage;
//	
//	o.askServer = function(){
//			$.ajax({
//		    	method: "POST",
//		    	async: false,
//		        url: "/kmcj/webpageAuthorization.ajlog",
//		        dataType: 'json',
//		        data: {
//					"username": this.username,
//					"webpage": this.webpage
//		        }, success: function (data) {
//		        	console.log("my reply is " + data.isauthorized);
//		            if(data.isauthorized == "yes"){
//		            	isAuthorized = "yes";
//		            	return isAuthorized;
//		            }else{
//		            	isAuthorized = "no";
//		    	        return isAuthorized;
//		            }
//		        }
//		    });		
//		}
//	return o;
//}