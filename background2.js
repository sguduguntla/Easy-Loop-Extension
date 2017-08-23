$("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">');

if (localStorage.getItem("gradesPublished") === null) {
    localStorage.setItem("gradesPublished", "false");
}

var jqueryDialog = '<div style="display: none;" class="animated fadeIn" id="dialog-confirm" title="Easy Loop">';
jqueryDialog += '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span><span id="myMessage">No grades published. Please wait until grades are entered into the gradebook.</span></p>';
jqueryDialog += '<div class="checkbox">';
jqueryDialog += '<label><input id="showMessage" type="checkbox" value="">Don\'t show this message again</label>';
jqueryDialog += '</div>'
jqueryDialog += '</div>';

$("body").prepend(jqueryDialog);

if ($(".label_light")) {
    if ($(".label_light").length != $(".student_row").length) { //label_light -> No Grades Published, student_row -> Grades published
        localStorage.setItem("gradesPublished", "true");
    }
} else {
    localStorage.setItem("gradesPublished", "true");
}

if (localStorage.getItem("gradesPublished") == "false") {
    $("#myMessage").html("Thanks for installing <a target='_blank' href='http://www.sriharshaguduguntla.com/easyloop'>Easy Loop</a>! There are currently no grades published. Please wait until grades are entered into the gradebook.");
} else {
    $("#myMessage").html("Thanks for installing <a target='_blank' href='http://www.sriharshaguduguntla.com/easyloop'>Easy Loop</a>! You have grades published. Please access one of your progress reports to begin. Don't know where it is? Click <a target='_blank' href='https://slhps-help-ca.schoolloop.com/progressreport'>here</a>.");
}

if (localStorage.getItem("showMessage") == "true" || localStorage.getItem("showMessage") === null) {
    $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            Close: function() {
                if ($("#showMessage").is(':checked')) {
                    localStorage.setItem("showMessage", "false");
                } else {
                    localStorage.setItem("showMessage", "true");
                }
                $(this).dialog("close");
            }
        }
    });
}

//Themes

$("#page_title").css("margin-top", "20px"); //Adjust Page Title to be a bit lower

var themeSelect = "<div class='module'>";
themeSelect += "<h2>Choose Theme</h2>";
themeSelect += "<div class='clear'></div>";
themeSelect += "<div class='module_content'>";
themeSelect += "<select id='themeSelect' style='width: 100%;' class='form-control'>";
themeSelect += "<option value='default'>Choose Themes by Easy Loop (new!)</option>";
themeSelect += "<option value='bar' disabled>----------</option>";
themeSelect += "<option value='theme4'>Easy Loop</option>";
themeSelect += "<option value='theme1'>Modern Light</option>";
themeSelect += "<option value='theme2'>Modern Dark</option>";
themeSelect += "<option value='theme3'>Sweet Maroon</option>";
themeSelect += "</select></div></div>";

$(".module_col").prepend(themeSelect);

$("#container_header_nav").prepend("<br/>");

if (localStorage.getItem("theme") !== null || localStorage.getItem("theme") != "default") {
    setLocalTheme();
}

function setLocalTheme() {
    var localTheme = localStorage.getItem("theme");

    if (localTheme == "theme1") {
        applyTheme1();
    } else if (localTheme == "theme2") {
        applyTheme2();
    } else if (localTheme == "theme3") {
        applyTheme3();
    } else if (localTheme == "theme4") {
        applyTheme4();
    }

    $('#themeSelect option[value=' + localTheme + ']').prop('selected', true);
}

$("#themeSelect").change(function() {

    var curVal = $(this).val();

    if (curVal == "theme1") {
        applyTheme1();
    } else if (curVal == "theme2") {
        applyTheme2();
    } else if (curVal == "theme3") {
        applyTheme3();
    } else if (curVal == "theme4") {
        applyTheme4();
    } else if (curVal == "default") {
        localStorage.removeItem("theme");
        location.reload();
    }

    localStorage.setItem("theme", curVal);
});

function applyTheme1() {
    var background = "#FCFCFC";
    var navbarFont = "#000";
    var lightGray = "#F4F4F4";
    var mediumGray = "#DFDEDE";
    var darkGray = "#BBB9B9";

    //Navbar
    $("#container_header_top").css("background-color", lightGray);
    $("#container_header_links").css("background-color", lightGray);
    $("#public_site > ul > li > a").css("color", navbarFont);
    $("#public_site > ul > li").css("background-color", mediumGray); //School Dropdown
    $("#container_header_top > div.float_l > a").css("background-color", darkGray); //Icon
    $("#container_header_top > div.float_r > a").css("color", navbarFont);

    $("#container_header_top > div.float_r > a").hover(function() {
        $(this).css("background-color", mediumGray);
    }, function() {
        $(this).css("background-color", lightGray);
    });

    $("#container_header_top > div.float_r > a").css("border", "none");

    $("#container_header_top > div.float_l > div.header_icons > a").css("background-color", mediumGray);
    $("#container_header_top > div.float_l > div.header_icons > a").css("height", "50px");
    $("#container_header_top > div.float_l > div.header_icons > a").css("border-right", "1px solid " + darkGray);
    $("#container_header_top > div.float_l > div.header_icons > a").css("color", navbarFont);

    $("#container_header_top > div.float_l > div.header_icons > a").hover(function() {
        $(this).css("background-color", darkGray);
    }, function() {
        $(this).css("background-color", mediumGray);
    });

    //Background
    $("html, body").css("background-color", background);

    //Grades Box
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.portal_tab_cont.academics_cont > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.header_tabs.jsDashboard > ul > li > a").css("background-color", lightGray);

    //News/Discussion on the right
    $(".module").css("background-color", lightGray);
    $(".module_col").css("background-color", lightGray);

    //Calendar
    $("#container_content > div.content_margin > div.home_left > div:nth-child(3)").css("background-color", lightGray);
    $(".cal_content_holder").css("background-color", "white");

}

function applyTheme2() {
    var background = "#ABABAB";
    var navbarFont = "#000";
    var lightGray = "#F4F4F4";
    var navbarBackground = "#424242";
    var mediumGray = "#DFDEDE";
    var darkGray = "#BBB9B9";

    //Navbar
    $("#container_header_top").css("background-color", navbarBackground);
    $("#container_header_links").css("background-color", navbarBackground);
    $("#public_site > ul > li > a").css("color", navbarFont);
    $("#public_site > ul > li").css("background-color", mediumGray); //School Dropdown
    $("#container_header_top > div.float_l > a").css("background-color", darkGray); //Icon
    $("#container_header_top > div.float_r > a").css("color", navbarFont);

    $("#container_header_top > div.float_r > a").hover(function() {
        $(this).css("background-color", mediumGray);
    }, function() {
        $(this).css("background-color", lightGray);
    });

    $("#container_header_top > div.float_r > a").css("border", "none");

    $("#container_header_top > div.float_l > div.header_icons > a").css("background-color", mediumGray);
    $("#container_header_top > div.float_l > div.header_icons > a").css("height", "50px");
    $("#container_header_top > div.float_l > div.header_icons > a").css("border-right", "1px solid " + darkGray);
    $("#container_header_top > div.float_l > div.header_icons > a").css("color", navbarFont);

    $("#container_header_top > div.float_l > div.header_icons > a").hover(function() {
        $(this).css("background-color", darkGray);
    }, function() {
        $(this).css("background-color", mediumGray);
    });

    //Background
    $("html, body").css("background-color", background);

    //Grades Box
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.portal_tab_cont.academics_cont > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.header_tabs.jsDashboard > ul > li > a").css("background-color", lightGray);

    //News/Discussion on the right
    $(".module").css("background-color", lightGray);
    $(".module_col").css("background-color", lightGray);

    //Calendar
    $("#container_content > div.content_margin > div.home_left > div:nth-child(3)").css("background-color", lightGray);
    $(".cal_content_holder").css("background-color", "white");

}

function applyTheme3() {
    var background = "#6F0202";
    var navbarFont = "#FFF";
    var lightGray = "#F4F4F4";
    var navbarBackground = "#960000";
    var mediumGray = "#DFDEDE";
    var darkGray = "#BBB9B9";

    //Navbar
    $("#container_header_top").css("background-color", navbarBackground);
    $("#container_header_links").css("background-color", navbarBackground);
    $("#public_site > ul > li > a").css("color", navbarFont);
    $("#public_site > ul > li").css("background-color", background); //School Dropdown
    $("#container_header_top > div.float_l > a").css("background-color", background); //Icon
    $("#container_header_top > div.float_r > a").css("color", navbarFont);

    $("#container_header_top > div.float_r > a").hover(function() {
        $(this).css("background-color", navbarBackground);
    }, function() {
        $(this).css("background-color", background);
    });

    $("#container_header_top > div.float_r > a").css("border", "none");

    $("#container_header_top > div.float_l > div.header_icons > a").css("background-color", background);
    $("#container_header_top > div.float_l > div.header_icons > a").css("height", "50px");
    $("#container_header_top > div.float_l > div.header_icons > a").css("border-right", "1px solid " + background);
    $("#container_header_top > div.float_l > div.header_icons > a").css("color", "#FFF");

    $("#container_header_top > div.float_l > div.header_icons > a").hover(function() {
        $(this).css("background-color", navbarBackground);
    }, function() {
        $(this).css("background-color", background);
    });

    $("#employee > div:nth-child(2) > a").css("background-color", navbarBackground);
    $("#employee > div:nth-child(2)").css("background-color", navbarBackground);
    $("#employee").css("background-color", navbarBackground);

    //Background
    $("html, body").css("background-color", background);

    //Grades Box
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.portal_tab_cont.academics_cont > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.header_tabs.jsDashboard > ul > li > a").css("background-color", lightGray);

    //News/Discussion on the right
    $(".module").css("background-color", lightGray);
    $(".module_col").css("background-color", lightGray);

    //Calendar
    $("#container_content > div.content_margin > div.home_left > div:nth-child(3)").css("background-color", lightGray);
    $(".cal_content_holder").css("background-color", "white");

}

function applyTheme4() {
    var background = "#167acd";
    var navbarFont = "#FFF";
    var lightGray = "#F4F4F4";
    var navbarBackground = "#168ACD";
    var mediumGray = "#DFDEDE";
    var darkGray = "#BBB9B9";

    //Navbar
    $("#container_header_top").css("background-color", navbarBackground);
    $("#container_header_links").css("background-color", navbarBackground);
    $("#public_site > ul > li > a").css("color", navbarFont);
    $("#public_site > ul > li").css("background-color", background); //School Dropdown
    $("#container_header_top > div.float_l > a").css("background-color", background); //Icon
    $("#container_header_top > div.float_r > a").css("color", navbarFont);

    $("#container_header_top > div.float_r > a").hover(function() {
        $(this).css("background-color", navbarBackground);
    }, function() {
        $(this).css("background-color", background);
    });

    $("#container_header_top > div.float_r > a").css("border", "none");

    $("#container_header_top > div.float_l > div.header_icons > a").css("background-color", background);
    $("#container_header_top > div.float_l > div.header_icons > a").css("height", "50px");
    $("#container_header_top > div.float_l > div.header_icons > a").css("border-right", "1px solid " + background);
    $("#container_header_top > div.float_l > div.header_icons > a").css("color", "#FFF");

    $("#container_header_top > div.float_l > div.header_icons > a").hover(function() {
        $(this).css("background-color", navbarBackground);
    }, function() {
        $(this).css("background-color", background);
    });

    $("#employee > div:nth-child(2) > a").css("background-color", navbarBackground);
    $("#employee > div:nth-child(2)").css("background-color", navbarBackground);
    $("#employee").css("background-color", navbarBackground);

    //Background
    $("html, body").css("background-color", background);

    //Grades Box
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.portal_tab_cont.academics_cont > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard > div").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard").css("background-color", lightGray);
    $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.header_tabs.jsDashboard > ul > li > a").css("background-color", lightGray);

    //News/Discussion on the right
    $(".module").css("background-color", lightGray);
    $(".module_col").css("background-color", lightGray);

    //Calendar
    $("#container_content > div.content_margin > div.home_left > div:nth-child(3)").css("background-color", lightGray);
    $(".cal_content_holder").css("background-color", "white");

}
