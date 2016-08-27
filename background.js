var NUM_ASSIGNMENTS_ADDED = 0;
var CALCULATOR_TYPE = "Add Assignment"; //"Add Assignment" Table and "Finals Grade Calculator" is the Finals Grade Calculator
var NEW_CATEGORIES = 0;
var ZERO_TABLE_EXISTS = false;
var CATEGORY_TABLE_EXISTS = true;

$("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">');
//$("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(2) > td:nth-child(2)").html("10%");
var user = new User();

try {
  //Initializing FB Widget
  window.fbAsyncInit = function() {
    FB.init({
      appId: '1155738174469383',
      xfbml: true,
      version: 'v2.7'
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var enableHTML = "";

  if (localStorage.enabledLoop == "true") {

    enableHTML = '<div id="enableEasyLoop" class="checkbox"><label><input type="checkbox" checked>Disable Easy Loop</label></div>';

    startProgram();

  } else {
    if (localStorage.refreshed == "true") {
      enableHTML = '<div id="enableEasyLoop" class="checkbox"><label><input type="checkbox"> Enable Easy Loop</label></div>';
    } else {
      localStorage.setItem("enabledLoop", "true");
      enableHTML = '<div id="enableEasyLoop" class="checkbox"><label><input type="checkbox" checked> Disable Easy Loop</label></div>';
      startProgram();
    }

  }

  var nth_child = 7;

  if (localStorage.enabledLoop == "true") {
    nth_child = 7;
  } else {
    nth_child = 4;
  }

  $("#container_content > div.content_margin > table:nth-child(" + nth_child + ") > tbody > tr:nth-child(2) > td:nth-child(2)").html(enableHTML);


  $("#enableEasyLoop").change(function() {
    var enabled = localStorage.enabledLoop;
    if (enabled == "false") {
      localStorage.setItem("enabledLoop", "true");
    } else {
      localStorage.setItem("enabledLoop", "false");
    }
    localStorage.setItem("refreshed", "true");
    location.reload();
  });

} catch (err) {
  localStorage.setItem("enabledLoop", "false");
  alert("Not able to receive grades at this time. Please try again later or contact developer at sguduguntla11@gmail.com.");
  $(".content_spacing_sm").html("");
  throw err;
}

function startProgram() {


  $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1)").append('<span class="list_text"><img src="https://cdn.schoolloop.com/1607081711/img/spacer.gif" width="10" height="13" alt="">Current Date: </span><span class="off">' + getDateToday() + ' ' + getCurrentTime() + '</span>');
  //$("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1)").append('<span class="list_text"><img src="https://cdn.schoolloop.com/1607081711/img/spacer.gif" width="10" height="13" alt=""><button class="btn btn-default">Sort</button></span>');

  checkForZeroTable();

  checkForCategoryTable();

  addAssignmentTableContent(); //Adds the "Add Assignment" Table UI to the top

  addAssignmentDeleteButtons(); //Adds the delete column with buttons to all assignments

  hideOrShowGrades(); //Adds the ability to hide grades in the hub_general

  var categories = init(); //Array of all category objects i.e. [{name: Assignment, weight: 30, score: 97.76}, {name: Tests, weight: 40, score: 98.87}]

  if (CATEGORY_TABLE_EXISTS) {

    updateCategoryOptions(); //Updates the categories dropdown with new categories

    changeCategoriesUI(); //Changes the categories box to a Boostrap striped table and adds buttons and errors UI

    addCategoryDeleteColumn(); //Adds the delete column with buttons to new categories

    addSortDropdown();

  }

  $("<br/><br/><blockquote style='font-size: 1em; margin-bottom: -40px;'><div>Like <a style='color: #23527C;' target='_blank' href='http://www.sriharshaguduguntla.com/easyloop/'>Easy Loop</a> on <a style='color: #23527C;' target='_blank' href='https://facebook.com/schoolloopeasyloop'>Facebook</a>!</div><iframe src='https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fschoolloopeasyloop%2F&width=300&layout=standard&action=like&size=small&show_faces=false&share=true&height=40&appId=1155738174469383' width='450' height='20' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe></blockquote>").insertAfter("#container_content > div.content_margin > h2"); //FB Like button

  if (ZERO_TABLE_EXISTS) {
    showOrHideZeroTable();
  }

}

function addSortDropdown() {
  var sortHTML = '<select class="form-control" id="sortBy">';
  sortHTML += '<option value="Sort by...">Sort By...</option>';
  sortHTML += '<option value="Sort by Category">Sort by Category</option>';
  sortHTML += '<option value="Sort by Percent (ascending)">Sort by Percent (ascending)</option>';
  sortHTML += '<option value="Sort by Percent (descending)">Sort by Percent (descending)</option>';
  sortHTML += '</select>';

  $(".hub_general > thead > tr > th.sort_by").html(sortHTML);
}

$("#sortBy").change(function(e) {
  var selectedMode = $(this).val();

  if (selectedMode == "Sort by Category") {
    sortByCategory();
  } else if (selectedMode == "Sort by Percent (ascending)") {
    sortByPercent("ascending");
  } else if (selectedMode == "Sort by Percent (descending)") {
    sortByPercent("descending");
  } else if (selectedMode == "Sort by...") {
    location.reload();
  }
});

function sortByPercent(type) {
  var numRows = $('.hub_general tr').length; //Get number of rows

  var allPercents = [];

  for (var l = 1; l < numRows; l++) {

    //Assignment Total
    var percent = $(".hub_general > tbody > tr:nth-child(" + l + ") > td:nth-child(5)");

    var percentage = percent.text().replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();

    var equalIndex = percentage.indexOf("=");

    if (equalIndex != -1) {
      percentage = percentage.substring(equalIndex + 1, percentage.length - 1);

      if (!isNaN(percentage) && percentage != "") {
        allPercents.push(parseFloat(percentage));
      } else {

      }
    }

  }

  if (type == "ascending") {
    allPercents.sort(function(a, b) {
      return a - b
    });
  } else if (type == "descending") {
    allPercents.sort(function(a, b) {
      return b - a
    });
  }

  var htmlArray = [];

  for (var i = 0; i < allPercents.length; i++) {
    for (var j = 1; j < numRows; j++) {

      var percent = $(".hub_general > tbody > tr:nth-child(" + j + ") > td:nth-child(5)");

      var percentage = percent.text().replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();

      var equalIndex = percentage.indexOf("=");

      if (equalIndex != -1) {
        percentage = percentage.substring(equalIndex + 1, percentage.length - 1);
        if (allPercents[i] == parseFloat(percentage)) {
          htmlArray.push(percent.parent().html());
          break;
        }
      }
    }
  }

  console.log(htmlArray);

  $('.hub_general > tbody').html("");

  for (var k = 0; k < htmlArray.length; k++) {
    if (k % 2 == 0) {
      $('.hub_general > tbody').append("<tr class='highlight'>" + htmlArray[k] + "</tr>");
    } else {
      $('.hub_general > tbody').append("<tr>" + htmlArray[k] + "</tr>");
    }
  }

  $("#errorAlert").fadeIn();
  $("#errorAlert").removeClass();
  $("#errorAlert").addClass("alert alert-success");
  $("#error").html("Grades have been sorted by percentage (" + type + ")");

}


function sortByCategory() {
  var categories = user.getAllCategories();

  var numRows = $('.hub_general tr').length; //Get number of rows

  var categorySections = [];

  for (var t = 0; t < categories.length; t++) {
    var sectionObject = {};

    sectionObject.name = categories[t].name;
    sectionObject.htmlArray = [];

    categorySections.push(sectionObject);

    for (var l = 1; l < numRows; l++) {
      var category = $(".hub_general > tbody > tr:nth-child(" + l + ") > td:nth-child(2) > div");
      var categoryName = category.html().trim();

      var count = 0;

      var brIndex = categoryName.indexOf("<br>");

      if (brIndex != -1) {
        categoryName = categoryName.substring(0, brIndex).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
      }

      if (categoryName == sectionObject.name) {
        sectionObject.htmlArray.push(category.parent().parent().html().trim());
      } else {
        if (count > categories.length) {
          $("#errorAlert").fadeIn();
          $("#errorAlert").removeClass("alert-success");
          $("#errorAlert").addClass("alert-danger");
          $("#error").html("An error occurred. Please try again later.");
        }
      }
    }
  }

  $('.hub_general > tbody').html("");

  for (var i = 0; i < categorySections.length; i++) {
    for (var j = 0; j < categorySections[i].htmlArray.length; j++) {
      if (j % 2 == 0) {
        $('.hub_general > tbody').append("<tr class='highlight'>" + categorySections[i].htmlArray[j] + "</tr>");
      } else {
        $('.hub_general > tbody').append("<tr>" + categorySections[i].htmlArray[j] + "</tr>");
      }
    }
  }

  $("#errorAlert").fadeIn();
  $("#errorAlert").removeClass();
  $("#errorAlert").addClass("alert alert-success");
  $("#error").html("Grades have been sorted by category.");
}

function showOrHideZeroTable() {
  $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero > div > div.detail_sub.round.shadow").append("<span><a style='cursor: pointer;font-size: 0.8em;float: right;' id='hideZeroes'>hide</a></span>"); //Adds hide button to zero box
  $("#hideZeroes").click(function(e) {
    e.preventDefault();
    $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero > div").css("visibility", "hidden");
    $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero").prepend("<a style='cursor: pointer;font-size: 1em;float: right;' id='showZeroes'>show</a>");
    $("#showZeroes").click(function(e) {
      $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero > div").css("visibility", "visible");
      $(this).remove();
    });
  });
}

function checkForCategoryTable() {
  var nth_child = 3;

  if (ZERO_TABLE_EXISTS) {
    nth_child = 5;
  } else {
    nth_child = 3;
  }

  var categoryTable = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > h2").html().toLowerCase();

  if (categoryTable == "scores per category") {
    //If category box does exist
    CATEGORY_TABLE_EXISTS = true;
  } else {
    //If category box doesn't exist
    CATEGORY_TABLE_EXISTS = false;
  }

}

function checkForZeroTable() {
  var zeroTable = $(".detail_highlight_zero").html();

  if (zeroTable) {
    //If zero box does exist
    ZERO_TABLE_EXISTS = true;
  } else {
    //If zero box doesn't exist
    ZERO_TABLE_EXISTS = false;
  }

}

function init() {

  if (CATEGORY_TABLE_EXISTS) {

    var categoryNodeList = $(".list_label_grey");

    //Getting category names

    for (var i = 0; i < categoryNodeList.length; i++) {

      var categoryObject = {};

      categoryObject.name = categoryNodeList[i].textContent;

      var nth_child = 3;

      if (ZERO_TABLE_EXISTS) {
        nth_child = 5;
      } else {
        nth_child = 3;
      }

      //Score per Category Box
      try {
        //Get weightage
        var weightPercent = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content > table > tbody > tr:nth-child(" + (i + 2) + ") > td:nth-child(2)").html();
        weightPercent = parseInt(weightPercent.substring(0, weightPercent.length - 1)); //emit the % sign
        console.log("Weight Percent: " + weightPercent);
        categoryObject.weight = weightPercent;

        //Get score

        var scorePercent = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content > table > tbody > tr:nth-child(" + (i + 2) + ") > td:nth-child(3)").html();

        scorePercent = parseFloat(scorePercent.substring(0, scorePercent.length - 1)); //emit the % sign

        console.log("Score Percent: " + scorePercent);

        categoryObject.score = scorePercent;

        categoryObject.received = 0;
        categoryObject.total = 0;

        user.insertCategory(categoryObject);

      } catch (err) {
        alert("Not able to receive categories at this time. Please try again later.");
        throw err;
      }

    }

  } else {
    var categoryObject = {};
    categoryObject.name = "No Categories";

    user.insertCategory(categoryObject);
  }

  console.log(user.getAllCategories());

  return user.getAllCategories(); //Array of all category objects i.e. [{name: Assignment, weight: 30, score: 97.76}, {name: Tests, weight: 40, score: 98.87}]

}

function updateCategoryOptions() {
  var categories = user.getAllCategories();
  $("#categoryDropdown").html("");
  for (var i = 0; i < categories.length; i++) {
    var categoryName = categories[i].name;
    $("#categoryDropdown").append('<option value="' + categoryName + '">' + categoryName + '</option>');
  }
}

function addAssignmentTableContent() {
  var content = '<select style="margin-bottom: 10px" class="form-control" id="changeCalculator">';
  if (CALCULATOR_TYPE == "Add Assignment") {
    //Regular Grade Calculator
    content += '<option value="Add Assignment">Add Assignment</option>';
    content += '<option value="Finals Grade Calculator">Finals Grade Calculator</option>';
    content += '</select>';
    content += '<div id="insertedContent" ng-app = ""><table id = "addTable" class="table table-hover">';
    content += '<thead>';
    content += '<tr>';
    if (CATEGORY_TABLE_EXISTS) {
      content += '<th>Category</th>';
    }
    content += '<th>Assignment</th>';
    content += '<th>Grade</th>';
    content += '<th style="text-align: center;">Add</th>';
    content += '</tr>';
    content += '</thead>';
    content += '<tbody>';
    content += '<tr id="setAlert">';
    if (CATEGORY_TABLE_EXISTS) {
      content += '<td>';
      content += '<select class="form-control" id="categoryDropdown">';
      content += '</select>';
      content += ' </td>';
    }
    content += '<td>';
    content += '<input placeholder="Assignment Name" class="form-control" type="text" id="fieldName">';
    content += ' </td>';
    content += ' <td>';
    content += '<form class="form-inline">';
    content += '<div class="form-group">';
    content += '<input ng-model="first" type="number" class="form-control" style="width:80px;" id="gNum"/> / <input type="number" ng-model="second" class="form-control" style="width:80px;" id="gDen"/>';
    content += '&nbsp;&nbsp;&nbsp; -> &nbsp;&nbsp;&nbsp;<span ng-bind="(first / second) * 100"></span> %';
    content += '</div>';
    content += '</div>';
    content += '</td>';
    content += '<td>';
    content += '<a style="color: black;" class="center-block btn btn-lg btn-default" id="add" href="#"><span style="font-size: 0.8em;" class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>';
    content += ' </td>';
    content += '</tr>';
    content += '</tbody>';
    content += '</table>';
  } else if (CALCULATOR_TYPE == "Finals Grade Calculator") {
    //Finals Grade Calculator
    content += '<option value="Finals Grade Calculator">Finals Grade Calculator</option>';
    content += '<option value="Add Assignment">Add Assignment</option>';
    content += '</select>';
    content += '<div id="insertedContent" ng-app = ""><table id = "addTable" class="table table-hover">';
    content += '<thead>';
    content += '<tr>';
    content += '<th></th>';
    content += '<th>Desired Grade</th>';
    content += '<th>Final Worth</th>';
    content += '<th style="text-align: center;">Calculate</th>';
    content += '</tr>';
    content += '</thead>';
    content += '<tbody>';
    content += '<tr id="setAlert">';
    content += '<td>';
    content += '<p>Finals Grade Calculator</p>';
    content += ' </td>';
    content += '<td>';
    content += '<input placeholder="Desired Grade (i.e. 97)" maxlength="2" class="form-control" type="number" id="desiredGrade"/>';
    content += ' </td>';
    content += ' <td>';
    content += '<input type="number" placeholder="Final is worth... (i.e. 30)" maxlength="2" class="form-control" id="finalWorth"/>';
    content += '</td>';
    content += '<td>';
    content += '<a style="color: black; font-size: 1.2em;" class="center-block btn btn-default" id="calculateFinals" href="#">=</a>';
    content += ' </td>';
    content += '</tr>';
    content += '</tbody>';
    content += '</table>';
  }

  $(".content_spacing_sm").html("");
  $(".content_spacing_sm").prepend(content);
  var alertContent = '<div id="errorAlert" class="alert alert-danger">';
  alertContent += '<button onclick="$(\'#setAlert\').removeClass(); $(\'#errorAlert\').fadeOut();" type="button" class="close" aria-label="Close">';
  alertContent += '<span aria-hidden="true">&times;</span>';
  alertContent += '</button>';
  alertContent += '<span id="error"></span>';
  alertContent += '</div>';
  $(".content_spacing_sm").prepend(alertContent);
  $("#errorAlert").css("display", "none");
  $(".content_spacing_sm").css("height", "auto");
  $(".content_spacing_sm").css("margin-top", "10px");

}

//Calculate Finals Grade
$(".content_spacing_sm").on('click', '#calculateFinals', function(e) {
  try {
    var desiredGrade = parseFloat($("#desiredGrade").val());

    var finalWorth = parseFloat($("#finalWorth").val());
    var receivedGradeString = $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").html();
    var receivedGrade = parseFloat(receivedGradeString.substring(0, receivedGradeString.length - 1));

    var gradeNeeded = ((100 * desiredGrade) - ((100 - finalWorth) * receivedGrade)) / finalWorth;

    $("#error").html("You need " + roundNumber(gradeNeeded, 2) + "% on your final to get an overall grade of " + desiredGrade + "%.");
    $("#errorAlert").removeClass("alert-danger");
    $("#errorAlert").addClass("alert-success");
    $("#errorAlert").fadeIn();
    $("#setAlert").removeClass();

  } catch (e) {
    $("#error").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>  Please fill all the fields.');
    $("#errorAlert").removeClass("alert-success");
    $("#errorAlert").addClass("alert-danger");
    $("#errorAlert").fadeIn();
    $("#setAlert").addClass("danger");
  }
});


$(".content_spacing_sm").on('change', '#changeCalculator', function() {
  var selectedMode = $("#changeCalculator").val();

  if (selectedMode == "Finals Grade Calculator") {
    CALCULATOR_TYPE = "Finals Grade Calculator";
    addAssignmentTableContent();
  } else if (selectedMode == "Add Assignment") {
    CALCULATOR_TYPE = "Add Assignment";
    addAssignmentTableContent();
    updateCategoryOptions();
  }

});

function changeCategoriesUI() {
  var nth_child1 = 3;
  var nth_child2 = 4;
  var nth_child3 = 6;
  var nth_child4 = 1;

  if (ZERO_TABLE_EXISTS) {
    nth_child1 = 5;
    nth_child2 = 6;
    nth_child3 = 8;
    nth_child4 = 3;
    //Zero Table
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div.detail_highlight_zero").css("margin-left", "40px");
  } else {
    nth_child1 = 3;
    nth_child2 = 4;
    nth_child3 = 6;
    nth_child4 = 1;
  }

  //Adding error area at the top of categories container

  var catAlertContent = '<div id="catAlert" class="alert alert-danger">';
  catAlertContent += '<button onclick="$(\'#catAlert\').fadeOut();" type="button" class="close" aria-label="Close">';
  catAlertContent += '<span aria-hidden="true">&times;</span>';
  catAlertContent += '</button>';
  catAlertContent += '<span id="catError"></span>';
  catAlertContent += '</div>';

  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child1 + ") > div.module_content").prepend(catAlertContent);
  $("#catAlert").css("display", "none");

  //Grade Trend Table
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child4 + ")").css("margin-left", "40px");

  //Categories Table
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child1 + ") > div.module_content > table").addClass("table table-striped table-hover");
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child1 + ")").css("margin-left", "40px");
  //Grade Scale Table
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child2 + ") > div > table").addClass("table table-hover table-striped");
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child2 + ")").css("margin-left", "40px");

  //Grade Legend Table
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child3 + ") > div > table").addClass("table table-hover table-striped");
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child3 + ")").css("margin-left", "40px");

  $(".info_content").prepend('<a style="color: black; height: 30px;" class="btn btn-default btn-sm" id="addCategory" href="#"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a><a style="color: black; height: 30px; margin-left: 10px" class="btn btn-default btn-sm" id="updateCategories" href="#">Update</a><br>');

  //Increasing the width of the Categories table by 100px
  var tableWidthStr = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child1 + ") > div.module_content > table").css("width");
  var parsedTableWidth = parseFloat(tableWidthStr.substring(0, tableWidthStr.length - 2));

  //Increasing width of categories container
  $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child1 + ")").css("width", (parsedTableWidth + 100) + "px");
}

$("#addCategory").click(function(e) {
  e.preventDefault();


  var categories = user.getAllCategories();

  if (NEW_CATEGORIES < 1) {
    var totalWeight = getTotalWeightOfCategories();

    NEW_CATEGORIES++;

    if (totalWeight < 100) {
      var categoryContent = '<tr class="animated rollIn newCategory">';
      categoryContent += '<td><a style="color: black; font-size: 1.3em;" class="center-block btn btn-default btn-sm deleteCatRow" href="#">&times;</a></td>';
      categoryContent += '<td class="list_label_grey categoryNameTd' + NEW_CATEGORIES + '" width="100%"><input type="text" style="height: 30px; width: 85%;" class="form-control newCategoryName' + NEW_CATEGORIES + '"/></td>';
      categoryContent += '<td class="list_text categoryWeightTd' + NEW_CATEGORIES + '" nowrap=""><input type="number" style="height: 30px; width: 95%;" class="form-control newCategoryWeight' + NEW_CATEGORIES + '"/>%</td>';
      categoryContent += '<td class="list_text categoryGrade" nowrap>100%</td>';
      categoryContent += '</tr>';

      var categoryTableBody = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody").html();

      if (categoryTableBody != undefined) {
        //If zero box doesn't exist
        $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody").append(categoryContent);
      } else {
        //If zero box doesn't exist
        $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody").append(categoryContent);
      }

    } else {
      $("#catAlert").fadeIn();
      $("#catError").html("All weightages add up to 100%. You may not add more categories.");

    }
    $(".deleteCatRow").click(function(e) {
      e.preventDefault();
      NEW_CATEGORIES--;
      var catName = $(this).parent().parent().children().eq(1).text();
      user.removeCategory(catName);
      console.log("New Categories: ");
      console.log(user.getAllCategories());
      updateCategoryOptions();
      if (catName != "") {
        deleteAllRowsWithDeletedCategory(catName);
      }
      $(this).parent().parent().fadeOut(100, function() {
        $(this).remove();
        calculateFinalGrade();
      });
    });
  } else {
    $("#catAlert").fadeIn();
    $("#catError").html("Please update categories before adding another category.");
  }

});

function deleteAllRowsWithDeletedCategory(catName) {
  var numRows = $('.hub_general tr').length;

  for (var i = 1; i < numRows; i++) {

    var category = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > div").html();

    category = category.substring(0, catName.length);

    if (category == catName) {
      $('#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > div').parent().parent().fadeOut();
    }
  }
}

$("#updateCategories").click(function(e) {
  e.preventDefault();

  $("#catAlert").fadeOut();

  var totalWeight = getTotalWeightOfCategories();

  var enteredWeight = parseFloat($(".newCategoryWeight" + NEW_CATEGORIES).val());

  totalWeight += enteredWeight;

  if (totalWeight <= 100) {
    var enteredName = $(".newCategoryName" + NEW_CATEGORIES).val();

    if (enteredName.trim() != "") {
      $(".categoryNameTd" + NEW_CATEGORIES).html(enteredName);
      $(".categoryNameTd" + NEW_CATEGORIES).removeClass("categoryNameTd" + NEW_CATEGORIES);
      $(".categoryWeightTd" + NEW_CATEGORIES).html(parseInt(enteredWeight) + "%");
      $(".newCategory").removeClass("rollIn");
      $(".newCategory").addClass("fadeIn");
      var categoryObject = {
        name: enteredName,
        weight: parseInt(enteredWeight),
        received: 0,
        total: 0,
        score: 100
      };
      user.insertCategory(categoryObject);
      updateCategoryOptions();
      NEW_CATEGORIES--;
    } else {
      $("#catAlert").fadeIn();
      $("#catError").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>  Please fill all fields.');
    }

  } else {
    $("#catAlert").fadeIn();
    $("#catError").html("All weightages must add up to no more than 100%.");
  }
});

$(".content_spacing_sm").on('click', '#add', function(e) {
  e.preventDefault();

  $("#errorAlert").css("display", "none");

  NUM_ASSIGNMENTS_ADDED++;

  var rowContent = "";

  if (NUM_ASSIGNMENTS_ADDED % 2 != 0) {
    rowContent += '<tr class="animated fadeIn">';
  } else {
    rowContent += '<tr class="highlight">';
  }

  rowContent += '<td>';
  rowContent += '<a style="color: black; font-size: 1.3em;" class="center-block btn btn-default btn-sm deleteRow" id="deleteRowNew" href="#">&times;</a>';
  rowContent += '</td>';
  rowContent += '<td>';
  rowContent += '<div class="float_l padding_r5" style="min-width: 105px;">';
  if (CATEGORY_TABLE_EXISTS) {
    rowContent += $("#categoryDropdown").val();
  } else {
    rowContent += "Assignment";
  }
  rowContent += ' <br>';

  if ($("#fieldName").val().trim() != "" && $("#gNum").val().toString().trim() != "" && $("#gDen").val().trim() != "") {
    $("#setAlert").removeClass();
    rowContent += ' <a href="/content/view?d=x&id=1439533299133&return_url=1450479219516" title="' + $("#fieldName").val() + '">' + $("#fieldName").val() + '</a>';
    rowContent += ' </div>';
    rowContent += '</td>';
    rowContent += ' <td style="width:100%;">';
    rowContent += ' </td>';
    rowContent += ' <td id="date">';
    rowContent += getDateToday();
    rowContent += ' <br>';
    rowContent += '</td>';
    rowContent += '<td nowrap>';
    rowContent += '<div>';
    rowContent += ' Score: ' + roundNumber($("#gNum").val(), 2);
    rowContent += '</div>';
    rowContent += roundNumber($("#gNum").val(), 2) + ' / ' + roundNumber($("#gDen").val(), 2) + ' = ' + roundNumber((($("#gNum").val() / $("#gDen").val()) * 100), 2) + '%';
    rowContent += '</td>';
    rowContent += '<td class="list_text">';
    rowContent += '<div style="width: 125px;">Generated by <strong>Easy Loop</strong></div>';
    rowContent += '</td>';
    $(".general_body").prepend(rowContent);
    calculateFinalGrade();
    $("#deleteRowNew").click(function(e) {
      e.preventDefault();
      $(this).parent().parent().fadeOut(500, function() {
        $(this).remove();
        calculateFinalGrade();
      });
    });
  } else {
    $("#errorAlert").fadeIn();
    $("#errorAlert").removeClass("alert-success");
    $("#errorAlert").addClass("alert-danger");
    $("#error").html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>  Please fill all the fields.');
    $("#setAlert").addClass("danger");
  }

});

$(".deleteRow").click(function(e) {
  e.preventDefault();
  $(this).parent().parent().fadeOut(100, function() {
    $(this).remove();
    calculateFinalGrade();
  });
});

function addAssignmentDeleteButtons() {

  var numRows = $('.hub_general tr').length;

  for (var i = 1; i < numRows; i++) {
    //Each Row
    $(".hub_general > tbody > tr:nth-child(" + i + ")").prepend('<td><a style="color: black; font-size: 1.3em;" class="center-block btn btn-default btn-sm deleteRow" href="#">&times;</a></td>');
    //$(".hub_general > tbody > tr:nth-child(" + i + ")").prepend('<td class="text-center" style="vertical-align: middle;">' + i + '</td>');
  }
}

function hideOrShowGrades() {
  var gradesHidden = false;

  $(".hub_general > thead > tr").prepend("<th nowrap><a style='cursor: pointer;' id='hideGrades'>hide all</a></th>");
//  $(".hub_general > thead > tr").prepend("<th nowrap><a style='cursor: pointer;'>#</a></th>");

  $("#hideGrades").click(function(e) {
    if (gradesHidden == false) {
      gradesHidden = true;
      $(".hub_general tr td ").css("visibility", "hidden");
      $("#hideGrades").html("show all");
    } else {
      gradesHidden = false;
      $(".hub_general tr td ").css("visibility", "visible");
      $("#hideGrades").html("hide all");
    }
  });
}


function addCategoryDeleteColumn() {
  var categoryTableTr = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr").html();
  var numRows = 0;

  if (!ZERO_TABLE_EXISTS) {
    //If zero box doesn't exist
    numRows = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr").length;
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(1)").prepend("<td class='list_label' nowrap></td>");

    for (var i = 2; i <= numRows; i++) {
      //Each Row
      $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + i + ")").prepend('<td></td>');
    }
  } else {
    //If zero box doesn't exist
    numRows = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table tr").length;
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(1)").prepend("<td class='list_label' nowrap></td>");

    for (var i = 2; i <= numRows; i++) {
      //Each Row
      $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(" + i + ")").prepend('<td></td>');
    }
  }

}

function calculateFinalGrade() {

  var categories = user.getAllCategories();

  var totalPoints = 0; //Overall number of points (Denominator)
  var totalReceivedPoints = 0; //Overall received points (Numerator)

  //Clear all previous values
  for (var i = 0; i < categories.length; i++) {

    categories[i].received = 0;

    categories[i].total = 0;

  }

  if (CATEGORY_TABLE_EXISTS) {

    //Reset weights

    var nth_child = 3;

    if (ZERO_TABLE_EXISTS) {
      nth_child = 5;
    } else {
      nth_child = 3;
    }

    for (var p = 0; p < categories.length; p++) {
      //Score per Category Box
      try {
        //Get weightage
        var weightPercent = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content > table > tbody > tr:nth-child(" + (p + 2) + ") > td:nth-child(3)").html();
        weightPercent = parseInt(weightPercent.substring(0, weightPercent.length - 1)); //emit the % sign
        categories[p].weight = weightPercent;

      } catch (err) {
        alert("Not able to receive weights at this time. Please try again later.");
        throw err;
      }
    }
  }

  var numRows = $('.hub_general tr').length; //Get number of rows

  for (var l = 1; l < numRows; l++) {

    //Assignment Total

    var assignmentTotal = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + l + ") > td:nth-child(5)").text().trim();

    var slashIndex = assignmentTotal.indexOf("/");

    var equalIndex = assignmentTotal.indexOf("=");

    if (slashIndex != -1 && equalIndex != -1) {

      assignmentTotal = assignmentTotal.substring(slashIndex + 1, equalIndex).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim(); //Gets rid of all invisible characters

      if (!isNaN(assignmentTotal) && assignmentTotal != "") { //Gets rid of all invisible characters
        totalPoints += parseFloat(assignmentTotal);
      } else {
        assignmentTotal = "0";
      }

    } else {
      assignmentTotal = "0";
    }

    //Received Total
    var receivedTotal = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + l + ") > td:nth-child(5) > div").text().toLowerCase().trim();

    var scoreIndex = receivedTotal.indexOf("score:");

    if (scoreIndex != -1) {

      receivedTotal = receivedTotal.substring(scoreIndex + 6, receivedTotal.length).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim(); //Gets rid of all invisible characters

      if (!isNaN(receivedTotal) && receivedTotal != "") {
        totalReceivedPoints += parseFloat(receivedTotal);
      } else {
        receivedTotal = "0";
      }

    } else {
      receivedTotal = "0";
    }

    if (CATEGORY_TABLE_EXISTS) {
      //Assignment Category

      var category = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + l + ") > td:nth-child(2) > div").html().trim();

      var count = 0;

      for (var t = 0; t < categories.length; t++) {

        count++;

        var brIndex = category.indexOf("<br>");

        if (brIndex != -1) {
          category = category.substring(0, brIndex).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
        }

        if (category == categories[t].name) {
          categories[t].received += parseFloat(receivedTotal);

          console.log(categories[t].name + ":" + receivedTotal + " / " + assignmentTotal);

          categories[t].total += parseFloat(assignmentTotal);

          $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (t + 1) + ") > td:nth-child(4)").attr("data-toggle", "tooltip");
          $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (t + 1) + ") > td:nth-child(4)").attr("title", categories[t].received + " / " + categories[t].total);

          categories[t].score = roundNumber(((categories[t].received / categories[t].total) * 100), 2);

        } else {
          if (count > categories.length) {
            $("#errorAlert").fadeIn();
            $("#errorAlert").removeClass("alert-success");
            $("#errorAlert").addClass("alert-danger");
            $("#error").html("An error occurred. Please try again later.");
          }
        }
      }
    }
  } //Big For Loop End

  var finalAnswer = 0;

  if (CATEGORY_TABLE_EXISTS) {

    setCorrectCategoryWeights();

    for (var r = 0; r < categories.length; r++) {
      //console.log(categories[r - 1].name + ": " + categories[r - 1].score);
      //console.log(categories[r - 1].name + ": " + categories[r - 1].weight);

      finalAnswer += categories[r].score * (categories[r].weight / 100);

      //Setting each category percentage
      var categoryScoreArea = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 2) + ") > td:nth-child(4)").html();

      if (categoryScoreArea != undefined) {
        $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 2) + ") > td:nth-child(4)").html("" + roundNumber(categories[r].score, 2) + "%");
        $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 2) + ") > td:nth-child(4)").addClass("animated bounceIn");
      } else {
        $('#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(' + (r + 2) + ') > td:nth-child(4)').html("" + roundNumber(categories[r].score, 2) + "%");
        $('#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(' + (r + 2) + ') > td:nth-child(4)').addClass("animated bounceIn");
      }

    }

  } else {
    //If Categories don't exist

    categories[0].received = totalReceivedPoints;
    categories[0].total = totalPoints;

    finalAnswer = roundNumber(((categories[0].received / categories[0].total) * 100), 2);

    categories[0].score = finalAnswer;

  }

  //Setting the final percentage
  $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").html(roundNumber(finalAnswer, 2) + "%");
  $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").addClass("animated bounceIn");

  //Setting the final letter grade
  var letter = getLetterGrade(finalAnswer);

  $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").html(letter);
  $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").addClass("animated bounceIn");

  console.log("Total: " + roundNumber(finalAnswer, 2));

  return roundNumber(finalAnswer, 2);

}

function getLetterGrade(total) {
  var letter = "A";

  if (total >= 97) {
    letter = "A+";
  } else if (total >= 93) {
    letter = "A";
  } else if (total >= 90) {
    letter = "A-";
  } else if (total >= 87) {
    letter = "B+";
  } else if (total >= 83) {
    letter = "B";
  } else if (total >= 80) {
    letter = "B-";
  } else if (total >= 77) {
    letter = "C+";
  } else if (total >= 73) {
    letter = "C";
  } else if (total >= 70) {
    letter = "C-";
  } else if (total >= 67) {
    letter = "D+";
  } else if (total >= 63) {
    letter = "D";
  } else if (total >= 60) {
    letter = "D-";
  } else if (total >= 0) {
    letter = "F";
  }

  return letter;
}

function setCorrectCategoryWeights() {
  var categories = user.getAllCategories();

  var totalWeight = getTotalWeightOfCategories();

  if (totalWeight != 100) {
    $("#errorAlert").fadeIn();
    $("#errorAlert").removeClass();
    $("#errorAlert").addClass("alert alert-warning");
    $("#error").html("<strong><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> Warning: </strong>Your category weights don't add up to 100%. Please add a category or consult your teacher.");
  }

  console.log("Everything weight: " + getTotalWeightOfCategories());

  for (var r = 0; r < categories.length; r++) {
    categories[r].weight = roundNumber(((categories[r].weight / totalWeight) * 100), 2);
    console.log("Category " + categories[r].name + ": " + categories[r].weight);
  }

}

function getTotalWeightOfCategories() {

  var totalWeight = 0;

  var categoryNodeList = $("td[class='list_label_grey']");

  for (var i = 0; i < categoryNodeList.length; i++) {

    var nth_child = 3;

    if (ZERO_TABLE_EXISTS) {
      nth_child = 5;
    } else {
      nth_child = 3;
    }

    //Score per Category Box
    try {
      //Get weightage
      var weightPercent = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content > table > tbody > tr:nth-child(" + (i + 2) + ") > td:nth-child(3)").html();
      weightPercent = parseInt(weightPercent.substring(0, weightPercent.length - 1)); //emit the % sign
      totalWeight += weightPercent;

    } catch (err) {
      alert("Not able to receive category weightages at this time. Please try again later.");
      throw err;
    }

  }

  return totalWeight;
}

function roundNumber(rnum, rlength) {
  var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
  return newnumber;
}

function getDateToday() {

  var d = new Date();

  var today = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear().toString().substring(2);

  return today;
}


function getCurrentTime() {

  var currentTime = new Date();
  var hour = currentTime.getHours();
  var min = currentTime.getMinutes();
  var sec = currentTime.getSeconds();
  var timeOfDay = "AM";

  if (hour >= 12) {
    timeOfDay = "PM";
  } else {
    timeOfDay = "AM";
  }

  if (hour > 12) {
    hour -= 12;
  }

  if (min <= 9) {
    return (hour + ":0" + min + " " + timeOfDay);
  }

  return (hour + ":" + min + " " + timeOfDay);

}
