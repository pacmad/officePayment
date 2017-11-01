//2016~2017sato-yoshitaka@akt-g.jp
/**
*滞留を返す関数です
*2016sato-yoshitaka@akt-g.jp
*WorkSheetFunction "A4" = tairyu("A1","A2","A3")
*@pram {Date} enddate　回収予定日
*@pram {Date} pivdate 軸になる日付
*@pram {Date} scdate 入金予定日
*@return{int} 滞留月数
*/
function tairyu(enddate,pivdate,scdate) {
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
  scdate = new Date(YY,pivdate.getMonth()+1,enddate.getDate());
 }
 if(pivdate.getMonth() == scdate.getMonth()){//集計表の日付＝入金予定日
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
