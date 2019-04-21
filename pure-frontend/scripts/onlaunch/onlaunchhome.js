// $.ajax({
//               url: "/retrieveAdminDetails",
//               type: "get",
//               success: function (res) {
//                 let name = res["full_name"];
//                 $(".accName").text(name);
//           }
//         });
//
// $.ajax({
//               url: "/retrieveTicketIds",
//               type: "get",
//               success: function (res) {
//                 $("#ticket-number").text(res.length);
//                 displayAvailable(res);
//           }
//         });


// function displayAvailable(array){
//   console.log("he");
//   for(i=0; i<array.length; i++){
//     $.ajax({
//                   url: "/getTicketDetails",
//                   type: "post",
//                   data: {"id": array[i]},
//                   success: function (res) {
//                     let status = res["status"];
//                     let category = res["category"];
//                     let subject = res["subject"];
//                     let details = res["details"];
//                     let tixId = res["objectId"];
//                     let userId = res["userId"];
//                     let turn = res["turn"];
//
//                     if(userId === ""){
//                       let usertype = "w3-sand";
//                     }
//                     else{
//                       let usertype = "w3-white";
//                     }
//
//                     if(turn === "admin"){
//                       let visible = "w3-show";
//                     }
//                     else{
//                       let visible = "w3-hide";
//                     }
//
//                     $("#root-home").append("<div class='w3-container w3-card " + usertype + " w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>" + status + "</span><h3 class='cat-design'>" + category + "</h3><span class='w3-right w3-margin-right'><i class='fa fa-bell " + visible + "'></i></span><h5 class='w3-left'>" + subject + "</h5><br><hr class='w3-clear'><p>" + details + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom solve-this-button' onclick='processButtonClick()' id='" + tixId + "'><i class='fa fa-wrench'></i>  Solve Issue</button></div>");
//               }
//             });
//   }
// }
