//2016_sato-yoshitaka@akt-g.jp"フィールド報告用"から引用
//201711 テーブル表示用に改変
function doGet(e){
 var html = HtmlService.createTemplateFromFile("todo").evaluate();
 return html
}
function officelocal_dataFetch(sp_id,sh_name,plus_date) {
 var data = SpreadsheetApp.openById(sp_id).getSheetByName(sh_name).getDataRange().getValues();
 this.linkURL = SpreadsheetApp.openById(sp_id).getUrl();
 this.just = [];
 this.small = [];
 var flg = "";
 var snflg = "";
 var j = 0;
 var k = 0;
  for (var i = 1;i<=data.length-1;i++){
  flg = lib.dateCompr(data[i][12],plus_date);//flg = small=要インプット他 ,just=明日の予定,elseDay=それ以外
   if(flg == "elseDay"){
    continue
   }else if(flg == "just"){
   　snflg = repairFlag(data[i][7].toString());
     this.just[j] = new Array();
     this.just[j].push(data[i][0]);
     this.just[j].push(data[i][1]);
     this.just[j].push(data[i][3]);
     this.just[j].push(data[i][5]);
     this.just[j].push(data[i][14]);
     this.just[j].push(Utilities.formatDate(data[i][12],'Asia/Tokyo','YY年MM月dd日')+ "／"+ snflg +"：" + data[i][13] + "／" + data[i][15]);     
     j+=1
   }else if(flg == "small"){
   　snflg = repairFlag(data[i][7].toString());
     this.small[k] = new Array();
     this.small[k].push(data[i][0]);
     this.small[k].push(data[i][1]);
     this.small[k].push(data[i][3]);
     this.small[k].push(data[i][5]);
     this.small[k].push(data[i][14]);
     this.small[k].push(Utilities.formatDate(data[i][12],'Asia/Tokyo','YY年MM月dd日')+ "／"+ snflg +"：" + data[i][13] + "／" + data[i][15]);
     k+=1
   }
  }
 return this
}

function officelocal_dataFetchMonth(sp_id,sh_name,row,col){
 var data = SpreadsheetApp.openById(sp_id).getSheetByName(sh_name).getDataRange().getValues();
 var select_data  = data[row-1][col-1];
 return select_data.toString();
}


function officelocal_dateCompr(targetDate,plusDate){//日付比較
 var target = new Date(targetDate);
 var toD = new Date(); 
 var myD = new Date();
 var day = myD.getDate()+plusDate;
 var dayM = toD.getDate()-1;
 myD.setDate(day);
 toD.setDate(dayM);
 var flgstr = "";
 if (myD>=target && target>=toD){
  flgstr = "just";
 } else if(toD > target){
  flgstr = "small";
 } else {
  flgstr = "elseDay";
 }
return flgstr
}

function tablefunc(dataArray) {
  var header = ""
var content = "<table class='type08'><thead><tr>"
             + "<th>入力日</th>"
             + "<th>クレーム番号</th><th>依頼営業所</th>"
             + "<th>得意先</th><th>現場</th>"
             + "<th>担当予定</th><th>実施予定OR満了日等</th>"
             + "</tr></thead><tbody>";  
 for(var i = 0;i < dataArray.length;i++){
   content = content + "<tr>";
     for(var j = 0;j < dataArray[i].length;j++){
       content = content + "<th scope='row'><b>" + dataArray[i][j] + "</b></th>";
     }
   content = content + "</tr>";
 }
 content = header + content + "</tbody></table><body>";      
 return content
}

