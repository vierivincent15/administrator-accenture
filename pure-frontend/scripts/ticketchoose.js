let ticketObjectId;
let adminObjectId;

$("#back-button").on("click",function() {
  window.open("/home", "_self");
});

$("#solve-button").on("click",function() {
  getTicketAdminObjectId();
});

function getTicketAdminObjectId(){
  $.ajax({
                url: "/getTicketAdminId",
                type: "get",
                success: function (res) {
                  ticketObjectId = res[0];
                  adminObjectId = res[1];
                  getGlobalList();
            }
          });
}

function getGlobalList(){
  $.ajax({
                url: "/retrieveTicketIds",
                type: "get",
                success: function (res) {
                  let currentGlobal = res;
                  let ticketIndex = currentGlobal.indexOf(ticketObjectId);
                  if(ticketIndex != -1){
                    currentGlobal.splice(ticketIndex, 1);
                    let updatedGlobal = currentGlobal;
                    updateGlobalList(updatedGlobal);
                    updateTicketInfo();
                  }
                  else{
                    console.log("Ticket no longer in global list");
                  }
            }
          });
}

function updateGlobalList(updatedGlobal){
  $.ajax({
                url: "/updateGlobal",
                type: "post",
                data: {"new": updatedGlobal},
                success: function (res) {
                  console.log(res);
              }
          });
}

function updateTicketInfo(){
  let update = {"status": "attending", "adminId": adminObjectId};
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
                  getHistoryObjectIdUser(res["userId"]);
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

function getHistoryObjectIdUser(objectId){
  let historyObjectId;
  $.ajax({
                url: "/getHistoryObjectId",
                type: "post",
                data: {"id": objectId},
                success: function (res) {
                  console.log(res);
                  historyObjectId = res;
                  updateToPending(historyObjectId);

              }
          });
}

function updateToPending(historyObjectId){
    $.ajax({
                  url: "/getTicketDetails",
                  type: "post",
                  data: {"id": historyObjectId},
                  success: function (res) {
                    console.log(res);
                    let pendingArray = res["pending"];
                    if(pendingArray.length === 1){
                      pendingArray = [];
                    }
                    else{
                      pendingArray.splice(pendingArray.indexOf(ticketObjectId), 1);
                    }
                    console.log(pendingArray);

                    let updatePending = {"pending": pendingArray};
                    $.ajax({
                                  url: "/updateTicketInfo",
                                  type: "post",
                                  data: {"id": historyObjectId, "update": updatePending},
                                  success: function (res) {
                                    console.log("history updated");
                                    updateToAttended(historyObjectId);
                                }
                            });
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
                    attendedArray.push(ticketObjectId);

                    let updateAttended = {"attended": attendedArray};
                    $.ajax({
                                  url: "/updateTicketInfo",
                                  type: "post",
                                  data: {"id": historyObjectId, "update": updateAttended},
                                  success: function (res) {
                                    console.log("history updated");
                                    launchPage();
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
    window.alert("You're in charge of this ticket now!")
    window.open("/ticket_details", "_self");
  }
}
