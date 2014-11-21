/* global $:false */
/* global document:false */
/* global alert:false */

$(document).ready(function(event) {
  // Election Results - Summary
  $.ajax("http://ccmtprod08.canyonco.org/Election/ResultSummary", {
    success: function(data) {
      if (!data.Error) {
        $("#election").text(data.ElectionName + ' - ' + data.ElectionDate);
        $("#updated").text(data.LastUpdated);
        $("#voting").text(data.TotalVoters);
        $("#counted").text(data.BallotsCounted);
        $("#turnout").text(data.VoterTurnout);
        $("#complete").html('<span id="totalcounted">' + data.PrecinctsComplete.replace(' ', '</span> '));
      } else {
        alert("Result Summary Error: " + data.Error);
        $(".electionContainer").hide();
      }
    },
    error: function(err) {
      alert("Error: " + err.status + " " + err.statusText + " " + err.responseText);
      $(".electionContainer").hide();
    }
  });
  
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
  
  // More tk...
});