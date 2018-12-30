var themes = {
        "Easy Loop": {
            name: "Easy Loop",
            background: "#167acd",
            navbarBackground: "#168ACD",
            navbarFont: "#FFF"
        },
        "Modern Light": {
            name: "Modern Light",
            background: "#FCFCFC",
            navbarBackground: "#F4F4F4",
            navbarFont: "#000"
        },
        "Modern Dark": {
            name: "Modern Dark",
            background: "#ABABAB",
            navbarBackground: "#424242",
            navbarFont: "#FFF"
        },
        "Sweet Maroon": {
            name: "Sweet Maroon",
            background: "#6F0202",
            navbarBackground: "#960000",
            navbarFont: "#FFF"
        },
        "Dollar Green": {
            name: "Dollar Green",
            background: "#008000",
            navbarBackground: "#2FB030",
            navbarFont: "#FFF"
        },
        "CHS Pride": {
            name: "CHS Pride",
            background: "#680100",
            navbarBackground: "#fcba00",
            navbarFont: "#FFF"
        }
    },
    themeSelect = "<div class='module'>";

function setLocalTheme() {
    var e = localStorage.getItem("theme");
    console.log(e), console.log(themes[e]), applyTheme(themes[e]), $('#themeSelect option[value="' + e + '"]').prop("selected", !0)
}

function applyTheme(e) {
    var o = e.background,
        a = e.navbarFont,
        n = e.navbarBackground;
    $("#container_header_top").css("background-color", n), $("#container_header_links").css("background-color", n), $("#public_site > ul > li > a").css("color", a), $("#public_site > ul > li").css("background-color", o), $("#container_header_top > div.float_l > a").css("background-color", n), $("#container_header_top > div.float_r > a").css("color", a), $("#container_header_top > div.float_r > a").hover(function () {
        $(this).css("background-color", n)
    }, function () {
        $(this).css("background-color", o)
    }), $("#container_header_top > div.float_r > a").css("border", "none"), $("#container_header_top > div.float_l > div.header_icons > a").css("background-color", o), $("#container_header_top > div.float_l > div.header_icons > a").css("height", "50px"), $("#container_header_top > div.float_l > div.header_icons > a").css("border-right", "1px solid " + o), $("#container_header_top > div.float_l > div.header_icons > a").css("color", a), $("#container_header_top > div.float_l > div.header_icons > a").hover(function () {
        $(this).css("background-color", n)
    }, function () {
        $(this).css("background-color", o)
    }), $("#employee > div:nth-child(2) > a").css("background-color", n), $("#employee > div:nth-child(2)").css("background-color", n), $("#employee").css("background-color", n), $("html, body").css("background-color", o), $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.portal_tab_cont.academics_cont > div").css("background-color", "#F4F4F4"), $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard > div").css("background-color", "#F4F4F4"), $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.dashboard").css("background-color", "#F4F4F4"), $("#container_content > div.content_margin > div.home_left > div:nth-child(1) > div.header_tabs.jsDashboard > ul > li > a").css("background-color", "#F4F4F4"), $(".module").css("background-color", "#F4F4F4"), $(".module_col").css("background-color", "#F4F4F4"), $("#container_content > div.content_margin > div.home_left > div:nth-child(3)").css("background-color", "#F4F4F4"), $(".cal_content_holder").css("background-color", "white")
}
themeSelect += "<h2>Choose Theme</h2>", themeSelect += "<div class='clear'></div>", themeSelect += "<div class='module_content'>", themeSelect += "<select id='themeSelect' style='width: 100%;' class='form-control'>", themeSelect += "<option value='default'>Choose Themes by Easy Loop (new!)</option>", themeSelect += "<option value='bar' disabled>----------</option>", Object.keys(themes).forEach(function (e) {
    themeSelect += "<option value='" + e + "'>" + e + "</option>"
}), themeSelect += "</select></div></div>", $(".module_col").prepend(themeSelect), $("#container_header_nav").prepend("<br/>"), null !== localStorage.getItem("theme") && "default" != localStorage.getItem("theme") && themes.hasOwnProperty(localStorage.getItem("theme")) && setLocalTheme(), $(document).on("change", "#themeSelect", function () {
    var e = $(this).val();
    "default" == e ? (localStorage.removeItem("theme"), location.reload()) : applyTheme(themes[e]), localStorage.setItem("theme", e)
});