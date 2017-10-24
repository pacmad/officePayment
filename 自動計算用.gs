function formulaControl(sheetObj) {//数式反映
  //var sheetObj = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
  var last = sheetObj.getLastRow();
  var datefmt = "m/d"; 
  var numfmt = "[$¥]#,##0";
  var y4datefmt = "yyyy/MM/dd";
    for (var i = 2;i <= last ;i++){
      sheetObj.setRowHeight(i, 60);
      sheetObj.getRange(i, 1).setNumberFormat(datefmt);
      sheetObj.getRange(i, 9).setNumberFormat(numfmt);
      sheetObj.getRange(i, 10).setNumberFormat(numfmt);
      sheetObj.getRange(i,8).setNumberFormat(y4datefmt);
      sheetObj.getRange(i,11).setNumberFormat(y4datefmt);
      sheetObj.getRange(i,12).setNumberFormat(y4datefmt);
      sheetObj.getRange(i, 16).setFormula("=tairyu(K"+i+",'集計表'!D1,L"+i+")");
    }
 sheetObj.getDataRange().setHorizontalAlignment('Center');
 sheetObj.getDataRange().setBorder(true, true, true, true, true, true);
}
  
  function dateformatchange(datedata){
  var frdata = new Date(datedata);
  frdata = Utilities.formatDate(frdata, "GMT+09:00", 'yyyy/MM/dd');
  return frdata;
  }