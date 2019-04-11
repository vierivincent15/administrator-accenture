redirectingCheck();

function redirectingCheck(){
  $.ajax({
                url: "/getTicketAdminId",
                type: "get",
                success: function (res) {
                  adminObjectId = res[1];
                  if(adminObjectId === "undefined"){
                    window.open("/", "_self");
                  }
            }
          });
}
