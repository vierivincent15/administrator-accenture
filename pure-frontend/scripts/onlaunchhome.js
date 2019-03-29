$.ajax({
              url: "/retrieveadmin",
              type: "get",
              success: function (res) {
                let name = res;
                $(".toChange").text(name);
          }
        });

$.ajax({
              url: "/retrieveticketids",
              type: "get",
              success: function (res) {
                $("#ticket-number").text(res.length);
                displayAvailable_wRefresh(res);
          }
        });

function displayAvailable_wRefresh(array){
  for(i=0; i<array.length; i++){
    $.ajax({
                  url: "/getNameMessages",
                  type: "post",
                  data: {"id": array[i]},
                  success: function (res) {
                    let name = res[0];
                    let messages = res[1];
                    $("#root-home").append(html_component);
              }
            });
  }
}

function displayAvailable_wRefresh(array){
  for(i=0; i<array.length; i++){
    $.ajax({
                  url: "/getNameMessages",
                  type: "post",
                  data: {"id": array[i]},
                  success: function (res) {
                    let name = res[0];
                    let messages = res[1];
                    $("#root-home").append("<div class='w3-container w3-card w3-white w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>pending</span><h4 class='w3-left'>" + name + "</h4><br><hr class='w3-clear'><p>" + messages + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom'><i class='fa fa-wrench'></i>  Solve Issue</button></div>");
              }
            });
  }
}
