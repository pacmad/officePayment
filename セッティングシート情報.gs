//2016~2017sato-yoshitaka@akt-g.jp
function myshopdatabese(shopcode) {
 var str = "データシート";//セッティングシート名
 var name = "営業所データ";//営業所データシート名
 var id = fileinsp(str);
 var frspdata = SpreadsheetApp.openById(id).getSheetByName(name).getDataRange().getValues();
  for (var i = 1; i<=frspdata.length-1; i++){
   var datacode = frspdata[i][0];
   if(shopcode == datacode){
    this.Email = frspdata[i][2]; 
    this.Name = frspdata[i][1];
    this.Cc = frspdata[i][3]+","+frspdata[i][2];
    this.To = frspdata[i][4]; 
    break;
   }
  }
}
    2017-newFunctiondb
function mysheetdatabese(){
 var str = "データシート";
 var name = "未入金システムデータ";
 var id = fileinsp(str);
 var frspdata = SpreadsheetApp.openById(id).getSheetByName(name).getDataRange().getValues();
  this.warekihead = frspdata[1][1];
  this.warekicoff = frspdata[2][1];
  this.shopfolder = frspdata[3][1];
  this.branchfolder = frspdata[4][1];
  this.branchsummary = frspdata[5][1];
}
