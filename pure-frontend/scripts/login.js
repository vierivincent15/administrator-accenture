$("#login-button").on("click",function() {
  let admin = $("#adminUsername").val();
  let pw = $("#adminPassword").val();
  adminLogin(admin, pw);
})

function adminLogin(admin, pw){
  $.ajax({
                url: "/loginadmin",
                type: "post",
                data: {"admin": admin, "password": pw},
                success: function (res) {
                if (res == "successful") {
                  window.open("/home", "_self");
                }
                if (res == "error") {
                  $("#adminUsername").val(null);
                  $("#adminPassword").val(null);
                  window.alert("Failed Login");
                }
            }
          });
}
