$.ajax({
              url: "/retrieveadmindetails",
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
                  $("#category").text(res["category"]);
                  $("#subject").text(res["subject"]);
                  $("#details").text(res["details"]);
                  $("#name").text(res["full_name"]);
                  $("#email").text(res["email"]);
                  $("#phone").text(res["phone"]);
                  $("#company").text(res["company"]);
                  //$("#image").text(res.length);
          }
        });
