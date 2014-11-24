/* global $:false */
/* global document:false */
/* global alert:false */

$(document).ready(function(event) {
  $.ajax("http://ccmtprod08.canyonco.org/Election/ElectionResultDetails", {
    success: function(data) {
      if (!data.Error) {
        $.each(data.Results, function(index, row) {
          if (row.PartyName)
            alert(row.PartyName);
          else {
            $.each(row.Contests, function(ci, crow) {
              $('<input/>', {'value':JSON.stringify(crow), attr:{size: "170"}}).appendTo("#electionDetails");
            });
          }
        });
      } else {
        alert("Result Details Error: " + data.Error);
        $(".electionContainer").hide();
      }
    },
    error: function(err) {
      alert("Error: " + err.status + " " + err.statusText + " " + err.responseText);
      $(".electionContainer").hide();
    }
  });
  
});