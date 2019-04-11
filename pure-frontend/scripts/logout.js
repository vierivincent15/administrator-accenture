function logmeout(){
  $.ajax({
                url: "/refreshAdminId",
                type: "get",
                success: function (res) {
                  window.open("/", "_self");
            }
          });
}
