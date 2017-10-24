//2016~2017sato-yoshitaka@akt-g.jp
function testArray(){
 var valuesdataArray = [[1,2,3,4,5,1,2,3,3,4],[1,2,3,4,5,1,2,3,3,4],[2,2,3,4,4,4,4,4,4,4]]
 var targetdataArray = [1,2,3,4,4,3,2,1,1,1]
 //var less = moneyCount(valuesdataArray,targetdataArray,1,2)
 var less = arry(targetdataArray);
Logger.log(less); 
 
}

function human(namedata){ //シート作成用重複カウント　param = arrey
 var cntarr = [];
 var humarr = overrapless(namedata);
 Logger.log(humarr.length);
 var flag = false;
  for (var i = 0 ;i<=humarr.length-1;i++){
   var cnt = 0;
   var nameI = humarr[i];
    for (var j = 0 ;j<=namedata.length-1;j++){
     var nameJ = namedata[j];
     if (nameI == nameJ) {
      cnt = cnt + 1;
     }
    }//j
   cntarr.push(nameI);
   cntarr.push(cnt);
  }//i
 return cntarr; //name,cnt
}//fuc

function overrapless(datarr){ //シート作成用重複削除 pram arrey
 var val = [];
  for (var i = 0 ;i <= datarr.length;i++){
   var data = datarr[i];
   var flag = true;
   if (i == 0){
    val.push(data);
    continue;
   }
    for (var j = 0 ;j<=val.length;j++){
     if (data == val[j]) {
      flag = false;
      break;  
     }
    }
   if (flag){
    val.push(data);
   }
  }
 return val;
}

function arry(arr){//２次元処理
 var hud2dim = [];
  for( var i = 0 ; i <= arr.length ; i++){
   hud2dim[i] = new Array;
   hud2dim[i].push(arr[i]);
  }
 return hud2dim;
}

function moneyCount(valuesdataArray,targetdataArray,valuesdatatargetColumn,valuesdatasumColumn){ 
 var namedata = overrapless(targetdataArray);
 var returnArray = [];
 var flag = false;
  for (var i = 0 ;i<=namedata.length-1;i++){
   var cnt = 0;
   var sum = 0;
   var nameI = namedata[i];
    for (var j = 0 ;j<=valuesdataArray.length-1;j++){
     var nameJ = valuesdataArray[j][valuesdatatargetColumn];
     var sumdata = valuesdataArray[j][valuesdatasumColumn]
     if (nameI == nameJ) {
      cnt = cnt + 1;
      sum = sum + sumdata 
     }
    }//j
   returnArray[i] = new Array;
  // returnArray[i].push(nameI);
   returnArray[i].push(cnt);
   returnArray[i].push(sum);
  }//i
 return returnArray; //[[name,cnt,sum]]
}//fuc



