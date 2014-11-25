/* global $:false */
/* global document:false */
/* global alert:false */

$(document).ready(function(event) {
  $.ajax("http://ccmtprod08.canyonco.org/Election/ElectionResultDetails", {
    success: function(data) {
      if (!data.Error) {
        //alert(data.Results.PartyName.length);
        drawResults(data);

        $(".tabs .tab-links a").on("click",function(e){
          var t=$(this).attr("href");
          $(t).fadeIn(400).siblings().hide();
          $(this).parent("li").addClass("active").siblings().removeClass("active");
          e.preventDefault();
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

var drawResults = function(data) {
  $.each(data.Results, function(index, row) {
    //$('<input/>', {'value':JSON.stringify(row), attr:{size: "775"}}).appendTo("#electionDetails");
    drawParty(row, index);
    drawContests(row);
  });
};

var drawParty = function(data, index) {
  if (data) {
    var cls="";
    if (index === 0) cls = "active";
    
    // tabs
    var link = $("<a>", {'href':"#" + partyLinkName(data.PartyName), 'text':partyTabName(data.PartyName)});
    $("<li>", {'html':link}).addClass(cls).appendTo("#party-tabs");    
    
    // content...
    $("<div>").attr('id',partyLinkName(data.PartyName)).addClass("tab " + cls).appendTo("#party-content");
  }
};

var drawContests = function(data) {
  var partyTab = "#" + partyLinkName(data.PartyName);
  $.each(data.Contests, function(index, row) {
    var h2 = $('<h2/>', {'text':row.Name, attr:{class: "contest"}});
    var div = $("<div>", {"html":h2}).attr('class', 'contest clearfix');
    drawChoices(row, div);
    div.appendTo(partyTab);
  });
};

var drawChoices = function(data, div) {
  $.each(data.Choices, function(index, row) {
    //if (!isNaN(parseInt(row.VoteCount))) {
    var name = row.Name;
    var voteCount = parseInt(row.VoteCount) || 0;
    var percentage = row.Percentage || 0.00;
    var col1 = $('<div/>', {'text':row.Name, attr:{class: "detail choice"}});
    var col2 = $('<div/>', {'text':voteCount.toLocaleString(), attr:{class: "detail votecount"}});
    var col3 = $('<div/>', {'text':percentage, attr:{class: "detail percentage"}});

    var sub = $("<div>", {attr:{'class': 'detail-row'}});
    col1.appendTo(sub);
    col2.appendTo(sub);
    col3.appendTo(sub);
    sub.appendTo(div);
    //}
  });
};

var capitalizeFirstLetter = function(word) {
  var first = word[0] || "";
  var rest = word.substring(1);
  
  return first.toUpperCase() + rest;
};

var partyTabName = function(word) {
  word = word.toLowerCase() || "results";
  return capitalizeFirstLetter(word.split(' ')[0]);
};

var partyLinkName = function(word) {
  word = word.toLowerCase() || "results"; 
  return word.substring(0,3);
};