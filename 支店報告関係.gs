function officecreate() { //集計ページ報告
var toname = "報告";
var folname = "支店用　　集計表";
var sp = SpreadsheetApp.getActiveSpreadsheet();
var frsh = sp.getSheetByName("集計表");
var maxrow = frsh.getMaxRows();
var maxcol = frsh.getMaxColumns();
var frdata = frsh.getRange(1, 1,maxrow,maxcol).getValues();
var tospid = fileinsp(toname);
var tosp = SpreadsheetApp.openById(tospid);
var tosh = tosp.getSheets()[0]; 
tosh.clear({contentsOnly:true});
var newfile = myfilecreate(toname,folname);
SpreadsheetApp.open(newfile).getSheets()[0].getRange(1, 1,maxrow,maxcol).setValues(frdata);
}