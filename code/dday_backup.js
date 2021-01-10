module.exports.function = function dday (startDate,find, kinds) {



function dateAddDel(sDate, nNum, type) {
	var yyyy = parseInt(sDate.substr(0, 4), 10);
	var mm = parseInt(sDate.substr(4, 2), 10);
	var dd = parseInt(sDate.substr(6, 2), 10);
	if (type == "d") {
		d = new Date(yyyy, mm-1, dd + nNum);
	} else if (type == "m") {
		d = new Date(yyyy, mm-1 + nNum, dd);
	} else if (type == "y") {
		d = new Date(yyyy + nNum, mm, dd);
	}
	yyyy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	return '' + yyyy + '' +  mm  + '' + dd;
}


var console = require('console');
console.log(startDate)
console.log(startDate['year'],startDate['month'],startDate['day'] )
console.log(kinds)


if (String(startDate['month']).length == 1){
  startDate['month'] = '0' + String(startDate['month']-1);
}
if (String(startDate['day']).length == 1) { 
  startDate['day'] = '0' + String(startDate['day']);}

startDate['year'] = String(startDate['year'])

console.log("계산후",startDate)

startDate = startDate['year'] + startDate['month'] +startDate['day']

//var startDate = new Date(startDate['year']+ startDate['month'] + startDate['day']); 

console.log(startDate)
var now = new Date();          

if (kinds == 'ROKA' || kinds == "ROKMC") {
   var finishDate = dateAddDel(startDate, 18, 'm'); 
  }else if (kinds == 'ROKAF') {
  var finishDate = dateAddDel(startDate, 22, 'm');
  }else if (kinds == 'ROKNAVY') {
    var finishDate = dateAddDel(startDate, 20, 'm');}


// if (kinds == 'ROKA' || kinds == "ROKMC") {
//    var finishDate = startDate.setMonth(startDate.getMonth() + 18); 
//   }else if (kinds == 'ROKAF') {
//    var finishDate = startDate.setMonth(startDate.getMonth() + 22);
//   }else if (kinds == 'ROKNAVY') {
//    var finishDate = startDate.setMonth(startDate.getMonth() + 20);}

console.log(finishDate)

var Y = finishDate.slice(0,4)
var M = finishDate.slice(4,6)
var D = finishDate.slice(6,8)

console.log(Y,M,D)
var finishDate = new Date(Y,M,D )
console.log("date",finishDate)
var gap = now.getTime() - finishDate.getTime();    // 현재 날짜에서 D-day의 차이를 구한다.
var DDay = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;    // gap을 일(밀리초 * 초 * 분 * 시간)��� 나눈다. 이 때 -1 을 곱해야 날짜차이가 맞게 나온다.
 
 
console.log("남은 날은 " + DDay + " 일 입니다.", "전역일은 "+ finishDate); 

return DDay
}

// var roka_std = "2017-01-03" ;
// minus_day = minus(start,'ROKA')
// console.log("단축일", minus_day) // 여기 이상 
// console.log("convert", convert(start))
// console.log('minus2',rtn_day(convert(start), roka_std))
// var test = rtn_day(convert(start), roka_std) * -1 / 14 ;
// console.log(test)
// console.log('minus result',Math.floor(test)+1 )

// if (kinds == 'ROKA' || kinds == "ROKMC") {
//    var end = start.setMonth(startDate.getMonth() + 18); 
//   }else if (kinds == 'ROKAF') {
//    var end = start.setMonth(startDate.getMonth() + 22);
//   }else if (kinds == 'ROKNAVY') {
//    var end = start.setMonth(startDate.getMonth() + 20);}