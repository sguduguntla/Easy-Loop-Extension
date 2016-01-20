var NUM_ASSIGNMENTS_ADDED = 0;
var CALCULATOR_TYPE = 0; //0 is the "Add Assignment" Table and 1 is the Finals Grade Calculator
var NEW_CATEGORIES = 0;

$("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">');
$("head").append('<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>');
$("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');

var categories = getAllCategoryObjects(); //Array of all category objects i.e. [{name: Assignment, weight: 30, score: 97.76}, {name: Tests, weight: 40, score: 98.87}]

console.log(categories);

addAssignmentTableContent(CALCULATOR_TYPE); //Adds the "Add Assignment" Table UI to the top

updateCategoryOptions(); //Updates the categories dropdown with new categories

changeCategoriesUI(); //Changes the categories box to a Boostrap striped table and adds buttons and errors UI

addAssignmentDeleteButtons(); //Adds the delete column with buttons to all assignments

addCategoryDeleteColumn(); //Adds the delete column with buttons to new categories

function getAllCategoryObjects() {
    var categoryArr = [];

    var categoryNodeList = document.querySelectorAll(".list_label_grey");

    var weightNodeList = document.querySelectorAll(".list_text");

    var categories = [];

    //Getting category names

    for (var i = 0; i < categoryNodeList.length; i++) {
        categoryArr[i] = categoryNodeList[i].textContent;

        categories.push({
            name: categoryArr[i],
            received: 0,
            total: 0
        });
    }

    //Getting Weightages of each category through their XPaths

    //*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[2]/div[3]/div[1]/table/tbody/tr[3]/td[2]

    for (var k = 2; k < categoryArr.length + 2; k++) {
        //Without Zeroes Box
        var headings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[2]/div[3]/div[1]/table/tbody/tr[' + k + ']/td[2]', document, null, XPathResult.ANY_TYPE, null);

        var thisHeading = headings.iterateNext();

        if (thisHeading) {

            var weightage = thisHeading.textContent;

            weightage = weightage.substring(0, weightage.length - 1);

            categories[k - 2].weight = parseFloat(weightage);

        } else {
            //With Zeroes Box
            headings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[2]/div[5]/div[1]/table/tbody/tr[' + k + ']/td[2]', document, null, XPathResult.ANY_TYPE, null);
            thisHeading = headings.iterateNext();

            if (thisHeading) {
                var weightage = thisHeading.textContent;

                weightage = weightage.substring(0, weightage.length - 1);

                categories[k - 2].weight = parseFloat(weightage);
            } else {
                //No matter what
                alert("An error occurred. Please try again later.");
            }

        }
    }

    //Getting the score of each category through their XPaths

    //*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[2]/div[3]/div[1]/table/tbody/tr[2]/td[3]

    for (var l = 2; l < categoryArr.length + 2; l++) {
        //If zeroes box doesn't exist
        var headings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[2]/div[3]/div[1]/table/tbody/tr[' + l + ']/td[3]', document, null, XPathResult.ANY_TYPE, null);

        var thisHeading = headings.iterateNext();

        if (thisHeading) {

            var scorePercent = thisHeading.textContent;

            scorePercent = scorePercent.substring(0, scorePercent.length - 1);

            categories[l - 2].score = parseFloat(scorePercent);

        } else {
            //If zeroes box exists
            headings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[2]/div[5]/div[1]/table/tbody/tr[' + l + ']/td[3]', document, null, XPathResult.ANY_TYPE, null);

            var thisHeading = headings.iterateNext();

            if (thisHeading) {

                var scorePercent = thisHeading.textContent;

                scorePercent = scorePercent.substring(0, scorePercent.length - 1);

                categories[l - 2].score = parseFloat(scorePercent);

            } else {
                alert("An error occurred. Please try again later.");
            }

        }
    }

    return categories; //Array of all category objects i.e. [{name: Assignment, weight: 30, score: 97.76}, {name: Tests, weight: 40, score: 98.87}]

}

function updateCategoryOptions() {
    $("#categoryDropdown").html("");
    for (var j = 0; j < categories.length; j++) {
        var categoryName = categories[j].name;
        $("#categoryDropdown").append('<option value="' + categoryName + '">' + categoryName + '</option>');
    }
}

function addAssignmentTableContent(calc_type) {
    var content = '<button style="margin-bottom: 10px" id="changeCalculator" class="btn btn-primary"></button><br/>';
    if (calc_type == 0) {
        content += '<div id="insertedContent" ng-app = ""><table id = "addTable" class="table table-bordered">';
        content += '<thead>';
        content += '<tr>';
        content += '<th>Category</th>';
        content += '<th>Assignment</th>';
        content += '<th>Grade</th>';
        content += '<th style="text-align: center;">Add</th>';
        content += '</tr>';
        content += '</thead>';
        content += '<tbody>';
        content += '<tr>';
        content += '<td>';
        content += '<select class="form-control" id="categoryDropdown">';
        content += '</select>';
        content += ' </td>';
        content += '<td>';
        content += '<input placeholder="Assignment Name" class="form-control" type="text" id="fieldName">';
        content += ' </td>';
        content += ' <td>';
        content += '<form class="form-inline">';
        content += '<div class="form-group">';
        content += '<input ng-model="first" type="number" class="form-control" style="width:80px;" id="gNum"/> / <input type="number" ng-model="second" class="form-control" style="width:80px;" id="gDen"/>';
        content += '<p ng-bind="(first / second) * 100"></p>%';
        content += '</div>';
        content += '</div>';
        content += '</td>';
        content += '<td>';
        content += '<a style="color: white; margin:0 auto; width: 100%;" class="btn btn-success" id="add" href="#"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>';
        content += ' </td>';
        content += '</tr>';
        content += '</tbody>';
        content += '</table>';
    } else {
        content += '<div id="insertedContent" ng-app = ""><table id = "addTable" class="table table-bordered">';
        content += '<thead>';
        content += '<tr>';
        content += '<th>Name</th>';
        content += '<th>Desired Grade</th>';
        content += '<th>Final Worth</th>';
        content += '<th style="text-align: center;">Calculate</th>';
        content += '</tr>';
        content += '</thead>';
        content += '<tbody>';
        content += '<tr>';
        content += '<td>';
        content += '<p>Finals Grade Calculator</p>';
        content += ' </td>';
        content += '<td>';
        content += '<input placeholder="Desired Grade (i.e. 97)" class="form-control" type="number" id="desiredGrade">';
        content += ' </td>';
        content += ' <td>';
        content += '<input type="number" placeholder="Final is worth... (i.e. 30)" class="form-control" id="finalWorth"/> %';
        content += '</td>';
        content += '<td>';
        content += '<a style="color: white; margin:0 auto; width: 100%;" class="btn btn-success" id="calculateFinals" href="#">Calculate</a>';
        content += ' </td>';
        content += '</tr>';
        content += '</tbody>';
        content += '</table>';
    }

    $(".content_spacing_sm").html("");
    $(".content_spacing_sm").prepend(content);
    $(".content_spacing_sm").prepend("<div id='error' class='alert alert-danger' style='color: black'></div>");
    $("#error").css("display", "none");
    $(".content_spacing_sm").css("height", "auto");
    $(".content_spacing_sm").css("margin-top", "10px");

    if (calc_type == 0) {
        $("#changeCalculator").html("Finals Grade Calculator");
    } else {
        $("#changeCalculator").html("Add Assignment");
    }

}

$(".content_spacing_sm").on('click', '#calculateFinals', function(e) {
    var desiredGrade = parseFloat($("#desiredGrade").val());

    var finalWorth = parseFloat($("#finalWorth").val());

    var receivedGradeString = $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").html();
    var receivedGrade = parseFloat(receivedGradeString.substring(0, receivedGradeString.length - 1));

    if (!isNaN(desiredGrade) && !isNaN(finalWorth) && !isNaN(receivedGrade)) {

        var gradeNeeded = ((100 * desiredGrade) - ((100 - finalWorth) * receivedGrade)) / finalWorth;

        $("#error").html("You need " + roundNumber(gradeNeeded, 2) + "% on your final to get an overall grade of " + desiredGrade + "%.");
        $("#error").removeClass("alert-danger");
        $("#error").addClass("alert-success");
        $("#error").css("display", "block");

    } else {
        $("#error").html("Please fill all fields.");
        $("#error").removeClass("alert-success");
        $("#error").addClass("alert-danger");
        $("#error").css("display", "block");
    }

});


$(".content_spacing_sm").on('click', '#changeCalculator', function(e) {
    e.preventDefault();

    if (CALCULATOR_TYPE == 0) {
        CALCULATOR_TYPE++;
        addAssignmentTableContent(CALCULATOR_TYPE);
    } else {
        CALCULATOR_TYPE--;
        addAssignmentTableContent(CALCULATOR_TYPE);
        updateCategoryOptions();
    }

});


function changeCategoriesUI() {

    var categoryTable = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table").html();

    var nth_child = 3;

    if (categoryTable != undefined) {
        //If zero box doesn't exist
        nth_child = 3;
    } else {
        //If zero box does exist
        nth_child = 5;
    }

    //Increasing width of categories container
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ")").css("width", "350px");

    //Adding error area at the top of categories container

    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content").prepend("<div id='catError' class='alert alert-danger' style='color: black'></div>");
    $("#catError").css("display", "none");

    //Add Category Button

    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content > table").addClass("table table-striped table-bordered");


    $(".info_content").prepend('<a style="color: white; height: 30px;" class="btn btn-primary btn-sm" id="addCategory" href="#"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a><a style="color: white; height: 30px; margin-left: 10px" class="btn btn-success btn-sm" id="updateCategories" href="#">Update</a><br>');

}

$("#addCategory").click(function(e) {
    e.preventDefault();
    var totalWeight = getTotalWeightOfCategories();

    NEW_CATEGORIES++;

    if (totalWeight < 100) {
        var categoryContent = '<tr class="animated rollIn newCategory">';
        categoryContent += '<td><a style="color: white; border-radius: 150px;" class="btn btn-danger btn-sm deleteCatRow" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>';
        categoryContent += '<td class="list_label_grey categoryNameTd' + NEW_CATEGORIES + '" width="100%"><input type="text" style="height: 30px; width: 85%;" class="form-control newCategoryName' + NEW_CATEGORIES + '"/></td>';
        categoryContent += '<td class="list_text categoryWeightTd' + NEW_CATEGORIES + '" nowrap=""><input type="number" style="height: 30px; width: 95%;" class="form-control newCategoryWeight' + NEW_CATEGORIES + '"/>%</td>';
        categoryContent += '<td class="list_text categoryGrade" nowrap>100%</td>';
        categoryContent += '</tr>';

        var categoryTableBody = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody").html();

        if (categoryTableBody != undefined) {
            //If zero box doesn't exist
            $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody").append(categoryContent);
        } else {
            //If zero box doesn't exist
            $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody").append(categoryContent);
        }

    } else {
        $("#catError").css("display", "block");
        $("#catError").html("All weightages add up to 100%. You may not add more categories.");
    }
    $(".deleteCatRow").click(function(e) {
        e.preventDefault();
        NEW_CATEGORIES--;
        var catName = $(this).parent().parent().children().eq(1).text();
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].name == catName) {
                categories.splice(i, 1);
            }
        }
        updateCategoryOptions();
        if (catName != "") {
            deleteAllRowsWithDeletedCategory(catName);
        }
        $(this).parent().parent().fadeOut(100, function() {
            $(this).remove();
            setCorrectCategoryWeights();
            calculateFinalGrade();
        });

    });
});

function deleteAllRowsWithDeletedCategory(catName) {
    var numRows = $('.hub_general tr').length;

    for (var i = 1; i < numRows; i++) {

        var categoryHeadings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[1]/table/tbody/tr[' + i + ']/td[2]/div', document, null, XPathResult.ANY_TYPE, null);

        var thisHeading = categoryHeadings.iterateNext();

        if (thisHeading) {
            var category = thisHeading.textContent;

            category = category.substring(0, catName.length);

            if (category == catName) {
                $('#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_left > table > tbody > tr:nth-child(' + i + ') > td:nth-child(2) > div').parent().parent().fadeOut();
            }
        }
    }

}

$("#updateCategories").click(function(e) {
    e.preventDefault();

    $("#catError").css("display", "none");

    var totalWeight = getTotalWeightOfCategories();
    console.log(categories);
    console.log("Weight: " + totalWeight);

    var totalEnteredWeight = 0;

    for (var i = 1; i <= NEW_CATEGORIES; i++) {

        var enteredWeight = $(".newCategoryWeight" + i).val();
        totalEnteredWeight += parseFloat(enteredWeight);

    }

    if (totalEnteredWeight <= 100) {
        for (var j = 1; j <= NEW_CATEGORIES; j++) {
            var enteredName = $(".newCategoryName" + j).val();

            if (enteredName.trim() != "") {
                $(".categoryNameTd" + j).html(enteredName);
                $(".categoryWeightTd" + j).html(parseFloat(enteredWeight) + "%");
                $(".newCategory").removeClass("rollIn");
                $(".newCategory").addClass("fadeIn");
                categories.push({
                    name: enteredName,
                    weight: parseFloat(enteredWeight),
                    received: 0,
                    total: 0,
                    score: 100
                });
                updateCategoryOptions();
                calculateFinalGrade();
            } else {
                $("#catError").css("display", "block");
                $("#catError").html("Please fill all fields.");
            }

        }
    } else {
        $("#catError").css("display", "block");
        $("#catError").html("All weightages must add up to no more than 100%.");
    }


});

$(".content_spacing_sm").on('click', '#add', function(e) {
    e.preventDefault();

    $("#error").css("display", "none");

    NUM_ASSIGNMENTS_ADDED++;

    var rowContent = "";

    if (NUM_ASSIGNMENTS_ADDED % 2 != 0) {
        rowContent += '<tr class="animated fadeIn">';
    } else {
        rowContent += '<tr class="highlight">';
    }

    rowContent += '<td>';
    rowContent += '<a style="color: white; border-radius: 150px;" class="btn btn-danger btn-sm" id="deleteRowNew" href="#">';
    rowContent += '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
    rowContent += '</a>'
    rowContent += '</td>';
    rowContent += '<td>';
    rowContent += '<div class="float_l padding_r5" style="min-width: 105px;">';
    rowContent += $("#categoryDropdown").val();
    rowContent += ' <br>';

    if ($("#fieldName").val().trim() != "" && $("#gNum").val().toString().trim() != "" && $("#gDen").val().trim() != "") {
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
        $("#error").css("display", "block");
        $("#error").removeClass("alert-success");
        $("#error").addClass("alert-danger");
        $("#error").html("Please fill all the fields.");
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

    //Header

    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_left > table > thead > tr").prepend("<th nowrap>Delete:</th>");

    for (var i = 1; i < numRows; i++) {
        //Each Row
        $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ")").prepend('<td><a style="color: white; border-radius: 150px;" class="btn btn-danger btn-sm deleteRow" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>');
    }
}

function addCategoryDeleteColumn() {
    var categoryTableTr = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table tr").html();

    var numRows = 0;

    if (categoryTableTr != undefined) {
        //If zero box doesn't exist
        numRows = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table tr").length;
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

    var totalPoints = 0;

    for (var i = 0; i < categories.length; i++) {

        categories[i].received = 0;

        categories[i].total = 0;
    }


    var numRows = $('.hub_general tr').length;

    for (var l = 1; l < numRows; l++) {

        var scoreHeadings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[1]/table/tbody/tr[' + l + ']/td[5]', document, null, XPathResult.ANY_TYPE, null);

        var thisHeading = scoreHeadings.iterateNext();

        var assignmentTotal = "";

        if (thisHeading) {
            assignmentTotal = thisHeading.textContent;

            var slashIndex = assignmentTotal.indexOf("/");

            if (slashIndex != -1) {
                var equalIndex = assignmentTotal.indexOf("=");

                assignmentTotal = assignmentTotal.substring(slashIndex + 1, equalIndex);

                totalPoints += parseFloat(assignmentTotal);

            } else {
                assignmentTotal = "0";
            }

        } else {
            $("#error").css("display", "block");
            $("#error").removeClass("alert-success");
            $("#error").addClass("alert-danger");
            $("#error").html("An error occurred. Please try again later.");
        }

        var totalReceivedPoints = 0;

        var headings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[1]/table/tbody/tr[' + l + ']/td[5]/div', document, null, XPathResult.ANY_TYPE, null);

        var thisHeading = headings.iterateNext();

        var receivedTotal = "";

        if (thisHeading) {
            receivedTotal = thisHeading.textContent;

            var colonIndex = receivedTotal.indexOf(":");

            if (colonIndex != -1) {

                receivedTotal = receivedTotal.substring(colonIndex + 1, receivedTotal.length);

                if (receivedTotal.trim().replace(/[\x00-\x1F\x7F-\x9F]/g, "") != "" && !isNaN(receivedTotal.trim().replace(/[\x00-\x1F\x7F-\x9F]/g, ""))) { //Gets rid of all invisible characters
                    totalReceivedPoints += parseFloat(receivedTotal);
                } else {
                    receivedTotal = "0";
                }

            } else {
                receivedTotal = "0";
            }

        } else {
            $("#error").css("display", "block");
            $("#error").removeClass("alert-success");
            $("#error").addClass("alert-danger");
            $("#error").html("An error occurred. Please try again later.");
        }

        var categoryHeadings = document.evaluate('//*[@id="container_content"]/div[2]/table[2]/tbody/tr/td[1]/table/tbody/tr[' + l + ']/td[2]/div', document, null, XPathResult.ANY_TYPE, null);

        var thisHeading = categoryHeadings.iterateNext();

        if (thisHeading) {
            var category = thisHeading.textContent;

            var count = 0;

            for (var t = 0; t < categories.length; t++) {

                count++;

                if (category.includes(categories[t].name)) {

                    categories[t].received += parseFloat(receivedTotal);
                    console.log(categories[t].name + ":" + receivedTotal + " / " + assignmentTotal);
                    categories[t].total += parseFloat(assignmentTotal);

                    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (t + 1) + ") > td:nth-child(4)").attr("data-toggle", "tooltip");
                    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (t + 1) + ") > td:nth-child(4)").attr("title", categories[t].received + " / " + categories[t].total);

                    categories[t].score = (categories[t].received / categories[t].total) * 100;

                } else {
                    if (count > categories.length) {
                        $("#error").css("display", "block");
                        $("#error").removeClass("alert-success");
                        $("#error").addClass("alert-danger");
                        $("#error").html("An error occurred. Please try again later.");
                    }
                }

            }
        }

    }

    var total = 0;

    setCorrectCategoryWeights();

    for (var r = 1; r <= categories.length; r++) {
        //console.log(categories[r - 1].name + ": " + categories[r - 1].score);
        //console.log(categories[r - 1].name + ": " + categories[r - 1].weight);

        total += categories[r - 1].score * (categories[r - 1].weight / 100);

        //Setting each category percentage
        var categoryScoreArea = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 1) + ") > td:nth-child(4)").html();

        if (categoryScoreArea != undefined) {
            $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 1) + ") > td:nth-child(4)").html("" + roundNumber(categories[r - 1].score, 2) + "%");
            $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 1) + ") > td:nth-child(4)").addClass("animated bounceIn");
            setTimeout(function() {
                $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (r + 1) + ") > td:nth-child(4)").removeClass("animated bounceIn");
            }, 500);
        } else {
            $('#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(' + (r + 1) + ') > td:nth-child(4)').html("" + roundNumber(categories[r - 1].score, 2) + "%");
            $('#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(' + (r + 1) + ') > td:nth-child(4)').addClass("animated bounceIn");
            setTimeout(function() {
                $('#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(' + (r + 1) + ') > td:nth-child(4)').removeClass("animated bounceIn");
            }, 500);
        }

    }

    //Setting the final score
    $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").html("" + roundNumber(total, 2) + "%");
    $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").addClass("animated bounceIn");
    setTimeout(function() {
        $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").removeClass("animated bounceIn");
    }, 500);

    //Setting the final letter grade
    var letter = getLetterGrade(total);

    $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").html(letter);
    $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").addClass("animated bounceIn");
    setTimeout(function() {
        $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").removeClass("animated bounceIn");
    }, 500);

    console.log("Total: " + roundNumber(total, 2));

    return roundNumber(total, 2);
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
    var totalWeight = getTotalWeightOfCategories();

    console.log(JSON.stringify(categories));
    console.log("Everything weight: " + getTotalWeightOfCategories());

    for (var r = 1; r <= categories.length; r++) {
        console.log("Category " + categories[r - 1].name + ": " + categories[r - 1].weight);
        categories[r - 1].weight = (categories[r - 1].weight / totalWeight) * 100;

    }

}

function getTotalWeightOfCategories() {
    var totalWeight = 0;

    for (var j = 0; j < categories.length; j++) {
        var weightage = $('#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(' + (j + 2) + ') > td:nth-child(3)').html();
        if (weightage != undefined) {
            //If zero box doesn't exist
            weightage = weightage.substring(0, weightage.length - 1);

            categories[j].weight = parseFloat(weightage);
        } else {
            //If zero box exists
            weightage = $('#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(' + (j + 2) + ') > td:nth-child(3)').html();

            weightage = weightage.substring(0, weightage.length - 1);

            categories[j].weight = parseFloat(weightage);
        }
    }


    for (var i = 0; i < categories.length; i++) {
        //alert(categories[i].weight);
        totalWeight += categories[i].weight;
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