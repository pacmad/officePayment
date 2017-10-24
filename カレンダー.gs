 //2016 sato-yoshitaka@akt-g.jp　
function ow_calendersys_create() {
 var sheet = SpreadsheetApp.getActiveSheet();//アクティブシート
 var lastrow = sheet.getLastRow();//最終行
 var lastcol = sheet.getLastColumn();//最終列
 var maxcol = sheet.getMaxColumns();
 var maxrow = sheet.getMaxRows();
 var datefmt = "m/d"; 
 var defcal = CalendarApp.getDefaultCalendar();//デフォルトカレンダー
var shop = Browser.inputBox("営業所コードを入力", Browser.Buttons.OK_CANCEL);
// var shop = 1001402;
 if(shop == "cancel"){
return;
}
shop = shop.toString();
var data = sheet.getDataRange().getValues();
var len = data.length-1;
 for (var i=1;i<=len;i++){
 var scd = data[i][14];//登録フラグ
 if (scd != "カレンダー登録"){
 continue;
 }
 var shopd = data[i][1].toString(); 
 if (scd == "カレンダー登録" && shop == shopd){
 var title = '確認日：' + data[i][2]+'-'+data[i][4];//得意先→現場→計上金額
 var dayevent = data[i][0];//日付
 var des = data[i][6]+'の現場：' +data[i][2]+'-'+data[i][4]+'の確認日です';//内容
 var site = data[i][2];//営業所
 defcal.createAllDayEvent(title,dayevent, {description:des,location:site});
data[i][14] = "";//フラグ消去
sheet.getDataRange().setValues(data);
}
}

for ( i = 2; i<=lastrow ;i++){
var formula ="=tairyu(K"+i+",'集計表'!D1,L"+i+")";
sheet.getRange(i,16).setFormula(formula);
sheet.getRange(i,1).setNumberFormat(datefmt);
}
}
