function ofconstruct() {
Browser.msgBox("工事中です！！");
  
}
function ddd(){
var enddate = new Date("2016/4/30");
var pivdate = new Date("2016/5/31");
var scdate = new Date("2016/6/30");
var val = tairyu(enddate,pivdate,scdate);
Logger.log(val);
}

function showReception(){
var linkname = "滞留受付"
var url = "https://docs.google.com/a/akt-g.jp/forms/d/1QWWifSGpwVxrYThrUAIXdcxAvEpbe9VmO0rqRERR1J8/viewform";
var html = HtmlService
     .createHtmlOutput('<a href = '+url+'>'+ linkname +'</a>')
     .setSandboxMode(HtmlService.SandboxMode.IFRAME)
     .setTitle('滞留受付')
     .setWidth(800)
     .setHeight(800);
SpreadsheetApp.getActiveSpreadsheet().show(html);
}

