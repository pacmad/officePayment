function officeformatlist() {
var sp = SpreadsheetApp.getActiveSpreadsheet();
var frsh = sp.getSheetByName("明細");
var frdata = frsh.getDataRange().getValues();  
var len = frdata.length-1;
var myfilename ="本社報告用エクセルリスト";
var folname = "支店用　　月末入金状況確認表";
var newfile = myfilecreate(myfilename,folname)
var tosp = SpreadsheetApp.open(newfile);
var tosh = tosp.getSheets()[0];
var numfmt = "[$¥]#,##0";
var numfmt2 = "@";
var numfmt3 = "yyyy/MM/dd";
var datedata = "";
//リスト作成処理
for( i = 1 ; i<= len ; i++){
/*
var flag = frdata[i][14]//flag
if (flag!="本社報告"){
continue;
}
if(flag=="本社報告"){
*/
var listarr = [];
listarr.push(frdata[i][1]);
listarr.push(frdata[i][3].toString());
listarr.push(frdata[i][2]);
listarr.push("");//frdata[i][16].toString()
listarr.push(frdata[i][5].toString());
listarr.push(frdata[i][4]);
listarr.push(frdata[i][6]);
datedata = dateformatchange(frdata[i][7]);
listarr.push(datedata);//date計上日
listarr.push(frdata[i][8]);
listarr.push(frdata[i][9]);
listarr.push("");
listarr.push("");
listarr.push("");
datedata = dateformatchange(frdata[i][11]);
listarr.push(datedata);//date入金予定日
listarr.push(frdata[i][15]);
listarr.push("");
listarr.push("");
listarr.push(frdata[i][0]);
listarr.push("");
listarr.push(frdata[i][13]);
listarr.push(frdata[i][12]);
tosh.appendRow(listarr);
var lastrow = tosh.getLastRow();
tosh.getRange(lastrow, 2).setNumberFormat(numfmt2).setValue(frdata[i][3].toString());
tosh.getRange(lastrow, 4).setNumberFormat(numfmt2).setValue("窓口コード");//setValue(frdata[i][16].toString());
tosh.getRange(lastrow, 5).setNumberFormat(numfmt2).setValue(frdata[i][5].toString());
tosh.getRange(lastrow, 8).setNumberFormat(numfmt3);
tosh.getRange(lastrow, 14).setNumberFormat(numfmt3);
tosh.getRange(lastrow, 18).setNumberFormat(numfmt3);

//frsh.getRange(i+1,15).setValue("報告済み")

//}//if
}//i

/*本社報告リスト
①部門コード １
②得意先コード　３
③得意先名称　２
④窓口コード　１６　
⑤現場コード　５
⑥現場名称　４
⑦営業担当　６
⑧計上年月日　７　col = 9 date
⑨請求金額　８
⑩前月残高　９
⑪当月値訂正金額？　””
⑫当月入金金額？　””
⑬当月売掛残高？　””
⑭回収予定年月日　１０　col = 10 date
⑮超過月　１５
⑯回収日　””
⑰回収金額　””
⑱処理日　０
⑲済み？　””
⑳発生原因？起因　１３
㉑取組状況→理由　１４
*/




}//func
