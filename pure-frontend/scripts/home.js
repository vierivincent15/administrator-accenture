// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// $("#refresh-button").on("click",function() {
//   console.log("button is pressed");
//   $.ajax({
//                 url: "/retrieveticketids",
//                 type: "get",
//                 success: function (res) {
//                   displayAvailable(res);
//             }
//           });
// });
//
// function displayAvailable(array){
//   for(i=0; i<array.length; i++){
//     $.ajax({
//                   url: "/getNameMessages",
//                   type: "post",
//                   data: {"id": array[i]},
//                   success: function (res) {
//                     let name = res[0];
//                     let messages = res[1];
//                     $("#root-home").append("<div class='w3-container w3-card w3-white w3-round w3-margin ticket-card'><br><span class='w3-right w3-margin-right w3-opacity'>pending</span><h4 class='w3-left'>" + name + "</h4><br><hr class='w3-clear'><p>" + messages + "</p><button type='button' class='w3-button w3-theme-d1 w3-margin-bottom'><i class='fa fa-wrench'></i>  Solve Issue</button></div>");
//               }
//             });
//   }
}
