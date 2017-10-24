function formulaControl() {//数式反映
  var sph = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
var last = sph.getLastRow();
var datefmt = "m/d"; 
var numfmt = "[$¥]#,##0";
var y4datefmt = "yyyy/MM/dd";

for (var i=2;i<=last ;i++){

sph.setRowHeight(i, 60);
sph.getRange(i, 1).setNumberFormat(datefmt);
sph.getRange(i, 9).setNumberFormat(numfmt);
sph.getRange(i, 10).setNumberFormat(numfmt);
sph.getRange(i,8).setNumberFormat(y4datefmt);
sph.getRange(i,11).setNumberFormat(y4datefmt);
sph.getRange(i,12).setNumberFormat(y4datefmt);
sph.getRange(i, 16).setFormula("=tairyu(K"+i+",'集計表'!D1,L"+i+")");
}
sph.getDataRange().setHorizontalAlignment('Center');
sph.getDataRange().setBorder(true, true, true, true, true, true);
}

function dateformatchange(datedata){
var frdata = new Date(datedata);
frdata = Utilities.formatDate(frdata, "GMT+09:00", 'yyyy/MM/dd');
return frdata;
}