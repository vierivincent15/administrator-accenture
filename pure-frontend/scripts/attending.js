$.ajax({
              url: "/retrieveAdminDetails",
              type: "get",
              success: function (res) {
                let name = res["full_name"];
                let ticketHistoryId = res["ticket_history"];
                $(".accName").text(name);
                getAttendingTickets(ticketHistoryId);
          }
        });

let sortArray = [];

$("#category1").on("click",function() {
  if($("#category1").is(":checked") == true){
    sortArray.push("Smart Technology");
  }
  else{
    sortArray.splice(sortArray.indexOf("Smart Technology"), 1);
  }
});
$("#category2").on("click",function() {
  if($("#category2").is(":checked") == true){
    sortArray.push("Aesop");
  }
  else{
    sortArray.splice(sortArray.indexOf("Aesop"), 1);
  }
});
$("#category3").on("click",function() {
  if($("#category3").is(":checked") == true){
    sortArray.push("APIs");
  }
  else{
    sortArray.splice(sortArray.indexOf("APIs"), 1);
  }
});

$("#sort-button").on("click",function() {
  console.log("sort clicked");
  $.ajax({
                url: "/retrieveAdminDetails",
                type: "get",
                success: function (res) {
                  let ticketHistoryId = res["ticket_history"];
                  $.ajax({
                                url: "/getTicketHistory",
                                type: "post",
                                data: {"id": ticketHistoryId},
                                success: function (res) {
                                  let attending_array = res["attended"];
                                  categorySort(attending_array, sortArray);
                            }
                          });
            }
          });
});

$("#refresh-button").on("click",function() {
  console.log("refresh clicked");
  $.ajax({
                url: "/retrieveAdminDetails",
                type: "get",
                success: function (res) {
                  let ticketHistoryId = res["ticket_history"];
                  getAttendingTickets(ticketHistoryId);
            }
          });
});

function categorySort(array, sortArray){
  if(sortArray.length != 0){
    $(".ticket-card").remove();
    for(i=0; i<array.length; i++){
      $.ajax({
                    url: "/getTicketDetails",
                    type: "post",
                    data: {"id": array[i]},
                    success: function (res) {
                      let status = res["status"];
                      let category = res["category"];
                      let subject = res["subject"];
                      let details = res["details"];
                      let tixId = res["objectId"];
                      let userId = res["userId"];
                      let turn = res["turn"];
                      let usertype;
                      let visible;

                      if(userId === ""){
                        usertype = "w3-sand";
                      }
                      else{
                        usertype = "w3-white";
                      }

                      if(turn === "admin"){
                        visible = "w3-show";
                      }
                      else{
                        visible = "w3-hide";
                      }

                      if(sortArray.includes(category)){
                        $("#root-home").append("<div class='w3-container w3-card " + usertype + " w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>" + status + "</span><h3 class='cat-design'>" + category + "</h3><span class='w3-right w3-margin-right'><i class='fa fa-bell " + visible + "'></i></span><h5 class='w3-left'>" + subject + "</h5><br><hr class='w3-clear'><p>" + details + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom solve-this-button' onclick='processButtonClick()' id='" + tixId + "'><i class='fa fa-view'></i>  View</button></div>");
                      }
                }
              });
    }
  }
}

function getAttendingTickets(ticketHistoryId){
  $.ajax({
                url: "/getTicketHistory",
                type: "post",
                data: {"id": ticketHistoryId},
                success: function (res) {
                  let attending_array = res["attended"];
                  $("#ticket-number").text(attending_array.length);
                  displayAvailable(attending_array);
            }
          });
}

function displayAvailable(array){
  $(".ticket-card").remove();
  for(i=0; i<array.length; i++){
    $.ajax({
                  url: "/getTicketDetails",
                  type: "post",
                  data: {"id": array[i]},
                  success: function (res) {
                    let status = res["status"];
                    let category = res["category"];
                    let subject = res["subject"];
                    let details = res["details"];
                    let tixId = res["objectId"];
                    let userId = res["userId"];
                    let turn = res["turn"];
                    let usertype;
                    let visible;

                    if(userId === ""){
                      usertype = "w3-sand";
                    }
                    else{
                      usertype = "w3-white";
                    }

                    if(turn === "admin"){
                      visible = "w3-show";
                    }
                    else{
                      visible = "w3-hide";
                    }
                    $("#root-home").append("<div class='w3-container w3-card " + usertype + " w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>" + status + "</span><h3 class='cat-design'>" + category + "</h3><span class='w3-right w3-margin-right'><i class='fa fa-bell " + visible + "'></i></span><h5 class='w3-left'>" + subject + "</h5><br><hr class='w3-clear'><p>" + details + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom solve-this-button' onclick='processButtonClick()' id='" + tixId + "'><i class='fa fa-eye'></i>  View</button></div>");
              }
            });
  }
}


function processButtonClick(){
  console.log("pressed");
  let clickedTicketId = event.currentTarget.id;
  console.log(clickedTicketId);
  $.ajax({
                url: "/pushTicketId",
                type: "post",
                data: {"id": clickedTicketId},
                success: function (res) {
                  window.open("/ticket_details", "_self");
            }
          });
}
