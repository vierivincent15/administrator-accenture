$.ajax({
              url: "/retrieveAdminDetails",
              type: "get",
              success: function (res) {
                let name = res["full_name"];
                $("#admin-name").text(name);
          }
        });

$.ajax({
                url: "/getTicketDetailsView",
                type: "get",
                success: function (res) {
                  $("#status").text(res["status"]);
                  $("#category").text(res["category"]);
                  $("#subject").text(res["subject"]);
                  $("#details").text(res["details"]);
                  $("#name").text(res["full_name"]);
                  $("#email").text(res["email"]);
                  $("#phone").text(res["phone"]);
                  $("#company").text(res["company"]);
                  let imageStringArray = res["photo_ref_"];
                  if(typeof imageStringArray === "undefined" || imageStringArray === []){
                  }
                  else{
                    appendImage(imageStringArray);
                  }
                  let talk_array = res["talk"];
                  if(typeof talk_array[talk_array.length-1] === "undefined"){
                    $("#last-who").text("N/A" + ": ");
                    $("#last-what").text("N/A");
                  }
                  else{
                    $("#last-who").text(talk_array[talk_array.length-1][0] + ": ");
                    $("#last-what").text(talk_array[talk_array.length-1][1]);
                  }

          }
        });

function appendImage(imageStringArray){
  for(i=0; i<imageStringArray.length; i++){
    $("#list-image").append("<img src='https://res.cloudinary.com/esc2019/image/upload/" + imageStringArray[i]+ "' class='ticket-image'>");
  }
}

$.ajax({
                url: "/getTicketDetailsView",
                type: "get",
                success: function (res) {
                  let talk_array = res["talk"];
                  for(i=0; i<talk_array.length; i++){
                    if(talk_array[i][0] === "admin"){
                      $("#chatHistory").append("<p class='align-right'><span class='admin-msg'>" + talk_array[i][1] + "</span></p>");
                    }
                    else{
                      $("#chatHistory").append("<p class='align-left'><span class='user-msg'>" + talk_array[i][1] + "</span></p>");
                    }
                  }
          }
        });
