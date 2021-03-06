//2016sato-yoshitaka@akt-g.jp
//2017sato-yoshitaka@akt-g.jp
//20171102sato-yoshitaka@akt-g.jp
function datadd() {
  var fromfname = Browser.inputBox("入金ファイル名を入力して下さい");
  if(fromfname == "cancel"){
    return
  }
  var fromshid = fileinsp(fromfname);
  if(fromshid == undefined){
    return
  }
  var fromsp = SpreadsheetApp.openById(fromshid);
  var fromsh = fromsp.getActiveSheet();
  var frdata = fromsh.getDataRange().getValues();
  var now = new Date();
  var MM = now.getMonth() + 1;
  var YY = now.getFullYear();
  var actsp = SpreadsheetApp.getActiveSpreadsheet();
  var actsh = actsp.getSheetByName("明細");//追加するシート名称
  var acdata = actsh.getDataRange().getValues();
  var aclen = acdata.length-1;
  var datefmt = "m/d";
  var numfmt = "[$¥]#,##0";
  var numfmt2 = "@";
  var frlen = frdata.length-1;
  var cnt = actsh.getLastRow();
    for (var j = 5;j<=frdata.length-1;j++){
       var frshopcode = frdata[j][1];
       frshopcode = Number(frshopcode);
       if (frshopcode == ""){
         break;
       }
  var frcustcode = frdata[j][3];
  frcustcode = Number(frcustcode);
  var frsitecode = frdata[j][7];
   frsitecode = Number(frsitecode);
   var frrimtdate = frdata[j][16];
   frrimtdate = new Date(frrimtdate);
   var frMM = frrimtdate.getMonth() + 1;
   var frYY = frrimtdate.getFullYear();
   frrimtdate = frrimtdate.toString();
    switch(YY - frYY){
     case 0:
      break;
     case 1:
      MM = MM + 12 ;
      break;
     case -1:
      frMM = frMM + 12;
      break;
     default:
      break;
    }
   if(MM < frMM){
    continue;
   }
   var flag = false
    for (var i = 2; i<=acdata.length-1;i++){
     var shopcode = acdata[i][1];
     shopcode = Number(shopcode);
     var custcode = acdata[i][3];
     custcode = Number(custcode);
     var sitecode = acdata[i][5];
     sitecode = Number(sitecode);
     var rimtdate = acdata[i][10];
     rimtdate = new Date(rimtdate);
     rimtdate = rimtdate.toString();
     if((shopcode == frshopcode) && (custcode == frcustcode) && (sitecode == frsitecode) && (rimtdate == frrimtdate)){
      break;
     }else{
      flag = true;
     }
     if( i != acdata.length-1){
      continue;
     }
     if (flag){
      var arr =[];
      arr.push("NEW");//NEW表示
      arr.push(frdata[j][1]);//営業所コード
      var comname = strtrim(frdata[j][4]);
      arr.push(comname);//得意先名称
      var cmzero = cmnozeropad(frdata[j][3]);//ゼロ埋め
      cmzero = cmzero.toString();//str
      arr.push(cmzero);//得意先コード
      arr.push(frdata[j][8]);//現場名称
      var sizero = sinozeropad(frdata[j][7]);//現場コード
      sizero = sizero.toString();//str
      arr.push(sizero);//現場コード
      var namestr = strcov(frdata[j][9]);
      var wizero = widzeropad(frdata[j][5]) ;
      arr.push(namestr);//担当者
      arr.push(frdata[j][10]);//計上日
      arr.push(frdata[j][11]);//計上金額
      arr.push(frdata[j][15]);//滞留金額
      arr.push(frdata[j][16]);//回収予定日
      arr.push("");//空白
      arr.push("");//空白
      arr.push("");//空白
      arr.push("");//空白
      arr.push("");//空白
      //arr.push(frdata[j][5]);//窓口
      actsh.appendRow(arr);
      var row = actsh.getLastRow();
      actsh.getRange(row, 4, 1, 3).setNumberFormat(numfmt2);
      //actsh.getRange(row, 17).setNumberFormat(numfmt2);
      actsh.getRange(row, 4).setValue(cmzero);
      actsh.getRange(row, 6).setValue(sizero);
      //actsh.getRange(row, 17).setValue(wizero);
      actsh.getRange(row, 16).setFormula("=tairyu(K"+row+",'集計表'!D1,L"+row+")");
     }
  }//j
 }//i
//↓書式関係
 var lastrow = actsh.getLastRow();
 actsh.getDataRange().setBorder(true, true, true, true, true, true);
  for ( var h = 2 ; h<=lastrow ; h++){
   actsh.setRowHeight(h, 60);
   actsh.getRange(h, 1).setNumberFormat(datefmt);
   actsh.getRange(h, 9).setNumberFormat(numfmt);
   actsh.getRange(h, 10).setNumberFormat(numfmt);
   actsh.getDataRange().setHorizontalAlignment('Center');
  }//h
//from -> to 
//row,col 1 部門 row,col 1
//row,col 4　得意先名称 row, col 2
//row,col 3 得意先コード　row,col 3
//row,col 8 現場名称 row,col4
//row,col 7 現場コード row,col5
//row,col 9 担当者　row,col6
//row,col 10 計上日　row,col7
//row,col 15 売り掛け残金 row,col8
//row,col 16 回収予定日　row,col9
 mysort(actsh);
 //fromsp.rename(fromsp.getName()+"NEW作成済み")
}//func



function dataBackUp(){
 var dataSh = SpreadsheetApp.open(DriveApp.getFilesByName("共通　　滞留予定").next()).getSheetByName("明細");
 var targetSh = SpreadsheetApp.open(DriveApp.getFilesByName("滞留予定Ver.2.０").next()).getSheetByName("明細");
 var data = dataSh.getDataRange().getValues();
 targetSh.clear();
 targetSh.getRange(1,1,data.length, data[0].length).setValues(data);
 formulaControl(targetSh);
}

