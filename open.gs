// 2015~2017sato-yoshitaka@akt-g.jp
function onOpen() {
var today = toyearday("long");
var slush = today.slush;
var time = new Date().getTime() +  (1000 * 60 * 60 * 9);
var tvalue = time/(1000 * 60 * 60 * 24)+25569;
var sp = SpreadsheetApp.getActiveSpreadsheet();
//メニュー
var mymenu = [];
var youmenu = [];
mymenu.push({name:'NEW作成',functionName:"datadd"});
mymenu.push({name:'月末入金状況確認表作成',functionName:"officeformatlist"});
mymenu.push({name:'集計表作成',functionName:"officecreate"});
youmenu.push({name:'メール報告',functionName:"ofcmail"});
youmenu.push({name:'滞留一覧表作成',functionName:"ofcnomail"});
youmenu.push({name:'カレンダーへ追加処理',functionName:"ow_calendersys_create"});
youmenu.push({name:'滞留追加受付表示',functionName:"showReception"});
sp.addMenu('支店担当者メニュー',mymenu);
sp.addMenu('営業所担当者メニュー',youmenu);

var shs = sp.getSheets();
var con = [];
for (var i = 0 ; i<=shs.length-1 ; i++){
if (i==0){
shs[i].getRange(1, 4).setValue(slush);
continue;
}
/*
var data = shs[i].getDataRange().getValues();
var datalen = data.length;
for ( var j = 1 ; j<=datalen-1 ; j++){
var tar = data[j][0];
var type = typeof tar;
if (type == "object"){
tar = new Date(tar).getTime() + (1000 * 60 * 60 * 9);
tar = tar/(1000 * 60 * 60 * 24)+25569;
}
if (tar < tvalue){
shs[i].getRange(j + 1, 1).setBackground('Red');
}
if(data[j][0] == ""){
shs[i].getRange(j + 1, 1).setBackground('White');
}

}//j
*/
}//i
}//func
