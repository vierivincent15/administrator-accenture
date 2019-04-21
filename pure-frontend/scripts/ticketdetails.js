$("#history-button").click(function(){
  if($("#chatHistory").hasClass("isShowing")){
    $("#chatHistory").hide();
    $("#notif").text("Click here to show message log");
    $("#recent-msg").show();
    $("#chatHistory").removeClass("isShowing");
    $("#arrow-icon").removeClass("fa-chevron-up");
    $("#arrow-icon").addClass("fa-chevron-down");
  }
  else{
    $("#chatHistory").show();
    $("#notif").text("Click here to hide message log");
    $("#recent-msg").hide();
    $("#chatHistory").addClass("isShowing");
    $("#arrow-icon").removeClass("fa-chevron-down");
    $("#arrow-icon").addClass("fa-chevron-up");
  }
});

$("#ok-attending").on("click",function() {
  window.open("/attending", "_self");
});

$("#ok-resolved").on("click",function() {
  window.open("/resolved", "_self");
});


let ticketObjectId;

$("#resolve-button").on("click",function() {
  getTicketAdminObjectId();
  //window.open("/resolved", "_self");
});

$("#reply-button").on("click",function() {
  if($("#email_identifier").hasClass("needEmail")){
    getTicketAdminObjectId();
  }

})

function getTicketAdminObjectId(){
  $.ajax({
                url: "/getTicketAdminId",
                type: "get",
                success: function (res) {
                  ticketObjectId = res[0];
                  updateTicketInfo();

            }
          });
}

function updateTicketInfo(){
  let update = {"status": "resolved", "turn": "user"};
  $.ajax({
                url: "/updateTicketInfo",
                type: "post",
                data: {"id": ticketObjectId, "update": update},
                success: function (res) {
                  console.log(res);
                  getUserAndAdminObjectIds();
              }
          });
}

function getUserAndAdminObjectIds(){
  $.ajax({
                url: "/getTicketDetails",
                type: "post",
                data: {"id": ticketObjectId},
                success: function (res) {
                  console.log(res);
                  getHistoryObjectId(res["adminId"]);
                  if(res["userId"] != ""){
                    getHistoryObjectId(res["userId"]);
                  }
              }
          });
}

function getHistoryObjectId(objectId){
  let historyObjectId;
  $.ajax({
                url: "/getHistoryObjectId",
                type: "post",
                data: {"id": objectId},
                success: function (res) {
                  console.log(res);
                  historyObjectId = res;
                  updateToAttended(historyObjectId);
              }
          });
}

function updateToAttended(historyObjectId){
    $.ajax({
                  url: "/getTicketDetails",
                  type: "post",
                  data: {"id": historyObjectId},
                  success: function (res) {
                    console.log(res);
                    let attendedArray = res["attended"];
                    if(attendedArray.length === 1){
                      attendedArray = [];
                    }
                    else{
                      attendedArray.splice(attendedArray.indexOf(ticketObjectId), 1);
                    }

                    let updateAttended = {"attended": attendedArray};
                    $.ajax({
                                  url: "/updateTicketInfo",
                                  type: "post",
                                  data: {"id": historyObjectId, "update": updateAttended, "type": "attended"},
                                  success: function (res) {
                                    console.log("history updated");
                                    updateToResolved(historyObjectId);
                                }
                            });
                }
            });
}

function updateToResolved(historyObjectId){
    $.ajax({
                  url: "/getTicketDetails",
                  type: "post",
                  data: {"id": historyObjectId},
                  success: function (res) {
                    console.log(res);
                    let resolvedArray = res["resolved"];
                    resolvedArray.push(ticketObjectId);

                    let updateResolved = {"resolved": resolvedArray};
                    $.ajax({
                                  url: "/updateTicketInfo",
                                  type: "post",
                                  data: {"id": historyObjectId, "update": updateResolved, "type": "resolved"},
                                  success: function (res) {
                                    console.log("history updated");
                                    if($("#email_identifier").hasClass("needEmail")){
                                      launchPage2();
                                    }
                                    else{
                                      launchPage();
                                    }
                                }
                            });
                }
            });
}

let counter = 0;
function launchPage(){
  if(counter != 1){
    counter++;
  }
  else{
    counter = 0
    window.alert("You've resolved this ticket!")
    window.open("/ticket_resolved", "_self");
  }
}

let counter2 = 0
function launchPage2(){
  if(counter2 != 0){
    counter2++;
  }
  else{
    counte2r = 0
    window.alert("You've resolved this ticket by email!")
    window.open("/ticket_resolved", "_self");
  }
}
