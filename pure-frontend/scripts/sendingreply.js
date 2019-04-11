$("#reply-button").on("click",function() {
  let replyText = $("#reply-text").val();
  frontEndChanges(replyText);
  updateTalk(replyText);

})

function frontEndChanges(replyText){
  $("#last-who").text("admin" + ": ");
  $("#last-what").text(replyText);
  $("#chatHistory").append("<p class='align-right'><span class='admin-msg'>" + replyText + "</span></p>");
  $("#reply-text").val(null);
}

function updateTalk(replyText){
  getTicketAdminObjectId2(replyText);
}

function getTicketAdminObjectId2(replyText){
  $.ajax({
                url: "/getTicketAdminId",
                type: "get",
                success: function (res) {
                  let ticketObjectId = res[0];
                  appendToTalk2(ticketObjectId, replyText);

            }
          });
}

function appendToTalk2(ticketObjectId, replyText){
  $.ajax({
                url: "/getTicketDetails",
                type: "post",
                data: {"id": ticketObjectId},
                success: function (res) {
                  let talkArray = res["talk"];
                  talkArray.push(["admin", replyText]);
                  updateTicketInfo2(ticketObjectId, talkArray);
            }
          });
}

function updateTicketInfo2(ticketObjectId, talkArray){
  let update = {"turn": "user", "talk": talkArray};
  $.ajax({
                url: "/updateTicketInfo",
                type: "post",
                data: {"id": ticketObjectId, "update": update},
                success: function (res) {
                  console.log(res);
                  console.log("talkUpdated");
              }
          });
}
