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
                  let talk_array = res["talk"];
                  $("#last-who").text(talk_array[talk_array.length-1][0] + ": ");
                  $("#last-what").text(talk_array[talk_array.length-1][1]);
                  let imageStringArray = res["photo_ref_"];
                  if(typeof imageStringArray === "undefined" || imageStringArray === []){
                  }
                  else{
                    appendImage(imageStringArray);
                  }
          }
        });

function appendImage(imageStringArray){
  for(i=0; i<imageStringArray.length; i++){
    $("#list-image").append("<img src='https://res.cloudinary.com/esc2019/image/upload/" + imageStringArray[i]+ "' class='ticket-image'>");
  }
}
