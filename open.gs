// 2015~2017sato-yoshitaka@akt-g.jp
function onOpen() {
  var today = toyearday("long");
  var slush = today.slush;
  var time = new Date().getTime() +  (1000 * 60 * 60 * 9);
  var tvalue = time/(1000 * 60 * 60 * 24)+25569;
  var sp = SpreadsheetApp.getActiveSpreadsheet();
  var mymenu = [];
  var youmenu = [];
  mymenu.push({name:'NEW作成',functionName:"showUploader"});
  mymenu.push({name:'月末入金状況確認表作成',functionName:"officeformatlist"});
  mymenu.push({name:'集計表作成',functionName:"officecreate"});
  youmenu.push({name:'メール報告',functionName:"ofcmailTestFunction"});
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
  }//i
  var userInterface = HtmlService.createTemplateFromFile("notice").evaluate();
  sp.show(userInterface);
}