// Used to toggle the menu on smaller screens when clicking on the menu button
// function openNav() {
//   var x = document.getElementById("navDemo");
//   if (x.className.indexOf("w3-show") == -1) {
//     x.className += " w3-show";
//   } else {
//     x.className = x.className.replace(" w3-show", "");
//   }
// }

$.ajax({
              url: "/retrieveAdminDetails",
              type: "get",
              success: function (res) {
                let name = res["full_name"];
                $(".accName").text(name);
          }
        });

$.ajax({
              url: "/retrieveTicketIds",
              type: "get",
              success: function (res) {
                $("#ticket-number").text(res.length);
                displayAvailable(res);
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
                url: "/retrieveTicketIds",
                type: "get",
                success: function (res) {
                  $("#ticket-number").text(res.length);
                  categorySort(res, sortArray);
            }
          });
});

$("#refresh-button").on("click",function() {
  console.log("refresh clicked");
  $.ajax({
                url: "/retrieveTicketIds",
                type: "get",
                success: function (res) {
                  $("#ticket-number").text(res.length);
                  displayAvailable(res);
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
                        $("#root-home").append("<div class='w3-container w3-card " + usertype + " w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>" + status + "</span><h3 class='cat-design'>" + category + "</h3><span class='w3-right w3-margin-right'><i class='fa fa-bell " + visible + "'></i></span><h5 class='w3-left'>" + subject + "</h5><br><hr class='w3-clear'><p>" + details + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom solve-this-button' onclick='processButtonClick()' id='" + tixId + "'><i class='fa fa-wrench'></i>  Solve Issue</button></div>");
                      }
                }
              });
    }
  }
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

                    $("#root-home").append("<div class='w3-container w3-card " + usertype + " w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>" + status + "</span><h3 class='cat-design'>" + category + "</h3><span class='w3-right w3-margin-right'><i class='fa fa-bell " + visible + "'></i></span><h5 class='w3-left'>" + subject + "</h5><br><hr class='w3-clear'><p>" + details + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom solve-this-button' onclick='processButtonClick()' id='" + tixId + "'><i class='fa fa-wrench'></i>  Solve Issue</button></div>");
              }
            });
  }
}


function processButtonClick(){
  let clickedTicketId = event.currentTarget.id;
  $.ajax({
                url: "/pushTicketId",
                type: "post",
                data: {"id": clickedTicketId},
                success: function (res) {
                  window.open("/ticket_choose", "_self");
            }
          });
}
