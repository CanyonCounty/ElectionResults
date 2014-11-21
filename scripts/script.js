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
  
  // More tk...
});