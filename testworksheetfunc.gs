function testtairyu(enddate,pivdate,scdate) {//@pram = end(回収予定)@pram = piv(集計表の日付)@pram = sc(入金予定)
//滞留関数定義2016sato-yoshitaka@akt-g.jp
var result = 0;
var endmonth = pivdate.getMonth()+1;
var flag = false;
var pivboo = false;
var endboo = false;
var YY = pivdate.getFullYear();
var frYY = enddate.getFullYear();
var MM = pivdate.getMonth();
var frMM = enddate.getMonth();
switch(YY - frYY){
  case 0:
  break;
  case 1:
MM = MM + 12 ;
   break;
  case -1:
frMM = frMM + 12;
  break;

default:
  break;
  }
try{
scdate.getMonth();
}
catch (e) {
scdate = "";
}
if (scdate == ""){
scdate = new Date(frYY,frMM+2,enddate.getDate());
}
if(MM == scdate.getMonth()){//集計表の日付＝入金予定日
return "";
}
if(MM - frMM < 0){ //集計表　-　回収予定日
return "";
}
if(MM - frMM > 0){ 
result += MM-frMM;
}
var endday = new Date(enddate.getFullYear(),enddate.getMonth()+1,0);//月末日
var pivday = new Date(pivdate.getFullYear(),pivdate.getMonth()+1,0);//月末日
if(endday.getDate() == enddate.getDate()){
endboo = true;
}
if(pivday.getDate() == pivdate.getDate()){
pivboo = true;
}
if(endboo && pivboo){
result += 1
}
else if (MM - frMM >= 0 && pivdate.getDate() - enddate.getDate() >= 0){
flag = true;
result +=  1;
}
if(result == 0){
return "";
}else{
return result;
}
}


function comptairyu(enddate,pivdate,scdate) {//@pram = end(回収予定)@pram = piv(集計表の日付)@pram = sc(入金予定)
//滞留関数定義2016sato-yoshitaka@akt-g.jp
var result = 0;
var endmonth = pivdate.getMonth()+1;
var flag = false;
var pivboo = false;
var endboo = false;
try{
scdate.getMonth();
}
catch (e) {
scdate = "";
}
if (scdate == ""){
scdate = new Date(enddate.getFullYear(),enddate.getMonth()+2,enddate.getDate());
}
if(pivdate.getMonth() == scdate.getMonth()){//集計表の日付＝入金予定日
return "";
}
if(pivdate.getMonth() - enddate.getMonth() < 0){ //集計表　-　回収予定日
return "";
}
if(pivdate.getMonth() - enddate.getMonth() > 0){ 
result += pivdate.getMonth()-enddate.getMonth();
}
var endday = new Date(enddate.getFullYear(),enddate.getMonth()+1,0);//月末日
var pivday = new Date(pivdate.getFullYear(),pivdate.getMonth()+1,0);//月末日
if(endday.getDate() == enddate.getDate()){
endboo = true;
}
if(pivday.getDate() == pivdate.getDate()){
pivboo = true;
}
if(endboo && pivboo){
result += 1
}
else if (pivdate.getMonth() - enddate.getMonth() >= 0 && pivdate.getDate() - enddate.getDate() >= 0){
flag = true;
result +=  1;
}
if(result == 0){
return "";
}else{
return result;
}
}