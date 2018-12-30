var originalReceived, originalTotal, NUM_ASSIGNMENTS_ADDED = 0,
    CALCULATOR_TYPE = "Add Assignment",
    NEW_CATEGORIES = 0,
    ZERO_TABLE_EXISTS = !1,
    CATEGORY_TABLE_EXISTS = !0,
    WEIGHT_COLUMN_EXISTS = !0,
    user = new User,
    alertContent = '<div id="errorAlert" style="display: none" class="alert-bs alert-bs-danger" role="alert">\n                        <button onclick="$(\'#setAlert\').removeClass(); $(\'#errorAlert\').fadeOut();" type="button" class="close" aria-label="Close">\n                            <span aria-hidden="true">&times;</span>\n                        </button>\n                        <span id="error"></span>\n                    </div>';
$(".content_spacing_sm").prepend(alertContent), $(".content_spacing_sm").css("height", "auto"), $(".content_spacing_sm").css("margin-top", "10px"), $(".content_spacing_sm").append('<div id="fb-root"></div>');
try {
    ! function (t, e, n) {
        var a, r = t.getElementsByTagName(e)[0];
        t.getElementById(n) || ((a = t.createElement(e)).id = n, a.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=1155738174469383&autoLogAppEvents=1", r.parentNode.insertBefore(a, r))
    }(document, "script", "facebook-jssdk");
    var enableHTML = "";
    "true" == localStorage.enabledLoop ? (enableHTML = '<div><input class="form-check-input" type="checkbox" value="" id="enableEasyLoop" checked>\n        <label class="form-check-label" for="enableEasyLoop">\n            Disable Easy Loop\n        </label></div>', startProgram()) : enableHTML = '<div><input class="form-check-input" type="checkbox" value="" id="enableEasyLoop">\n        <label class="form-check-label" for="enableEasyLoop">\n            Enable Easy Loop\n        </label></div>';
    var nth_child = 7;
    nth_child = "true" == localStorage.enabledLoop ? 7 : 4, $("#container_content > div.content_margin > table:nth-child(" + nth_child + ") > tbody > tr:nth-child(2) > td:nth-child(2)").html(enableHTML), $("#enableEasyLoop").change(function () {
        "false" == localStorage.enabledLoop ? localStorage.setItem("enabledLoop", "true") : localStorage.setItem("enabledLoop", "false"), location.reload()
    })
} catch (t) {
    localStorage.setItem("enabledLoop", "false"), $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("Not able to receive grades at this time. Recent changes in Schoolloop have caused the weightage column in the category box to not appear for students, and students <strong>must talk to their teacher in order to get this problem fixed</strong>. Otherwise, Easy Loop cannot calculate grades. Also, try again later or contact developer at sguduguntla11@gmail.com.");
    nth_child = 3;
    nth_child = ZERO_TABLE_EXISTS ? 5 : 3;
    var catAlertContent = '<div id="catAlert" class="alert-bs alert-bs-danger">';
    throw catAlertContent += '<button onclick="$(\'#catAlert\').fadeOut();" type="button" class="close" aria-label="Close">', catAlertContent += '<span aria-hidden="true">&times;</span>', catAlertContent += "</button>", catAlertContent += '<span id="catError">No weightage column found below. Easy Loop cannot calculate grades without weightages. <strong>Please talk to your teachers about this problem</strong>.</span>', catAlertContent += "</div>", $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + nth_child + ") > div.module_content").prepend(catAlertContent), t
}

function startProgram() {
    $("#container_content > div.content_margin > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1)").append('<span class="list_text"><img src="https://cdn.schoolloop.com/1607081711/img/spacer.gif" width="10" height="13" alt="">Current Date: </span><span class="off">' + getDateToday() + " " + getCurrentTime() + "</span>"), checkForZeroTable(), checkForCategoryTable(), addAssignmentTableContent(), addAssignmentDeleteButtons(), hideOrShowGrades();
    init();
    CATEGORY_TABLE_EXISTS && (updateCategoryOptions(), changeCategoriesUI(), addCategoryDeleteColumn(), addSortDropdown()), $("<br/><br/><blockquote style='font-size: 1.2em;font-weight: bold'><div>Like <a style='color: #23527C;' target='_blank' href='http://www.sriharshaguduguntla.com/easyloop/'>Easy Loop</a> on <a style='color: #23527C;' target='_blank' href='https://facebook.com/schoolloopeasyloop'>Facebook</a>!</div><div class=\"fb-like\" data-href=\"https://facebook.com/schoolloopeasyloop\" data-layout=\"standard\" data-action=\"like\" data-size=\"large\" data-show-faces=\"true\" data-share=\"true\"></div></blockquote>").insertAfter("#container_content > div.content_margin > h2"), ZERO_TABLE_EXISTS && showOrHideZeroTable(), gradeBreakDownModal()
}

function editableGrades() {
    $(".hub_general > tbody > tr").each(function (t, e) {
        let n = $(e).children(":nth-child(4)");
        const a = n.text().indexOf("/"),
            r = n.text().indexOf("="),
            o = n.children().text().indexOf("score:");
        if (-1 != a && -1 != r) {
            const t = parseFloat(n.text().substring(a + 1, r).trim()),
                e = parseFloat(n.children().text().substring(o + 8).trim());
            n.replaceWith("<td nowrap><div>Score: <span class='changeReceived'>" + e + "</span></div><span class='changeReceived'>" + e + "</span> / <span class='changeTotal'>" + t + "</span> = <span class='changeTotalPercent'>" + roundNumber(e / t * 100, 2) + "</span>%<br/><form class='form-inline'><div class='form-group'><input style='width: 60px; height: 25px;' class='form-control editReceived form-control-sm' value='" + e + "' type='number'/> / <input style='width: 60px; height: 25px;' class='form-control editTotal form-control-sm' value='" + t + "' type='number'/></div></form></td>")
        }
    })
}

function gradeBreakDownModal() {
    const t = populateCategoryInfo();
    var e = t[0],
        n = t[1],
        a = user.getAllCategories();
    let r = '<div id="breakdownModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">;\n                                <div class="modal-dialog modal-lg" role="document">\n                                    <div class="modal-content">\n                                        <div class="modal-header">\n                                            <h5 class="modal-title" id="exampleModalLongTitle">Your Grade breakdown</h5>\n                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n                                                <span aria-hidden="true">&times;</span>\n                                            </button>\n                                        </div>\n                                        <div class="modal-body">';
    if (CATEGORY_TABLE_EXISTS) {
        r += '<h4>Category Breakdown</h4>\n                                    <table id="categoryBreakdownTable" class="table table-hover text-center">\n                                        <thead>\n                                            <tr>\n                                                <th class="text-center">Category</th><th class="text-center">Weightage</th>\n                                                <th class="text-center">Score</th>\n                                                <th class="text-center">Received (pts)</th>\n                                                <th class="text-center">Extra Credit (pts)</th>\n                                                <th class="text-center">Total (pts)</th>\n                                            </tr>\n                                        </thead>\n                                    <tbody>';
        for (var o = 0; o < a.length; o++) r += `<tr>\n                                        <td>${a[o].name}</td>\n                                        <td>${a[o].weight}%</td>\n                                        <td><mark><strong>${a[o].score}%</strong><mark></td>\n                                        <td>${a[o].received}</td><td>${a[o].extra_credit}</td>\n                                        <td>${a[o].total}</td>\n                                    </tr>`;
        r += "</tbody>\n                                </table>"
    } else r += `<h4>Unweighted Grade Breakdown</h4>\n                                <h5><strong>Received: </strong>${n} pts</h5>\n                                <h5><strong>Total: </strong>${e} pts</h5>\n                                <h5><strong>Final Score: </strong>(${n} / ${e}) * 100 = <mark><strong>${roundNumber(n/e*100,2)}%</strong></mark></h5>`;
    if (ZERO_TABLE_EXISTS) {
        r += '<h4>Zeroes</h4>\n                                <table id="zeroBreakdownTable" class="table table-hover text-center">\n                                    <thead>\n                                        <tr>\n                                        <th class="text-center">Category</th>\n                                        <th class="text-center">Date</th>\n                                        <th class="text-center">Assignment Name</th>\n                                        <th class="text-center">Received (pts)</th>\n                                        <th class="text-center">Total (pts)</th>\n                                        </tr>\n                                    </thead>\n                                <tbody>';
        for (o = 0; o < a.length; o++)
            for (var l = 0; l < a[o].zeroes.length; l++) r += `<tr>\n                                            <td>${a[o].name}</td>\n                                            <td>${a[o].zeroes[l].date}</td>\n                                            <td>${a[o].zeroes[l].assignmentName}</td>\n                                            <td style="color:red">0</td><td>${a[o].zeroes[l].total}</td>\n                                        </tr>`;
        r += "</tbody>\n                                </table>"
    }
    if (CATEGORY_TABLE_EXISTS) {
        r += '<h4>Highest Scores (by Category)</h4>\n                                <table id="highScoreBreakdownTable" class="table table-hover text-center">\n                                    <thead>\n                                        <tr>\n                                        <th class="text-center">Category</th>\n                                        <th class="text-center">Date</th><th class="text-center">Assignment Name</th>\n                                        <th class="text-center">Score</th><th class="text-center">Received (pts)</th>\n                                        <th class="text-center">Total (pts)</th>\n\n                                    <tbody>';
        for (o = 0; o < a.length; o++) r += `<tr>\n                                        <td>${a[o].name}</td>\n                                        <td>${a[o].high_score.date}</td>\n                                        <td>${a[o].high_score.assignmentName}</td>\n                                        <td><mark><strong>${a[o].high_score.score}%</strong></mark></td>\n                                        <td>${a[o].high_score.received}</td><td>${a[o].high_score.total}</td>\n                                    </tr>`;
        r += '</tbody>\n                                </table>\n                                <h4>Lowest Scores (by Category)</h4>\n                                <table id="lowScoreBreakdownTable" class="table table-hover text-center">\n                                    <thead>\n                                        <tr>\n                                        <th class="text-center">Category</th>\n                                        <th class="text-center">Date</th><th class="text-center">Assignment Name</th>\n                                        <th class="text-center">Score</th>\n                                        <th class="text-center">Received (pts)</th>\n                                        <th class="text-center">Total (pts)</th>\n                                        </tr>\n                                    </thead>\n                                <tbody>';
        for (o = 0; o < a.length; o++) r += `<tr>\n                                        <td>${a[o].name}</td>\n                                        <td>${a[o].low_score.date}</td>\n                                        <td>${a[o].low_score.assignmentName}</td>\n                                        <td><mark><strong>${a[o].low_score.score}%</strong></mark></td>\n                                        <td>${a[o].low_score.received}</td>\n                                        <td>${a[o].low_score.total}</td>\n                                    </tr>`;
        r += "</tbody>\n                                </table>\n                                <p><strong>TOTAL:</strong></p>";
        var d = 0,
            i = getTotalWeightOfCategories();
        for (o = 0; o < a.length; o++) d += a[o].score * (a[o].weight / i), o == a.length - 1 ? r += `<p>${a[o].score} * (${a[o].weight} / ${i}") = <mark><strong>${roundNumber(d,2)}%</strong></mark></p>` : r += `<p>${a[o].score} * (${a[o].weight} / ${i}") = ${d}</p>`
    }
    r += '<hr/>\n                                <h4>More detailed breakdown coming soon...</h4>\n                            </div>\n                            <div class="modal-footer">\n                                <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>\n                            </div>\n                            </div>\n                            </div>\n                            </div>', 0 != $("#breakdownModal").length && $("#breakdownModal").remove(), $("body").append(r)
}

function addSortDropdown() {
    $(".hub_general > thead > tr > th.sort_by").html('<select class="form-control form-control-sm" id="sortBy">\n            <option value="Sort by...">Sort By...</option>\n            <option value="Sort by Category">Sort by Category</option>\n            <option value="Sort by Percent (ascending)">Sort by Percent (ascending)</option>\n            <option value="Sort by Percent (descending)">Sort by Percent (descending)</option>\n        </select>')
}

function sortByPercent(t) {
    var e;
    $(".hub_general tr").length;
    "ascending" == t ? e = $(".hub_general > tbody > tr").sort(function (t, e) {
        var n = $(t).children("td:nth-child(5)").children("span.changeTotalPercent").html(),
            a = $(e).children("td:nth-child(5)").children("span.changeTotalPercent").html();
        return parseFloat(n) - parseFloat(a)
    }) : "descending" == t && (e = $(".hub_general > tbody > tr").sort(function (t, e) {
        var n = $(t).children("td:nth-child(5)").children("span.changeTotalPercent").html(),
            a = $(e).children("td:nth-child(5)").children("span.changeTotalPercent").html();
        return parseFloat(a) - parseFloat(n)
    })), $(".hub_general > tbody").html(e), $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-success"), $("#error").html("Grades have been sorted by percentage (" + t + ")")
}

function sortByCategory() {
    for (var t = user.getAllCategories(), e = $(".hub_general tr").length, n = [], a = 0; a < t.length; a++) {
        var r = {};
        r.name = t[a].name, r.htmlArray = [], n.push(r);
        for (var o = 1; o < e; o++) {
            var l = $(".hub_general > tbody > tr:nth-child(" + o + ") > td:nth-child(2) > div"),
                d = l.html().trim(),
                i = d.indexOf("<br>"); - 1 != i && (d = d.substring(0, i).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim()), d == r.name ? r.htmlArray.push(l.parent().parent().html().trim()) : 0 > t.length && ($("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("An error occurred. Please try again later."))
        }
    }
    $(".hub_general > tbody").html("");
    for (var c = 0; c < n.length; c++)
        for (var s = 0; s < n[c].htmlArray.length; s++) s % 2 == 0 ? $(".hub_general > tbody").append("<tr class='highlight'>" + n[c].htmlArray[s] + "</tr>") : $(".hub_general > tbody").append("<tr>" + n[c].htmlArray[s] + "</tr>");
    $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-success"), $("#error").html("Grades have been sorted by category.")
}

function showOrHideZeroTable() {
    $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero > div > div.detail_sub.round.shadow").append("<span><a style='cursor: pointer;font-size: 0.8em;float: right;' id='hideZeroes'>hide</a></span>"), $("#hideZeroes").click(function (t) {
        t.preventDefault(), $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero > div").css("visibility", "hidden"), $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero").prepend("<a style='cursor: pointer;font-size: 1em;float: right;' id='showZeroes'>show</a>"), $("#showZeroes").click(function (t) {
            $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div.detail_highlight_zero > div").css("visibility", "visible"), $(this).remove()
        })
    })
}

function checkForCategoryTable() {
    var t = 3;
    if (t = ZERO_TABLE_EXISTS ? 5 : 3, "scores per category" == $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ") > h2").html().toLowerCase()) {
        $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ") > div.module_content > table > tbody > tr:nth-child(1) > td").length < 3 ? (CATEGORY_TABLE_EXISTS = !1, $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-warning"), $("#error").html("<strong>Warning:</strong> No category weightages were found. <strong>This is just a warning, so you may still make unweighted calculations.</strong>")) : CATEGORY_TABLE_EXISTS = !0
    } else {
        CATEGORY_TABLE_EXISTS = !1;
        ZERO_TABLE_EXISTS ? 3 : 1
    }
}

function checkForZeroTable() {
    var t = $(".detail_highlight_zero").html();
    ZERO_TABLE_EXISTS = !!t
}

function init() {
    if (CATEGORY_TABLE_EXISTS)
        for (var t = $(".list_label_grey"), e = 0; e < t.length; e++) {
            (o = {}).name = t[e].textContent;
            var n = 3;
            n = ZERO_TABLE_EXISTS ? 5 : 3;
            try {
                var a = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + n + ") > div.module_content > table > tbody > tr:nth-child(" + (e + 2) + ") > td:nth-child(2)").html();
                a = parseInt(a.substring(0, a.length - 1)), o.weight = a;
                var r = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + n + ") > div.module_content > table > tbody > tr:nth-child(" + (e + 2) + ") > td:nth-child(3)").html();
                r = parseFloat(r.substring(0, r.length - 1)), o.score = r, o.received = 0, o.total = 0, user.insertCategory(o)
            } catch (t) {
                throw $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("Not able to receive grades at this time. Possible Reasons for errors: No weightages (no weightage column), error in categories. Please talk to your teachers about your weightages, try again later or contact developer at sguduguntla11@gmail.com."), t
            }
        } else {
            var o = {
                name: "No Categories"
            };
            user.insertCategory(o)
        }
    return user.getAllCategories()
}

function updateCategoryOptions() {
    var t = user.getAllCategories();
    $("#categoryDropdown").html('<option selected disabled value="">Choose Weight Category</option>');
    for (var e = 0; e < t.length; e++) {
        var n = t[e].name;
        $("#categoryDropdown").append('<option value="' + n + '">' + n + "</option>")
    }
}

function addAssignmentTableContent() {
    let t = `<a style="color: black;" data-toggle="modal" data-target="#breakdownModal" class="btn btn-light btn-sm" id="breakdownGrade">See Grade Breakdown</a>\n                <button id="enableEditable" class="btn btn-light btn-sm">${"true"==localStorage.editable?"Disable Grade Editing":"Enable Grade Editing"}</button>\n                <button id='recalculateGrade' class='btn btn-light btn-sm'>Recalculate Grade</button></span>\n                <button id='changeCalculator' class='btn btn-light btn-sm'>${"Add Assignment"==CALCULATOR_TYPE?"Finals Grade Calculator":"Add Assignment"}</button></span>\n                <br/><br/>`;
    "Add Assignment" == CALCULATOR_TYPE ? (t += '<div id="insertedContent"><table id = "addTable" class="table">\n                    <tbody>\n                    <tr style="background-color: #eee" id="setAlert">', CATEGORY_TABLE_EXISTS && (t += '<td>\n                            <select class="form-control form-control-sm" id="categoryDropdown">\n                            </select>\n                        </td>'), t += '<td>\n                        <input placeholder="Assignment Name" class="form-control form-control-sm" type="text" id="fieldName">\n                    </td>\n                    <td>\n                        <form class="form-inline">\n                            <div class="form-group">\n                                <input type="number" class="aNum form-control form-control-sm" style="width:60px;" id="gNum"/>&nbsp;&nbsp; / &nbsp;&nbsp;<input type="number"" class="aNum form-control form-control-sm" style="width:60px;" id="gDen"/>\n                                &nbsp;&nbsp;&nbsp; &rarr; &nbsp;&nbsp;&nbsp;<strong><span id="assignmentPercent"></span> %</strong>\n                            </div>\n                        </form>\n                    </td>\n                    <td>\n                        <a style="color: black;" class="center-block btn btn-light" id="add" href="#">Add</a>\n                    </td>\n                    </tr>\n                    </tbody>\n                    </table>\n                    </div>') : "Finals Grade Calculator" == CALCULATOR_TYPE && (t += '<div id="insertedContent">\n                        <table id="addTable" class="table">\n                            <tbody>\n                                <tr style="background-color: #eee" id="setAlert">\n                                    <td>\n                                        <input placeholder="Desired Grade (i.e. 97)" maxlength="2" class="form-control form-control-sm" type="number" id="desiredGrade"/>\n                                    </td>\n                                    <td>\n                                        <input type="number" placeholder="Final is worth... (i.e. 30)" maxlength="2" class="form-control form-control-sm" id="finalWorth"/>\n                                    </td>\n                                    <td>\n                                        <a style="color: black; font-size: 1.2em;" class="center-block btn btn-light" id="calculateFinals" href="#">Calculate</a>\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>'), $(".content_spacing_sm").append(t), "true" == localStorage.editable && editableGrades(), $("#enableEditable").click(function () {
        "false" == localStorage.editable ? localStorage.setItem("editable", "true") : localStorage.setItem("editable", "false"), location.reload()
    })
}

function changeCategoriesUI() {
    var t = 3,
        e = 4,
        n = 6,
        a = 1;
    ZERO_TABLE_EXISTS ? (t = 5, e = 6, n = 8, a = 3, $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div.detail_highlight_zero").css("margin-left", "40px")) : (t = 3, e = 4, n = 6, a = 1);
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ") > div.module_content").prepend('<div id="catAlert" class="alert-bs alert-bs-danger"><button onclick="$(\'#catAlert\').fadeOut();" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><span id="catError"></span></div>'), $("#catAlert").css("display", "none"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + a + ")").css("margin-left", "10px"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ") > div.module_content > table").addClass("table table-striped table-hover"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ")").css("margin-left", "10px"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + e + ") > div > table").addClass("table table-hover table-striped"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + e + ")").css("margin-left", "10px"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + n + ") > div > table").addClass("table table-hover table-striped"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + n + ")").css("margin-left", "10px"), $(".info_content").prepend('<a style="color: black; height: 30px;" class="btn btn-light btn-sm" id="addCategory" href="#">New Category</a><a style="color: black; height: 30px; margin-left: 10px" class="btn btn-light btn-sm" id="updateCategories" href="#">Update</a><br>');
    var r = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ") > div.module_content > table").css("width"),
        o = parseFloat(r.substring(0, r.length - 2));
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(" + t + ")").css("width", o + 100 + "px")
}

function deleteAllRowsWithDeletedCategory(t) {
    for (var e = $(".hub_general tr").length, n = 1; n < e; n++) {
        var a = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + n + ") > td:nth-child(2) > div").html();
        (a = a.substring(0, t.length)) == t && $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + n + ") > td:nth-child(2) > div").parent().parent().fadeOut()
    }
}

function addAssignmentDeleteButtons() {
    for (var t = $(".hub_general tr").length, e = 1; e < t; e++) $(".hub_general > tbody > tr:nth-child(" + e + ")").prepend('<td><a style="color: black; font-size: 1.3em;" class="center-block btn btn-light btn-sm deleteRow" href="#">&times;</a></td>')
}

function hideOrShowGrades() {
    var t = !1;
    $(".hub_general > thead > tr").prepend("<th nowrap><a style='cursor: pointer;' id='hideGrades'>hide all</a></th>"), $("#hideGrades").click(function (e) {
        0 == t ? (t = !0, $(".hub_general tr td ").css("visibility", "hidden"), $("#hideGrades").html("show all")) : (t = !1, $(".hub_general tr td ").css("visibility", "visible"), $("#hideGrades").html("hide all"))
    })
}

function addCategoryDeleteColumn() {
    $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr").html();
    var t = 0;
    if (ZERO_TABLE_EXISTS) {
        t = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table tr").length, $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(1)").prepend("<td class='list_label' nowrap></td>");
        for (e = 2; e <= t; e++) $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(" + e + ")").prepend("<td></td>")
    } else {
        t = $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr").length, $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(1)").prepend("<td class='list_label' nowrap></td>");
        for (var e = 2; e <= t; e++) $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + e + ")").prepend("<td></td>")
    }
}

function calculateFinalGrade() {
    var t = populateCategoryInfo(),
        e = t[0],
        n = t[1],
        a = user.getAllCategories(),
        r = 0;
    if (CATEGORY_TABLE_EXISTS) {
        setCorrectCategoryWeights();
        for (var o = 0; o < a.length; o++) {
            0 === a[o].received && 0 === a[o].total && (a[o].score = 100), r += a[o].score * (a[o].weight / 100), null != $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (o + 2) + ") > td:nth-child(4)").html() ? ($("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (o + 2) + ") > td:nth-child(4)").html(roundNumber(a[o].score, 2) + "%"), $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (o + 2) + ") > td:nth-child(4)").addClass("animated bounceIn")) : ($("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(" + (o + 2) + ") > td:nth-child(4)").html(roundNumber(a[o].score, 2) + "%"), $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(5) > div.module_content > table > tbody > tr:nth-child(" + (o + 2) + ") > td:nth-child(4)").addClass("animated bounceIn"))
        }
    } else a[0].received = n, a[0].total = e, r = roundNumber(a[0].received / a[0].total * 100, 2), a[0].score = r;
    $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").html(roundNumber(r, 2) + "%"), $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").addClass("animated bounceIn");
    var l = getLetterGrade(r);
    return $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").html(l), $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(2)").addClass("animated bounceIn"), gradeBreakDownModal(), roundNumber(r, 2)
}

function populateCategoryInfo() {
    for (var t = user.getAllCategories(), e = 0, n = 0, a = 0; a < t.length; a++) t[a].received = 0, t[a].total = 0, t[a].extra_credit = 0, t[a].zeroes = [], t[a].high_score = {
        received: 0,
        score: 0
    }, t[a].low_score = {
        received: 0,
        score: 0
    };
    if (CATEGORY_TABLE_EXISTS) {
        var r = 3;
        r = ZERO_TABLE_EXISTS ? 5 : 3;
        for (var o = 0; o < t.length; o++) try {
            var l = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(" + r + ") > div.module_content > table > tbody > tr:nth-child(" + (o + 2) + ") > td:nth-child(3)").html();
            l = parseInt(l.substring(0, l.length - 1)), t[o].weight = l
        } catch (t) {
            throw $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("Not able to receive grades at this time. Possible Reasons for errors: No weightages (no weightage column), error in categories. Please talk to your teachers about your weightages, try again later or contact developer at sguduguntla11@gmail.com."), t
        }
    }
    for (var d = $(".hub_general tr").length, i = 1; i < d; i++) {
        var c = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(5)").text().trim(),
            s = c.indexOf("/"),
            h = c.indexOf("="); - 1 != s && -1 != h ? (c = c.substring(s + 1, h).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim(), isNaN(c) || "" == c ? c = "0" : e += parseFloat(c)) : c = "0";
        var g = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(5) > div").text().toLowerCase().trim(),
            b = g.indexOf("score:");
        if (-1 != b ? (g = g.substring(b + 6, g.length).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim(), isNaN(g) || "" == g ? g = "0" : n += parseFloat(g)) : g = "0", CATEGORY_TABLE_EXISTS) {
            var m = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > div").html().trim(),
                p = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(2) > div > a").text().trim(),
                u = "";
            void 0 !== $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(4)") && (u = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_left > table > tbody > tr:nth-child(" + i + ") > td:nth-child(4)").html().trim());
            for (var v = 0, _ = 0; _ < t.length; _++) {
                v++;
                var y = m.indexOf("<br>");
                if (-1 != y && (m = decodeHTMLEntities(m.substring(0, y).replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim())), m == t[_].name) {
                    t[_].received += parseFloat(g), 0 == parseFloat(g) && t[_].zeroes.push({
                        assignmentName: p,
                        total: parseFloat(c),
                        date: u
                    }), t[_].total += parseFloat(c), parseFloat(g) > parseFloat(c) && (t[_].extra_credit += parseFloat(g) - parseFloat(c));
                    var f = roundNumber(parseFloat(g) / parseFloat(c) * 100, 2);
                    void 0 === t[_].low_score.total && (t[_].low_score = {
                        assignmentName: p,
                        total: parseFloat(c),
                        date: u,
                        received: parseFloat(g),
                        score: f
                    }), f < t[_].low_score.score && (t[_].low_score = {
                        assignmentName: p,
                        total: parseFloat(c),
                        date: u,
                        received: parseFloat(g),
                        score: f
                    }), f > t[_].high_score.score && (t[_].high_score = {
                        assignmentName: p,
                        total: parseFloat(c),
                        date: u,
                        received: parseFloat(g),
                        score: f
                    }), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (_ + 1) + ") > td:nth-child(4)").attr("data-toggle", "tooltip"), $("#container_content > div.content_margin > table:nth-child(6) > tbody > tr > td.home_right > div:nth-child(3) > div.module_content > table > tbody > tr:nth-child(" + (_ + 1) + ") > td:nth-child(4)").attr("title", t[_].received + " / " + t[_].total), t[_].score = roundNumber(t[_].received / t[_].total * 100, 2)
                } else v > t.length && ($("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("An error occurred. Please try again later."))
            }
        }
    }
    return [e, n]
}

function decodeHTMLEntities(t) {
    var e = document.createElement("textarea");
    return e.innerHTML = t, e.value
}

function getLetterGrade(t) {
    var e = "A";
    return t >= 97 ? e = "A+" : t >= 93 ? e = "A" : t >= 90 ? e = "A-" : t >= 87 ? e = "B+" : t >= 83 ? e = "B" : t >= 80 ? e = "B-" : t >= 77 ? e = "C+" : t >= 73 ? e = "C" : t >= 70 ? e = "C-" : t >= 67 ? e = "D+" : t >= 63 ? e = "D" : t >= 60 ? e = "D-" : t >= 0 && (e = "F"), e
}

function setCorrectCategoryWeights() {
    for (var t = user.getAllCategories(), e = getTotalWeightOfCategories(), n = 0; n < t.length; n++) t[n].weight = roundNumber(t[n].weight / e * 100, 2)
}

function getTotalWeightOfCategories() {
    for (var t = 0, e = $("td[class='list_label_grey']"), n = 0; n < e.length; n++) {
        var a = 3;
        a = ZERO_TABLE_EXISTS ? 5 : 3;
        try {
            var r = $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(" + a + ") > div.module_content > table > tbody > tr:nth-child(" + (n + 2) + ") > td:nth-child(3)").html();
            t += r = parseInt(r.substring(0, r.length - 1))
        } catch (t) {
            throw $("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("Not able to receive grades at this time. Possible Reasons for errors: No weightages (no weightage column), error in categories. Please talk to your teachers about your weightages, try again later or contact developer at sguduguntla11@gmail.com."), t
        }
    }
    return t
}

function roundNumber(t, e) {
    return Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
}

function getDateToday() {
    var t = new Date;
    return t.getMonth() + 1 + "/" + t.getDate() + "/" + t.getFullYear().toString().substring(2)
}

function getCurrentTime() {
    var t = new Date,
        e = t.getHours(),
        n = t.getMinutes(),
        a = (t.getSeconds(), "AM");
    return a = e >= 12 ? "PM" : "AM", e > 12 && (e -= 12), n <= 9 ? e + ":0" + n + " " + a : e + ":" + n + " " + a
}
$(document).on("click", "#recalculateGrade", function (t) {
    calculateFinalGrade()
}), $(document).on("input", ".editReceived", function () {
    var t = $(this).parent().parent().parent().parent().children("td.list_text");
    t.children("p.easyloop-comment").html() || (originalReceived = $(this).parent().parent().parent().find("div").children("span").html(), originalTotal = $(this).parent().parent().parent().children("span.changeTotal").html(), t.append("<p class='text-danger easyloop-comment'><em>Edited by Easy Loop. Original:</em> <strong>" + originalReceived + " / " + originalTotal + "</strong></p>")), originalReceived === $(this).val() && originalTotal === $(this).parent().parent().parent().children("span.changeTotal").html() && t.children("p.easyloop-comment").remove(), $(this).parent().parent().parent().find("div").children("span").html($(this).val()), $(this).parent().parent().parent().children("span.changeReceived").html($(this).val());
    var e = parseFloat($(this).parent().parent().parent().children("span.changeReceived").html()),
        n = parseFloat($(this).parent().parent().parent().children("span.changeTotal").html());
    $(this).parent().parent().parent().children("span.changeTotalPercent").html(roundNumber(e / n * 100, 2))
}), $(document).on("input", ".editTotal", function () {
    var t = $(this).parent().parent().parent().parent().children("td.list_text");
    t.children("p.easyloop-comment").html() || (originalTotal = $(this).parent().parent().parent().children("span.changeTotal").html(), originalReceived = $(this).parent().parent().parent().find("div").children("span").html(), t.append("<p class='text-danger easyloop-comment'><em>Edited by Easy Loop. Original:</em> <strong>" + originalReceived + " / " + originalTotal + "</strong></p>")), originalTotal === $(this).val() && originalReceived === $(this).parent().parent().parent().children("span.changeReceived").html() && t.children("p.easyloop-comment").remove(), $(this).parent().parent().parent().children("span.changeTotal").html($(this).val());
    var e = parseFloat($(this).parent().parent().parent().children("span.changeTotal").html()),
        n = parseFloat($(this).parent().parent().parent().children("span.changeTotal").html());
    $(this).parent().parent().parent().children("span.changeTotalPercent").html(roundNumber(e / n * 100, 2))
}), $("#sortBy").change(function (t) {
    var e = $(this).val();
    "Sort by Category" == e ? sortByCategory() : "Sort by Percent (ascending)" == e ? sortByPercent("ascending") : "Sort by Percent (descending)" == e ? sortByPercent("descending") : "Sort by..." == e && location.reload()
}), $(document).on("input", ".aNum", function () {
    $("#assignmentPercent").html(roundNumber($("#gNum").val() / $("#gDen").val() * 100, 2))
}), $(".content_spacing_sm").on("click", "#calculateFinals", function (t) {
    try {
        var e = parseFloat($("#desiredGrade").val()),
            n = parseFloat($("#finalWorth").val()),
            a = $("#container_content > div.content_margin > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > b:nth-child(4)").html(),
            r = (100 * e - (100 - n) * parseFloat(a.substring(0, a.length - 1))) / n;
        $("#error").html("You need " + roundNumber(r, 2) + "% on your final to get an overall grade of " + e + "%."), $("#errorAlert").removeClass().addClass("alert-bs alert-bs-success").fadeIn(), $("#setAlert").removeClass()
    } catch (t) {
        $("#error").html("Please fill all the fields."), $("#errorAlert").removeClass().addClass("alert-bs alert-bs-danger").fadeIn(), $("#setAlert").addClass("danger")
    }
}), $(".content_spacing_sm").on("click", "#changeCalculator", function () {
    $(".content_spacing_sm").contents(":not(#errorAlert)").remove(), CALCULATOR_TYPE = $(this).text(), addAssignmentTableContent(), "Add Assignment" == CALCULATOR_TYPE && updateCategoryOptions()
}), $("#addCategory").click(function (t) {
    t.preventDefault();
    user.getAllCategories();
    if (NEW_CATEGORIES < 1) {
        var e = getTotalWeightOfCategories();
        if (NEW_CATEGORIES++, e < 100) {
            var n = '<tr class="animated rollIn newCategory">';
            n += '<td><a style="color: black; font-size: 1.3em;" class="center-block btn btn-light btn-sm deleteCatRow" href="#">&times;</a></td>', n += '<td class="list_label_grey categoryNameTd' + NEW_CATEGORIES + '" width="100%"><input type="text" style="height: 30px; width: 85%;" class="form-control form-control-sm newCategoryName' + NEW_CATEGORIES + '"/></td>', n += '<td class="list_text categoryWeightTd' + NEW_CATEGORIES + '" nowrap=""><input type="number" style="height: 30px;" class="form-control form-control-sm newCategoryWeight' + NEW_CATEGORIES + '"/>%</td>', n += '<td class="list_text categoryGrade" nowrap>100%</td>', n += "</tr>";
            var a = 3;
            a = ZERO_TABLE_EXISTS ? 5 : 3, $("#container_content > div.content_margin > table:nth-child(9) > tbody > tr > td.home_right > div:nth-child(" + a + ") > div.module_content > table > tbody").append(n)
        } else $("#catAlert").fadeIn(), $("#catError").html("All weightages add up to 100%. You may not add more categories.");
        $(document).on("click", ".deleteCatRow", function (t) {
            t.preventDefault(), NEW_CATEGORIES--;
            var e = $(this).parent().parent().children().eq(1).text();
            user.removeCategory(e), updateCategoryOptions(), "" != e && deleteAllRowsWithDeletedCategory(e), $(this).parent().parent().fadeOut(100, function () {
                $(this).remove(), calculateFinalGrade()
            })
        })
    } else $("#catAlert").fadeIn(), $("#catError").html("Please update categories before adding another category.")
}), $("#updateCategories").click(function (t) {
    t.preventDefault(), $("#catAlert").fadeOut();
    var e = getTotalWeightOfCategories(),
        n = parseFloat($(".newCategoryWeight" + NEW_CATEGORIES).val());
    if ((e += n) <= 100) {
        var a = $(".newCategoryName" + NEW_CATEGORIES).val();
        if ("" != a.trim()) {
            $(".categoryNameTd" + NEW_CATEGORIES).html(a), $(".categoryNameTd" + NEW_CATEGORIES).removeClass("categoryNameTd" + NEW_CATEGORIES), $(".categoryWeightTd" + NEW_CATEGORIES).html(parseInt(n) + "%"), $(".newCategory").removeClass("rollIn"), $(".newCategory").addClass("fadeIn");
            var r = {
                name: a,
                weight: parseInt(n),
                received: 0,
                total: 0,
                score: 100
            };
            user.insertCategory(r), updateCategoryOptions(), NEW_CATEGORIES--
        } else $("#catAlert").fadeIn(), $("#catError").html("Please fill all fields.")
    } else $("#catAlert").fadeIn(), $("#catError").html("All weightages must add up to no more than 100%.")
}), $(".content_spacing_sm").on("click", "#add", function (t) {
    t.preventDefault(), $("#errorAlert").css("display", "none");
    var e = "";
    e += ++NUM_ASSIGNMENTS_ADDED % 2 != 0 ? '<tr class="animated fadeIn">' : '<tr class="highlight">', e += "<td>", e += '<a style="color: black; font-size: 1.3em;" class="center-block btn btn-light btn-sm deleteRow" href="#">&times;</a>', e += "</td>", e += "<td>", e += '<div class="float_l padding_r5" style="min-width: 105px;">', e += CATEGORY_TABLE_EXISTS ? $("#categoryDropdown").val() : "Unweighted", e += " <br>", "" != $("#fieldName").val().trim() && "" != $("#gNum").val().toString().trim() && "" != $("#gDen").val().trim() && "" != $("#categoryDropdown").val() ? ($("#setAlert").removeClass(), e += ' <a href="/content/view?d=x&id=1439533299133&return_url=1450479219516" title="' + $("#fieldName").val() + '">' + $("#fieldName").val() + "</a>", e += " </div>", e += "</td>", e += ' <td style="width:100%;">', e += " </td>", e += ' <td id="date">', e += getDateToday(), e += " <br>", e += "</td>", e += "<td nowrap>", e += "<div>", e += ' Score: <span class="changeReceived">' + roundNumber($("#gNum").val(), 2) + "</span>", e += "</div>", e += '<span class="changeReceived">' + roundNumber($("#gNum").val(), 2) + '</span> / <span class="changeTotal">' + roundNumber($("#gDen").val(), 2) + '</span> = <span class="changeTotalPercent">' + roundNumber($("#gNum").val() / $("#gDen").val() * 100, 2) + "</span>%", e += "<br/><form class='form-inline'><div class='form-group'><input style='width: 60px; height: 25px;' class='form-control editReceived form-control-sm' value='" + roundNumber($("#gNum").val(), 2) + "' type='number'/> / <input style='width: 60px; height: 25px;' class='form-control editTotal form-control-sm' value='" + roundNumber($("#gDen").val(), 2) + "' type='number'/></div></form>", e += "</td>", e += '<td class="list_text">', e += '<div style="width: 125px;">Generated by <strong>Easy Loop</strong></div>', e += "</td>", $(".general_body").prepend(e), calculateFinalGrade()) : ($("#errorAlert").fadeIn().removeClass().addClass("alert-bs alert-bs-danger"), $("#error").html("Please fill all the fields."), $("#setAlert").addClass("danger"))
}), $(document).on("click", ".deleteRow", function (t) {
    t.preventDefault(), $(this).parent().parent().fadeOut(300, function () {
        $(this).remove(), calculateFinalGrade()
    })
});