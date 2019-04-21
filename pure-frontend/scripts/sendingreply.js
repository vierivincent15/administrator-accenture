$("#reply-button").on("click",function() {
  let replyText = $("#reply-text").val();
  if($("#email_identifier").hasClass("needEmail")){
    console.log("yay");
    sendEmail(replyText);
  }
  else{
    frontEndChanges(replyText);
    updateTalk(replyText);
  }

})

function frontEndChanges(replyText){
  $("#last-who").text("admin" + ": ");
  $("#last-what").text(replyText);
  $("#chatHistory").append("<p class='align-right'><span class='admin-msg'>" + replyText + "</span></p>");
  $("#reply-text").val(null);
}

function sendEmail(replyText){
  console.log("yay2");
  $.ajax({
                  url: "/getTicketDetailsView",
                  type: "get",
                  success: function (res) {
                    console.log("yay3");
                    let category = res["category"];
                    let subject = res["subject"];
                    let details = res["details"];
                    let full_name = res["full_name"];
                    let email = res["email"];
                    let email_content = "Dear " + full_name + ",\n\nThis is a reply response for your submitted ticket detailed:\n\nCategory: " + category + "\nSubject: " + subject + "\nDetails: " + details + "\n\n\nResponse:\n" + replyText + "\n\nWe reccomend you to signup to our ticketing system so we can server you better.\n\nBest Regards,\nACNAPI Team"
                    $.ajax({
                                    url: "/sendMail",
                                    type: "post",
                                    data: {"email": email, "email_content": email_content},
                                    success: function (res) {
                                    }
                            });
                  }
          });
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
