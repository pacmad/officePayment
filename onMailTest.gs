function ofcmailTestFunction() { //col14 -> flag "報告" or ”報告済み”
  var asp = SpreadsheetApp.getActiveSpreadsheet();
  var ash = asp.getActiveSheet();
  var data = ash.getDataRange().getValues();
  var datefmt = "m/d"; 
  var result = 0;
  var subject = "滞留報告";
  var shop = Browser.inputBox("営業所コードを入力", Browser.Buttons.OK_CANCEL);
  if(shop == "cancel"){
    return;
  }
  var shopObj = new myshopdatabese(shop);//データシート呼び出し
  var recipient = shopObj.To;
  var len =data.length-1
  var arr = [];
  const htmlHeaderArray = ["部門コード","営業担当","得意先","現場","金額","理由","起因"];
  var htmlContentsArray = [];
  var index = 0;
  for (var i = 1 ;i<=len;i++){
    var flag = data[i][14];
    var shopdata = data[i][1];
    if (flag != "報告"){
      continue;
    }
    if (flag == "報告" && shop == shopdata){
      htmlContentsArray[index] = new Array;
      htmlContentsArray[index].push(data[i][1]);
      htmlContentsArray[index].push(data[i][6]);
      htmlContentsArray[index].push(data[i][2]);
      htmlContentsArray[index].push(data[i][4] + "円");
      htmlContentsArray[index].push(data[i][9]);
      htmlContentsArray[index].push(data[i][12]);
      htmlContentsArray[index].push(data[i][13]);
      result += data[i][9];
      index++;
      data[i][14] = "報告済み";
      if(data[i][11] != ""){
        var mydate = new Date(data[i][11]); 
        data[i][11] =  Utilities.formatDate(mydate,'JST', 'MM/dd');
      }
      if(data[i][10] != ""){
        var mydate = new Date(data[i][10]);
        data[i][10] = Utilities.formatDate(mydate, 'JST','MM/dd');
      }
      arr.push(data[i][15]);//超過
      arr.push(data[i][6]);//担当
      arr.push(data[i][3]);//得意先コード// + "-" + data[i][16]
      arr.push(data[i][2]);//得意先名
      arr.push(data[i][5]);//現場コード
      arr.push(data[i][4]);//現場名
      arr.push(data[i][10]);//回収予定日
      arr.push(data[i][9]);//金額
      arr.push(data[i][11]);//入金予定日
      arr.push(data[i][12]);//理由
      arr.push(data[i][13]);//起因
    }  
  }
  if ( index == 0){
    return;
  }
  var insertMsg = "";
    insertMsg += "滞留合計" + result + "円<br>"
    insertMsg += "<br>以上滞留報告致します<br>"
  ash.getDataRange().setValues(data);
  var html = createTable(htmlContentsArray,htmlHeaderArray,insertMsg);
  var lastrow = ash.getLastRow();
  for ( i = 2; i <= lastrow ; i++){
    var formula = "=tairyu(K"+i+",'集計表'!D1,L"+i+")";
    ash.getRange(i,16).setFormula(formula);
    ash.getRange(i,1).setNumberFormat(datefmt);
  }
  var options = {cc:shopObj.Cc,htmlBody:html,bcc:"sato-yoshitaka@akt-g.jp"};
  //var options = {htmlBody:html,bcc:"sato-yoshitaka@akt-g.jp"};
  GmailApp.sendEmail(recipient, subject, "",options);
  /*var url = tospobj.getUrl();
  var tospname = tospobj.getName();
  var html = '<a href = '+url+'>'+ tospname +'</a><br>';
  var options = {cc:Session.getActiveUser().getEmail(),htmlBody:html };
  GmailApp.sendEmail(recipient, subject, mes, options);
  */
}

function createTable(dataArray,headerArray,insertMsg){
  //dataArray =[['A','B','C'],['D','E','F'],['G','H','I']];
  //headerArray = ['ABC','DEF','GHI','JKL','MNO'];
  var css = HtmlService.createHtmlOutputFromFile('style').getContent();
  var formbody = "<!DOCTYPE html><html>";
  var csshead = "<head>";
  var cssfoot = "</head>";
  var insertBody = "<body>"
  var tableBodyHead = "<table class='type08'>"
  var tableBodyEnd = "</tbody></table></body></html>";  
  var tableHeaderHead ="<thead><tr>";
  var tableHeaderEnd = "</tr></thead>";  
  var tableBodyCenter = "<tbody>"

  headerArray.forEach(function(element) {
    tableHeaderHead += "<th scope='row'>" + element + "</th>" 
  }, this);
  dataArray.forEach(function(element,index) {
    tableBodyCenter += "<tr>";
    dataArray[index].forEach(function(element,index) {
      tableBodyCenter += "<td>" + element + "</td>";
    }, this);
    tableBodyCenter += "</tr>";
  }, this);
    formbody += csshead + css + cssfoot + insertBody + insertMsg + tableBodyHead + tableHeaderHead + tableHeaderEnd + tableBodyCenter + tableBodyEnd;
    var interFace = HtmlService.createHtmlOutput(formbody).getContent();
    return interFace
}
