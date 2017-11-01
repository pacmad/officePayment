//2016~2017sato-yoshitaka@akt-g.jp
function owcreate1(arr,shop) {//@pram arr = 滞留データ配列 @pram shop = 営業所コード
  var shcnt = Math.ceil(arr.length/12/9);//20160923
  var asp = SpreadsheetApp.getActiveSpreadsheet();
  var targetDate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("集計表").getRange("D1").getValue();
  var numfmt = "[$¥]#,##0";
  var numfmt2 = "@";
  var shname = "詳細";
  var shopObj = new myshopdatabese(shop);//営業所検索
  var shopname = shopObj.Name;
  var wareki = targetDay("warekimonth",targetDate);//日付処理
  var warekiday = toyearday("warekiday");
  var frsh = asp.getSheetByName(shname);
  var myfilename = "滞留明細表";
  var folname = new mysheetdatabese()["shopfolder"];
  var spobj = myfilecreate(myfilename,folname);//新ファイルオブジェクト
  var tosp = SpreadsheetApp.open(spobj);
  tosp.rename(warekiday+shopname+myfilename);
  var tosh = tosp.getSheetByName("原紙");
   if (shcnt != 1){//20160923
    for (var i = 2;i<=shcnt;i++){
     tosh.copyTo(tosp).setName(wareki + shopname +"-"+ i)
         .getRange("Q1").setValue("Ｎｏ．" + i);
    }
   }
  tosh.setName(wareki + shopname);
  //newfilecreate
  var returndata = 0;
  var sheetss = tosp.getSheets().length
   if (sheetss != 1){
   tosh = tosp.getSheets();
     for (var i = 0;i<=tosh.length-1;i++){
      returndata = setData(tosh[i],arr,shopname,returndata);
     }
   }else{
    setData(tosh,arr,shopname,returndata);
   }
   if (shcnt != 1){
   SpreadsheetApp.open(DriveApp.getFilesByName("サイン用シート").next()).getSheetByName("原紙").copyTo(tosp).setName("サイン用シート")
   }
 return tosp;
}



//function(tosh){ tosh.length
//toshの配列に対して繰り返し処理を実施予定（20161101) 
function setData(tosh,arr,shopname,returndata){
  var targetDate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("集計表").getRange("D1").getValue();
  var data = tosh.getDataRange().getValues();
  var wareki = targetDay("warekimonth",targetDate);//日付処理
  var numfmt = "[$¥]#,##0";
  var numfmt2 = "@";
  var datefmt = "m/d";
  var ary = []; 
  var j = 2;
  var cnt = 0;
  data[0][14] = shopname;
  data[0][8] = wareki ;
//<-書式変更->
    for (var i = 3 ; i <= 42 ; i++){
     tosh.getRange(i, 12).setNumberFormat(numfmt);
     tosh.getRange(i, 10).setNumberFormat(datefmt);
     tosh.getRange(i, 13).setNumberFormat(datefmt);
     tosh.getRange(i, 5,i,4).setNumberFormat(numfmt2);
     tosh.getRange(i,14).setWrap(true);
     tosh.getRange(i,14).setHorizontalAlignment('Left');
    }
  var len = arr.length-1;
    for ( var i = 0 ; i <= len ; i++){
      if (i == 0){i += returndata}
      data[j][1] = arr[i];//超過日数
      i++;
      data[j][2] = arr[i];//担当者
      ary.push(arr[i]);
      i++;
      data[j][4] = arr[i].toString();//得意先コード
      i++;
      data[j + 2][4] = arr[i];//得意先名
      i++;
      data[j][7] = arr[i].toString();//現場コード
      i++;
      data[j + 2][7] = arr[i];//現場名
      i++;
      data[j][9] = arr[i];//回収予定日←（ここ）20160512
      i++;
      data[j][12] = arr[i];//回収予定日
      i++;
      data[j][11] = arr[i];//金額
      i++
      data[j + 2][12] = arr[i];//入金予定日
      i++
      data[j][13] = arr[i];//理由
      i++
      data[j][17] = arr[i];//起因
      j += 4;
      cnt++;//個数カウント
      if ( cnt > 9){
      returndata = i + 1
      break;
      }
    }
   tosh.getDataRange().setValues(data);

var humanary = human(ary);//担当者[i]と個数[i + 1]
var humanlen = humanary.length;
var x = 0;
var ra = 0;
 //for ( i = 0 ; x >=humanlen; i++){
 while(humanary[x] != undefined){
 tosh.getRange(ra+46, 13).setValue(humanary[x + 1]);
 tosh.getRange(ra+46, 11).setValue(humanary[x]);
 tosh.getRange(ra+46,14).setNumberFormat(numfmt);
 tosh.getRange(ra+46, 14).setFormula('=if(M'+(46+ra)+ '="","", sumifs(L3:L42,C3:C42,"' + humanary[x] + '"))')
x+=2; 
ra++;
}
// j = E(5)46 to 51 , i = 1 to 6
// k (11)= E46 to 51 , 担当者
var v = 1
for(var i = 46;i <= 51 ; i++){
tosh.getRange(i, 5).setFormula('=if(countifs(B3:B42,'+ v + ') =0,"",countifs(B3:B42,'+ v + '))');
tosh.getRange(i,6).setNumberFormat(numfmt);
tosh.getRange(i, 6).setFormula('=if( E'+ i +'="","", sumifs(L3:L42,B3:B42,' + v + '))');
v++
}
tosh.getRange("E52").setFormula("=SUM(E46:E51)");
tosh.getRange("F52").setFormula("=SUM(F46:F51)");
tosh.getRange("m53").setFormula('=COUNTIFS(R3:R42,"当方")');
tosh.getRange("m54").setFormula('=COUNTIFS(R3:R42,"先方")');
tosh.getRange("n53").setFormula('=if(M53="","",SUMIFS(L3:L42,R3:R42,"当方"))');
tosh.getRange("n54").setFormula('=if(M53="","",SUMIFS(L3:L42,R3:R42,"先方"))');
tosh.getRange("f52").setNumberFormat(numfmt);
tosh.getRange("N53:N54").setNumberFormat(numfmt);
tosh.getRange("A1:B1").setNumberFormat(numfmt2);
//<<--ここまでtoshの配列に対して繰り返し処理を実施予定（20161101)
return returndata
}

//上記各シート呼び出し
//B列→R列　3行→6行　３行目に下記　５行目E列に会社名　５行目H列に現場名
//超過→担当者→会社コード→現場コード→締日→滞留金額→回収予定→理由→起因


function AddFormula(tospobj,dataArray,dataName,dimension){
 var numRows = dataArray.length;
 var tosh = tospobj.getSheetByName("サイン用シート");
  switch(dataName){
   case "response":
    tosh.getRange(46, 5, numRows, 2).setValues(dataArray);
    break;
   case "human":
    tosh.getRange(46,13,numRows,2).setValues(dataArray);
    break;
   case "because":
    tosh.getRange(53,13,numRows,2).setValues(dataArray);
    break;
   default:
    if (dimension == 1){
    tosh.getRange(46,11,numRows,1).setValues(dataArray);
    }
    break;
  }
 var numfmt = "[$¥]#,##0";
  tosh.getRange("F46:F52").setNumberFormat(numfmt);
  tosh.getRange("N46:N52").setNumberFormat(numfmt);
  tosh.getRange("f52").setNumberFormat(numfmt);
  tosh.getRange("N53:N54").setNumberFormat(numfmt);
  tosh.getRange("E52").setFormula("=SUM(E46:E51)");
  tosh.getRange("F52").setFormula("=SUM(F46:F51)");

}

