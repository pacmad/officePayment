
//ファイルコピー用
function myfilecreate(myfilename,folname) {// myfilename->myfile folname->str foldername ret->newfile
var stryear = Utilities.formatDate(new Date() , 'Asia/Tokyo' , 'yyyy');
var ym = Utilities.formatDate(new Date() , 'Asia/Tokyo' , 'yyyyMMdd');
var flag = DriveApp.getFilesByName(myfilename).hasNext();
if (flag){
var drivefile = DriveApp.getFilesByName(myfilename).next();
}else{
return
}
var filename = ym+myfilename;
flag = DriveApp.getFoldersByName(folname).hasNext();
if(flag){
var fold = DriveApp.getFoldersByName(folname).next();
}else{
var fold = DriveApp.createFolder(folname);
}

var newfile = drivefile.makeCopy(filename,fold);
return newfile;
}

function address(){
var addrarr = [];
var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("とりあえず使い方");
for (var i = 101 ; i<=sh.getLastRow();i++){
var val = sh.getRange(i,1).getValue();
if (val !=""){
addrarr.push(val);
}
}
var addr = addrarr.join();
return addr
}