function goMainsite(){
  window.open("https://beta.acnapi.io/#!/");
}

function mousedownPw(){
  let obj = document.getElementById("adminPassword");
  obj.type = "text";
}

function mouseupPw(){
  let obj = document.getElementById("adminPassword");
  obj.type = "password";
}

function mousedownVerf(){
  let obj = document.getElementById("adminVerf");
  obj.type = "text";
}

function mouseupVerf(){
  let obj = document.getElementById("adminVerf");
  obj.type = "password";
}
