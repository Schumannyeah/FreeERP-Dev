//! sisCookie.js
//! version : 0
//! authors : Schumann
//! license : MIT
//! psdworld.com
//! incorporate main cookie functions

//-------------------------------------sis Cookie Function--------------------------------------------
	function setCookie(cookieName,cookieValue,cookieExpires,cookiePath){
		cookieValue = escape(cookieValue);//编码latin-1
		if(cookieExpires=="")
		{
			var nowDate = new Date();
			nowDate.setMonth(nowDate.getMonth()+6);
			cookieExpires = nowDate.toGMTString();
		}else{
			var today = new Date();
			today.setDate(today.getDate()+cookieExpires);
			cookieExpires = today.toGMTString();
		}
		if(cookiePath!="")
		{
			cookiePath = ";Path="+cookiePath;
		}
		document.cookie= cookieName+"="+cookieValue+";expires="+cookieExpires+cookiePath;
	}
	
	function getCookieValue(cookieName){
		var cookieValue = document.cookie;
		var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");
		if(cookieStartAt==-1)
		{
		  cookieStartAt = cookieValue.indexOf(cookieName+"=");
		}
		if(cookieStartAt==-1)
		{
		  cookieValue = null;
		}
		else
		{
		  cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;
		  cookieEndAt = cookieValue.indexOf(";",cookieStartAt);
		  if(cookieEndAt==-1)
		  {
		    cookieEndAt = cookieValue.length;
		  }
		  cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1
		}
		return cookieValue;
	}
	
	function getCookie(name)
	{
    	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    	if(arr=document.cookie.match(reg))
    	return unescape(arr[2]);
    	else
    	return null;
	}
	
	function delCookie(name)
	{
    	var exp = new Date();
    	exp.setTime(exp.getTime() - 1);
    	var cval=getCookie(name);
    	if(cval!=null){
    		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    	}
	} 
	
//-------------------------------------Useful Functions--------------------------------------------	
    // the following apply for both
    // undefined and null
    function isUndefined(exp){
    	if (typeof(exp) == undefined || exp == "undefined")
    	{
    	    return true;
    	}else{
    		return false;
    	}
    }
	
    function isNull(arg1)
    {
    	return !arg1 && arg1!==0 && typeof arg1!=="boolean"?true:false;
    }
    
    function isStringUndefined(exp){
    	if (exp == "undefined")
    	{
    	    return true;
    	}else{
    		return false;
    	}
    }
    
    function isEmpty(str){
    	return (!str || 0 === str.length);
    }
    
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
//-------------------------------------Activated Functions--------------------------------------------	    
    // check if a property belongs to prototype or living example
    // "myPropertyName in object" return true whether the property exists in living example or in prototype
    // "object.hasOwnProperty(myPropertyName)" return true, only when myPropertyName exists in the living example
    // the function below return true only when myPropertyName exists only in the prototype 
    
    function hasPrototypeProperty(object, myPropertyName){
    	return !object.hasOwnProperty(myPropertyName) && (myPropertyName in object);
    }
    
    
    
//-------------------------------------Understanding Object--------------------------------------------
var kadmin = {
	name: "Schumann-Ye",
	age: 39,
	job: "Head Of Operation, KMCJ",
	email: "xian.wei.ye@km.kongsberg.com",
	cellphone: "18001501800",
	_yearStartInKM: "2019",
	yearInKTK: 1,
	
	sayName: function(){
		alert(this.name);
	}
};

// 4 important data properties:
// configurable, enumerable, writable, value
Object.defineProperty(kadmin,"name",{
	writable: false
});
Object.defineProperty(kadmin,"email",{
	writable: false
});
Object.defineProperty(kadmin,"cellphone",{
	writable: false
});

//4 important accessor properties:
//configurable, enumerable, get, set
// _somePorperty means it should be accessed
// only by method e.g. getter, setter
//Object.defineProperty(kadmin,"year",{
//	get: function(){
//		return this._yearStartInKM;
//	},
//	set: function(newYear){
//		if(newYear > 2006){
//			this.yearInKTK += newYear - 2006;
//		}
//	}
//})

// another option to define accessor properties
kadmin.__defineGetter__("year",function(){
	return this._yearStartInKM;
});
kadmin.__defineSetter__("year",function(newYear){
	if(newYear > _yearStartInKM){
		this.yearInKTK += newYear - _yearStartInKM;
	}
});

// Using most suitable pattern
// define multiple properties
var account = {};
Object.defineProperties(account,{
	_id:{
		value : 0
	},
	fullnamecn:{
		value : ""
	},
	// accessor properties
	id:{
		get: function(){
			return this._id;
		},
		set: function(newId,newName){
			if(newId > 0){
				this._id = newId;
				this.fullnamecn = newName;
			}
		}
	}
});

// var descriptor = Object.getOwnPropertyDescriptor(account,"_id"); //undefined
// console.log(descriptor.value); // 0
// console.log(descriptor.configurable); // false
// console.log(typeof descriptor.get); // undefined
// var descriptor = Object.getOwnPropertyDescriptor(account,"id"); //undefined
// console.log(descriptor.value); // undefined
// console.log(descriptor.configurable); // false
// console.log(typeof descriptor.get); // "function"

//-------------------------------------factory pattern--------------------------------------------
// factory pattern
// use the function below to create an object and return it
// problem: Object Type could not be detected
function createUser(lastname_cn, firstname_cn, lastname_en, firstname_en, passwords, email){
	var o = new Object();
	o.lastname_cn = lastname_cn;
	o.firstname_cn = firstname_cn;
	o.lastname_en = lastname_en;
	o.firstname_en = firstname_en;
	o.passwords = passwords;
	o.email = email;
	
	o.welcomeUser = function(){
		alert("欢迎你，用户" + this.lastname_cn + this.firstname_cn + "!");
	};
	
	return o;
}

// factory pattern
// way to create an new Object
//var user1 = createUser("叶","贤伟","Yeah","Schumann","1234567","schumann@ktk.com.cn");
//user1.welcomeUser();

//-------------------------------------constructor pattern--------------------------------------------
// constructor pattern
// the created Object stores under Global Object (window object for browser)

// difference compared with factory pattern:
// 1. function name starting with a Capital Letter (not compulsory but better)
// 2. no explicitly creating object (new Object());
// 3. directly assigning value & properties to this;
// 4. no return;

// when creating a new reference, the keyword "new" must be used
// Four steps how constructor pattern works
// 1. create a new object
//		var user1 = new User("叶","贤伟","Yeah","Schumann","1234567","schumann@ktk.com.cn");
// 2. assign action scope to the new object (so the keyword "this" in the code refers to the new object)
// 3. execute codes (add new properties to the new object)
// 4. return new object
function User(lastname_cn, firstname_cn, lastname_en, firstname_en, passwords, email){
	this.lastname_cn = lastname_cn;
	this.firstname_cn = firstname_cn;
	this.lastname_en = lastname_en;
	this.firstname_en = firstname_en;
	this.passwords = passwords;
	this.email = email;
	
	this.welcomeUser = function(){
		alert("Welcome! User - " + this.lastname_cn + this.firstname_cn + "!");
	};
	this.sayName = function(){
		console.log(this.lastname_cn + this.firstname_cn);
	};
}

//constructor pattern
// ways to create an new Object
// 1. being treated as constructor function
// var user1 = new User("叶","贤伟","Yeah","Schumann","1234567","schumann@ktk.com.cn");
// var user2 = new User("蒋","红","Jiang","Sarah","1234567","sarah@ktk.com.cn");
// user1.welcomeUser();
// 2. being treated as a normal function
// User("叶","贤伟","Yeah","Schumann","1234567","schumann@ktk.com.cn");
// window.sayName();
// 3. being called in the action scope of another object
// var o = new Object();
// User.call(o, "叶","贤伟","Yeah","Schumann","1234567","schumann@ktk.com.cn");
// o.sayName();

// use constructor property to check the object
//alert(user1.constructor == User); // return true
//alert(user2.constructor == User); // return true

// user1 & user2 are instanceof User but also Object
// alert(user1 instanceof User);	// return true
//alert(user1 instanceof Object);	// return true
//alert(user2 instanceof User);	// return true
//alert(user2 instanceof Object);	// return true

// call it as constructor function
//      var user3 = new User("叶","贤伟","Yeah","Schumann","1234567","schumann@ktk.com.cn");
//      user3.sayName();

// call it as a normal function
//      User("蒋","红","Jiang","Sarah","1234567","sarah@ktk.com.cn");
//      window.sayName();

// call from another object's action scope
// 		var o = new User();
// 		User.call(o,"蒋","红","Jiang","Sarah","1234567","sarah@ktk.com.cn");
//      o.sayName();

//-------------------------------------prototype pattern--------------------------------------------
//prototype pattern
function Person(){
	Person.prototype.name = "Schumann";
	Person.prototype.age = 37;
	Person.prototype.job = "Plant Manager";
	Person.prototype.sayName = function(){
		console.log(this.name);
	};
}
//var person1 = new Person();
//person1.sayName();
//var person2 = new Person();
//person2.sayName();
//console.log(person1.sayName=person1.sayName);

// console.log(Person.prototype.isPrototypeOf(person1)); // true
// console.log(Object.getPrototypeOf(person1) == Person.prototype); // true
// console.log(Object.getPrototypeOf(person1).name);  // Schumann

// hasOwnProperty() can be used to check if a certain property exist in the living example -- return true
// but if the property exists only in the prototype, -- return false

// in Operator for prototype
// in shows the property both in living example and in prototype

// for-in usage
// for(var prop in Person.prototype){console.log(prop)}

// Object.keys() method 
// it will list all the enumerated properties
// var keys = Object.keys(Person.prototype);
// console.log(keys); // return an array ["name", "age", "job", "sayName"]

// use Object.getOwnPropertyNames() to return all properties (whether enumerated or not)
// var keys = Object.getOwnPropertyNames(Person.prototype);
// console.log(keys);	// return an array ["constructor", "name", "age", "job", "sayName"]


//-------------------------------------Hybrid pattern--------------------------------------------
