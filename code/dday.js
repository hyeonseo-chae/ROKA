module.exports.function = function dday (startDate,find, kinds, endDate) {

var console = require('console');

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
///���자를 자리수에 맞게 변환시켜주는 함수 ex) pad(123, 4);    // 0123

function convert(day) {
  day = day.slice(0,4)+'-'+ day.slice(4,6) + '-' + day.slice(6,8)
  return day;
}
///day 형식을 2020 0607 = > 2020-06-07로 변환 

const rtn_day = (now, end) => {
  ///요구되는 day 형식 => 2020-06-07
        if (String(now).length == 10) {
      
          now = new Date(now+'T00:00:00')
        }
        if (String(end).length == 10) {
          end = new Date(end+'T00:00:00')
        }
          let gap = now.getTime() - end.getTime();
        
        return Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
      }

/// 2020-05-01 과 2020-06-01 날짜 차이 계산 

function dateAddDel(sDate, nNum, type) {
  //요구되는 day ��식 => 20200607
	var yyyy = parseInt(sDate.substr(0, 4), 10);
	var mm = parseInt(sDate.substr(4, 2), 10);
	var dd = parseInt(sDate.substr(6, 2), 10);
	if (type == "d") {
		d = new Date(yyyy, mm-1, dd + nNum);
	} else if (type == "m") {
		d = new Date(yyyy, mm-1 + nNum, dd-1);
	} else if (type == "y") {
		d = new Date(yyyy + nNum, mm - 1, dd);
	}
 
	yyyy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

	return '' + yyyy + '' +  mm  + '' + dd;
}
//디데이 계산 함수 

//함수 테스트
// start = "20200616"
// start_c = "2020-06-16"
// var roka_std = "20170103";
// var rokaf_std = "20161003";
// var roknavy_std = "20161103";
// console.log("t2",start.substr(4, 6))

// if (kinds == "ROKA" && Number("20200616") >= Number(roka_std)) {
//   ///while (parseInt(d.substr(0, 4), 10) == 2020 && parseInt(d.substr(4, 2), 10) == 6 && parseInt(d.substr(6, 2) == 2 ){
//     minus_day = Math.floor(rtn_day(start_c, convert(roka_std)) * -1 / 14) + 1 ;
// }
// // 군 별로 단축 시행 날짜��� 다름 
// console.log("t",minus_day)

function minus(start, kinds) {
  
  var minus_day = 0
  // var yyyy = parseInt(start.substr(0, 4), 10);
	// var mm = parseInt(start.substr(4, 2), 10);
	// var dd = parseInt(start.substr(6, 2), 10); 
  start_c = convert(start)  
  var roka_std = "20170103"
  var rokaf_std = "20161003"
  var roknavy_std = "20161103"

  if (kinds == "ROKA" && Number(start) >= Number(roka_std)) {
	  ///while (parseInt(d.substr(0, 4), 10) == 2020 && parseInt(d.substr(4, 2), 10) == 6 && parseInt(d.substr(6, 2) == 2 ){
      minus_day = Math.floor(rtn_day(start_c, convert(roka_std)) * -1 / 14) + 1 ;
      
            
          if (minus_day >= 90) {
            if (start.substring(4, 6) == "06" || start.substring(4, 6) == "07") {
              minus_day = 90;
              } else if (start.substring(4, 6) == "10" || start.substring(4, 6) == "03") {
              minus_day = 91;
              } else if (start.substring(4, 6) == "08") {
              minus_day = 89;
              } else {
              minus_day = 92;
              }
            }
          }

    if (kinds == "ROKAF" && Number(start) >= Number(rokaf_std)) {
	  ///while (parseInt(d.substr(0, 4), 10) == 2020 && parseInt(d.substr(4, 2), 10) == 6 && parseInt(d.substr(6, 2) == 2 ){
      minus_day = Math.floor(rtn_day(start_c, convert(rokaf_std)) * -1 / 14) + 1 ;
      
      if (minus_day == 60) {
        minus_day = 60 ;
        }else if (minus_day > 60) {
            if (start.substring(4, 6) == "03" || start.substring(4, 6) == "04") {
              minus_day = 59
              } else if (start.substring(4, 6) == "02" || start.substring(4, 6) == "09") {
              minus_day = 62;
              } else{
              minus_day = 61;
              }
            }
           }
    if (kinds == "ROKNAVY" && Number(start) >= Number(roknavy_std)) {
  ///while (parseInt(d.substr(0, 4), 10) == 2020 && parseInt(d.substr(4, 2), 10) == 6 && parseInt(d.substr(6, 2) == 2 ){
      minus_day = Math.floor(rtn_day(start_c, convert(roknavy_std)) * -1 / 14) + 1 ;
    
      if (minus_day >= 90) {
            if (start.substring(4, 6) == "04" || start.substring(4, 6) == "05") {
              minus_day = 90;
              } else if (start.substring(4, 6) == "06") {
              minus_day = 89;
              } else if (start.substring(4, 6) == "08" || start.substring(4, 6) == "01") {
              minus_day = 91;
              } else {
              minus_day = 92;
              }
            }
      }
      // !!!!!!!!!!!!!!!! 해군 6월달 마다 89 90 왔다갔다함 참고 
      if (kinds == "ROKMC" && Number(start) >= Number(roka_std)) {
  ///while (parseInt(d.substr(0, 4), 10) == 2020 && parseInt(d.substr(4, 2), 10) == 6 && parseInt(d.substr(6, 2) == 2 ){
        minus_day = Math.floor(rtn_day(start_c, convert(roka_std)) * -1 / 14) + 1 ;
    
        if (minus_day >= 90) {
            if (start.substring(4, 6) == "06" || start.substring(4, 6) == "07") {
              minus_day = 90;
              } else if (start.substring(4, 6) == "10" || start.substring(4, 6) == "03") {
              minus_day = 91;
              } else if (start.substring(4, 6) == "08") {
              minus_day = 89;
              } else {
              minus_day = 92;
              }
            }
        }
  return minus_day * -1
    
}
//substr => substring
//단축일 계산

console.log(startDate)
console.log(startDate['year'],startDate['month'],startDate['day'] )
console.log(kinds)

Str_Y = String(startDate['year']);
Str_M = pad(startDate['month'], 2);
Str_D = pad(startDate['day'], 2);

// Str_Ye = String(endDate['year']);
// Str_Me = pad(endDate['month'], 2);
// Str_De = pad(endDate['day'], 2);

var start = Str_Y + Str_M + Str_D;
console.log(start)
console.log("달",start.substring(4, 6))
// var end = Str_Ye + Str_Me + Str_De;
// console.log(end)

function datelevel(sDate, nNum, type, kinds) {
	var yyyy = parseInt(sDate.substr(0, 4), 10);
	var mm = parseInt(sDate.substr(4, 2), 10);
	var dd = parseInt(sDate.substr(6, 2), 10);
	if (type == "d") {
		d = new Date(yyyy, mm-1, dd + nNum);
	} else if (type == "m") {
		d = new Date(yyyy, mm-1 + nNum, dd-1);
	} else if (type == "y") {
		d = new Date(yyyy + nNum, mm - 1, dd);
	}
 
	yyyy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

  if (kinds == 'ROKA' || kinds == "ROKMC"|| kinds == "ROKNAVY" ) {
    dd = "01";
  }
	return '' + yyyy + '' +  mm  + '' + dd;
}
///위 코드는 진급일 계산을 위한 함수 ( 군별에 따라 진급일이 다름 )
var minus_day = minus(start,kinds)

if (kinds == 'ROKA' || kinds == "ROKMC") {
   var end = dateAddDel(start, 21, 'm');
   var end2 = dateAddDel(end, minus(start,'ROKA'), 'd');
   console.log("end",end)
   var level_1 = datelevel(start, 3, 'm',kinds); // 일병
   var level_2 = datelevel(level_1, 7, 'm',kinds) ;// 상병
   var level_3 = datelevel(level_2, 7, 'm',kinds) ;// 병장
  }else if (kinds == 'ROKAF') {
   var end = dateAddDel(start, 24, 'm');
   var end2 = dateAddDel(end, minus(start,'ROKAF'), 'd');
   var level_1 = datelevel(start, 3, 'm',kinds) ;// 일병
   var level_2 = datelevel(level_1, 6, 'm',kinds) ;// 상병
   var level_3 = datelevel(level_2, 6, 'm',kinds) ;// 병장
  }else if (kinds == 'ROKNAVY') {
   var end = dateAddDel(start, 23, 'm',kinds);
   var end2 = dateAddDel(end, minus(start,'ROKNAVY'), 'd');
   var level_1 = datelevel(start, 3, 'm',kinds); // 일병
   var level_2 = datelevel(level_1, 6, 'm',kinds); // 상병
   var level_3 = datelevel(level_2, 6, 'm',kinds); // 병장
  }


///군 종���에 따라 전역일 계산

console.log('진급일',level_1, level_2, level_3)
console.log('전역날', end)

console.log(start)
// start = start.slice(0,4)+'-'+ start.slice(4,6) + '-' + start.slice(6,8);
// end = end.slice(0,4)+'-'+ end.slice(4,6) + '-' + end.slice(6,8);


console.log("변환", start, end2)

const now = new Date();
// const s_day = new Date(start+'T00:00:00');
// const e_day = new Date(end+'T00:00:00');

console.log("now",now)
console.log("end",end)
const remining_day = rtn_day(now,convert(end2));
const tot_day = rtn_day(convert(start),convert(end2));

const remining_time = remining_day * 24;

var now_year = now.getFullYear()
var now_month = now.getMonth()
var now_date = now.getDate()

now_month = now.getMonth() + 1; now_month = (now_month < 10) ? '0' + now_month : now_month;
now_date = now.getDate(); now_date = (now_date < 10) ? '0' + dnow_date : now_date;

var now_c = now_year + now_month + now_date

console.log('now_c', now_c)

if (Number(now_c) < Number(level_1)){
  var now_level = "이등병"
}else if (Number(now_c) >= Number(level_1) && Number(now_c) < Number(level_2) ){
  var now_level = "일병"
}else if (Number(now_c) >= Number(level_2) && Number(now_c) < Number(level_3) ){
  var now_level = "상병"
}else if (Number(now_c) >= Number(level_3) && Number(now_c) < Number(end2) ){
  var now_level = "병장"
}else if (Number(now_c) >= Number(end2)){
  var now_level = "예비역"
}




//계급 별 남은 기간
var remain_level1 = rtn_day(now, convert(level_1))
var remain_level2 = rtn_day(now, convert(level_2))
var remain_level3 = rtn_day(now, convert(level_3))

var remain_level1_time = remain_level1 * 24
var remain_level2_time = remain_level2 * 24
var remain_level3_time = remain_level3 * 24


console.log(now.getFullYear());

let total = remining_day / tot_day * 100;
total = Math.round(100 - total);

if (total < 50 ) {
   var status = "아직 앞이 깜깜하네요. 힘내세요.";
  }else if (total >= 50 && total < 75 ) {
   var status = "오~~ 짬 좀 찼는걸?";
  }else if(total > 75 && total < 99 ){
   var status = "조금만 ��내세요."; 
  }else if(total > 99){
   var status = "오 ㅊㅋㅊㅋ 곧 전역이시군요!";}



console.log('입대일:',start)
console.log('단축일:',minus_day)
console.log('전역일:',end2)
console.log('근무일수:',tot_day)
console.log('남은 일수:',remining_day)
console.log('남은 시간:',remining_time)
console.log('퍼센트:',total)
console.log('진급일:',level_1, level_2, level_3)
console.log('계급:',now_level)



// console.log(Y,M,D)
// var finishDate = new Date(Y,M,D )
// console.log("date",finishDate)
// var gap = now.getTime() - finishDate.getTime();    // 현재 날짜에서 D-day의 차이를 구한다.
// var DDay = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;    // gap을 일(밀리초 * 초 * 분 * 시간)��� ��눈다. 이 때 -1 을 곱해야 날짜차이가 맞�� 나온다.
 
 


return {start : start,
        end : end2,
        tot_day : tot_day + 1 ,
        minus_day : minus_day * -1,
        remining_day: remining_day,
        remining_time: remining_time,
        status : status,
        total: total};
}