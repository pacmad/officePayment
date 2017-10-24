function fileinsp(str) { //リスト検索 @pram str = filename
var list = DriveApp.getFilesByName(str).hasNext();
if (list == false){
return
}else{
list = DriveApp.getFilesByName(str).next();
}
  var listid = list.getId();
return listid;
}


function cmnozeropad(value) { //ゼロパディング value->num or str
var con = [];
con.push(value);//得意先コード処理
 if (con.length<7){
  value = (value).toString();
  value = ("0000000"+value).slice( -7 );
}
return value;
}


function sinozeropad(value) { //ゼロパディング value->num or str
var con = [];
con.push(value);//得意先コード処理
if (con.length<5){
  value = (value).toString();
  value = ("00000"+value).slice( -5 );
  }
return value;
}

function widzeropad(value) { //ゼロパディング value->num or str
var con = [];
con.push(value);//得意先コード処理
if (con.length<3){
  value = (value).toString();
  value = ("000"+value).slice( -3 );
  }
return value;
}

function strcov(str){//苗字だけ
str = str.split("　");
return str[0];
}

function strtrim(str){//株式と有限除去
str = str.replace("株式会社","");
str = str.replace("有限会社","");
str = str.trim();
return str;
}