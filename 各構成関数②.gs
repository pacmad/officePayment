//営業所読み込み　20160502　使用廃止（データシートファイルに移行）
function myshops(shopcode) {//@pram->部門コード @ret->部門名称
shopcode = shopcode.toString();
var shop = new Object;
shop = {shop1001402:"川崎",shop1001403:"横浜",shop1001427:"京浜プラント",shop1001431:"多摩",shop1001432:"東名横浜",shop1001411:"横浜中央",
shop1001405:"金沢",shop1001407:"戸塚",shop1001421:"平塚",shop1001408:"横須賀",shop1001406:"西湘",shop1001441:"山北",
shop1001404:"厚木",shop1001430:"相模原",shop1001410:"相模中央",shop1001433:"海老名",shop1001409:"秦野",shop1001412:"営業部"};
var shp = "shop" + shopcode;
return shop[shp];  
}


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