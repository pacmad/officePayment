//2016~2017sato-yoshitaka@akt-g.jp
function ofcnomail() { //col14 -> flag "報告" or ”報告済み”
 var asp = SpreadsheetApp.getActiveSpreadsheet();
 var ash = asp.getActiveSheet();
 var data = ash.getDataRange().getValues();
 var datefmt = "m/d"; 
 var mes = "<body>";
 var result = 0;
 var ArrayCnt = 0;
 var subject = "PDF添付メール";
 var fullArray = [];
 var humanArray = [];
 var moneyArray = [];
 var responseArray = [];
 var because = [];
 var shop = Browser.inputBox("営業所コードを入力", Browser.Buttons.OK_CANCEL);
 if(shop == "cancel"){
  return;
 }
 var resultAns = Browser.msgBox("PDF添付メールを自分宛に送りますか？",Browser.Buttons.OK_CANCEL)
 var len =data.length-1
 var arr = [];  
  for (var i = 1 ;i<=len;i++){
   var flag = data[i][15];//フラグ行
   var shopdata = data[i][1];
   if (flag == ""){
    continue;
   }
    //B列→R列　3行→6行　３行目に下記　５行目E列に会社名　５行目H列に現場名
    //超過→担当者→会社コード→現場コード→締日→滞留金額→回収予定→理由→起因
    if (flag > 0 && shop == shopdata){
     mes += "部門コード:" + data[i][1] + "<br>";
     mes += "営業担当:" + data[i][6] + "<br>";
     mes += '得意先:'+ data[i][2] + "<br>";
     mes += '現場:'+ data[i][4] + "<br>";
     mes += '金額:'+ data[i][9] + "円<br>";
     result += data[i][9];
     mes += '理由:' + data[i][12] + "<br>";
     mes += '起因:' + data[i][13] + "<br>";
     mes += "<br>";
     data[i][14] = "一覧表作成済み";
     if(data[i][11] != ""){
     var mydate = new Date(data[i][11]); 
     data[i][11] =  Utilities.formatDate(mydate,'JST', 'MM/dd');
     }
     if(data[i][10] != ""){
     var mydate = new Date(data[i][10]);
     data[i][10] = Utilities.formatDate(mydate, 'JST','MM/dd');
     }
      fullArray[ArrayCnt] = new Array;
      fullArray[ArrayCnt].push(data[i][13]);//0
      because.push(data[i][13]);
      fullArray[ArrayCnt].push(data[i][15]);//1
      responseArray.push(data[i][15]);
      fullArray[ArrayCnt].push(data[i][6]);//2
      humanArray.push(data[i][6]);
      fullArray[ArrayCnt].push(data[i][9]);//3
      moneyArray.push(data[i][9]);
      arr.push(data[i][15]);//超過
      arr.push(data[i][6]);//担当
      arr.push(data[i][3]);//得意先コード + "-" + data[i][16]
      arr.push(data[i][2]);//得意先名
      arr.push(data[i][5]);//現場コード
      arr.push(data[i][4]);//現場名
      arr.push(data[i][7]);//計上日
      arr.push(data[i][10]);//回収予定日
      arr.push(data[i][9]);//金額
      arr.push(data[i][11]);//入金予定日
      arr.push(data[i][12]);//理由
      arr.push(data[i][13]);//起因
      ArrayCnt++
    }//if  
  }//i
if ( mes == "<body>"){
return;
}
if ( mes !=""){
mes += "滞留合計" + result + "円<br>"
//mes += "\n以上滞留報告致します\n"
}
 var tospobj = owcreate1(arr,shop);
 ash.getDataRange().setValues(data);
 if(tospobj.getNumSheets() != 1){
  AddFormula(tospobj,moneyCount(fullArray,responseArray,1,3),"response",2);
  AddFormula(tospobj,moneyCount(fullArray,humanArray,2,3),"human",2);
  AddFormula(tospobj,moneyCount(fullArray,because,0,3),"because",2);
  AddFormula(tospobj,arry(overrapless(humanArray)),"Any",1);
 }
 var lastrow = ash.getLastRow();
  for ( i = 2; i<=lastrow ;i++){
    var formula ="=tairyu(K"+i+",'集計表'!D1,L"+i+")";
    ash.getRange(i,16).setFormula(formula);
    ash.getRange(i,1).setNumberFormat(datefmt);
  }
 var url = tospobj.getUrl();
 var blob = tospobj.getBlob().getAs('application/pdf');
 var tospname = tospobj.getName();
 var html = mes + '<br><a href = '+url+'>'+ tospname +'</a><br></body>';
 var options = {htmlBody:html};
 options.attachments = blob.setName(tospname + ".pdf");
 if (resultAns == "ok"){
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), subject, mes, options);
 }
}