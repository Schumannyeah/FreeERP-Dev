function padStr(i) {
	return (i < 10) ? "0" + i : "" + i;
}

// print DateStr in Format MM/DD/YYYY
function printDateStrNow() {
	var temp = new Date();
	var dateStr = padStr(1 + temp.getMonth()) + '/' + padStr(temp.getDate()) + '/' + padStr(temp.getFullYear()) ;
	// padStr(temp.getHours()) +
	// padStr(temp.getMinutes()) +
	// padStr(temp.getSeconds());
	return dateStr;
}

// print DateStr in Format MM/DD/YYYY
// with given Date
function printDateStrInMmDdYyyy(d) {
	if (isDate(d)) {
		var dateStr = padStr(1 + d.getMonth()) + '/' + padStr(d.getDate()) + '/' + padStr(d.getFullYear()) ;
		// padStr(temp.getHours()) +
		// padStr(temp.getMinutes()) +
		// padStr(temp.getSeconds());
		return dateStr;
	}
}

let isDate = function (input) {
	if (Object.prototype.toString.call(input) === "[object Date]")
		return true;
	return false;
};

var d1;
var d2;
function dayDiffBetween2Dates(d1,d2){
	if (isDate(d1) && isDate(d2)) {
		var timeDiff = Math.abs(d2.getTime() - d1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diffDays;
	} else {
		return 0;
	}
}

