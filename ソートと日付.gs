function mysort(actsh) { //@pram->cnt 数　@pram->actsh シートOBJ
//sort -> 部門コード→得意先コード→現場コード→日付
  var actsh = SpreadsheetApp.getActiveSheet();
  var lastrow = actsh.getLastRow();
  var lastcol = actsh.getLastColumn();
  var range = actsh.getRange(3, 1, lastrow-3,lastcol);
  range.sort([{column: 2, ascending: true}, {column: 4, ascending: true},{column: 6, ascending: true}, {column: 8, ascending: true}]);

}

function toyearday(ans,targetDate) {//日付
  var now = new Date();
  var year= now.getFullYear();
  if(ans == undefined){
  year = year - 2000 + 12;
  }
  else if(ans == "warekiday"){
  year = year - 2000 + 12;
  }
  var month = now.getMonth()+1;
  var day =now.getDate();
  var strday=String(day);
  var stryear =String(year);
  var strmonth =String(month);
  if (strmonth<10){
   strmonth= 0+strmonth
   }
 else if(strmonth>9) {
     strmonth=strmonth
  }
  if (strday<10){
   strday= 0+strday
   }
 else if(strday>9) {
     strday=strday
  }
  
  if (ans == "short"){
  var yms =stryear+strmonth+strday ;
  }
  else if (ans =="long"){
  var yms = [];
  yms.slush =stryear+"/"+strmonth+"/"+strday;
  yms.yyyy = stryear;
  yms.MM = strmonth;
  yms.dd = strday;
  
}
else if (ans==undefined){
var yms = "Ｈ" + stryear + "."+ strmonth  ;
}

else if (ans=="warekiday"){
var yms = "Ｈ" + stryear + "."+ strmonth+ "."+ strday;
}
Logger.log(yms);
return yms ;
}


function targetDay(ans,targetDate) {//日付
  var now = new Date(targetDate);
  var year= now.getFullYear();
  if(ans == "warekimonth"){
  year = year - 2000 + 12;
  }
  else if(ans == "warekiday"){
  year = year - 2000 + 12;
  }
  var month = now.getMonth()+1;
  var day =now.getDate();
  var strday=String(day);
  var stryear =String(year);
  var strmonth =String(month);
  if (strmonth<10){
   strmonth= 0+strmonth
   }
 else if(strmonth>9) {
     strmonth=strmonth
  }
  if (strday<10){
   strday= 0+strday
   }
 else if(strday>9) {
     strday=strday
  }
  
  if (ans == "short"){
  var yms =stryear+strmonth+strday ;
  }
  else if (ans =="long"){
  var yms = [];
  yms.slush =stryear+"/"+strmonth+"/"+strday;
  yms.yyyy = stryear;
  yms.MM = strmonth;
  yms.dd = strday;
  
}
else if (ans=="warekimonth"){
var yms = "Ｈ" + stryear + "."+ strmonth  ;
}

else if (ans=="warekiday"){
var yms = "Ｈ" + stryear + "."+ strmonth+ "."+ strday;
}
Logger.log(yms);
return yms ;
}

function B(){
var targetDate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("集計表").getRange("D1").getValue();
var wareki = targetDay("warekimonth",targetDate);//日付処理
Logger.log(wareki);
}