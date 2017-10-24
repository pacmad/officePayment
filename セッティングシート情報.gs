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
    
    function testfunc_b(){
    var obj = new myshopdatabese(1001402);
    for (var object in obj){ 
    Logger.log(obj[object]);}
}
//*/




/*function myshops(shopcode) {//@pram->部門コード @ret->部門名称
shopcode = shopcode.toString();
var shop = new Object;
shop = {shop1001402:"川崎",shop1001403:"横浜",shop1001427:"京浜プラント",shop1001431:"多摩",shop1001432:"東名横浜",shop1001411:"横浜中央",
shop1001405:"金沢",shop1001407:"戸塚",shop1001421:"平塚",shop1001408:"横須賀",shop1001406:"西湘",shop1001441:"山北",
shop1001404:"厚木",shop1001430:"相模原",shop1001410:"相模中央",shop1001433:"海老名",shop1001409:"秦野",shop1001412:"営業部"};
var shp = "shop" + shopcode;
return shop[shp];  
}
*/