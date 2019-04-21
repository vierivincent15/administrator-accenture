$("#login-button").on("click",function() {
  let admin = $("#adminUsername").val();
  let pw = $("#adminPassword").val();
  let verf =$("#adminVerf").val();
  let nonHuman = grecaptcha.getResponse().length == 0;
  checkInput(admin, pw, verf, nonHuman);
})

function checkInput(admin, pw, verf, nonHuman){
  if(admin == "" || pw == "" || verf == ""){
    window.alert("Kindly fill in all the fields.");
  }
  else if(nonHuman){
    document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
  }
  else{
    adminLogin(admin, pw, verf);
  }
}

function adminLogin(admin, pw, verf){
  $.ajax({
                url: "/loginAdmin",
                type: "post",
                data: {"admin": admin, "password": pw},
                success: function (res) {
                if (res == "error") {
                  $("#adminUsername").val(null);
                  $("#adminPassword").val(null);
                  $("#adminVerf").val(null);
                  window.alert("Failed Login");
                }
                else{
                  verifyUser(verf);
                }
            }
          });
}

function verifyUser(verfInput){
  $.ajax({
                url: "/retrieveAdminDetails",
                type: "get",
                success: function (res) {
                  let verfCode = res["verf"];
                  if(verfCode == verfInput){
                    window.open("/home", "_self");
                  }
                  else{
                    $("#adminUsername").val(null);
                    $("#adminPassword").val(null);
                    $("#adminVerf").val(null);
                    window.alert("Not Authorized to Login");
                  }
            }
          });
}
