/* Pure UI work */
function accessibility() {
    var nav_items = $('li.nav-item.icon-nav a');
    nav_items.attr("tabindex", "0");
    nav_items.attr("role", "button");

    var file_icon = $('img.file-icon');
    file_icon.attr("role", "button");
    file_icon.attr("tabindex", "0");
    file_icon.attr("alt", "З");
    file_icon.keyup(function (event) {
        event.preventDefault();

        if (event.which === 13 || event.which === 32) {
            $(this)[0].click();
        }
    });

    $('img[src="static/img/logo.png"]').attr('alt', 'Р');

    nav_items.keyup(function (event) {
        if (event.which === 13 || event.which == 32) {
            event.preventDefault();
            $(this)[0].click();
        }
    });

    $('img[src="static/img/close-button.svg"]').attr("alt", "X")
}

function minusRemover() {
    if ($(window).width() < 715.0) {
        $("p.time").each(function () {
            var prev_text = $(this).text();
            $(this).text(prev_text.replace(/ - /, "\n"));
        });
    } else {
        $("p.time").each(function () {
            var prev_text = $(this).text()
            $(this).text(prev_text.replace(/(?<=\d)\n(?=\d)/, " - "));
        });
    }
}

function scroll_nav_into_view() {
    $("button.nav-link").on("click", function () {
        this.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
        $(this).parent('ul').get(0)
    });
}

function bind_notepad() {
    $('img.file-icon').off().on('click', function (e) {
        alert(e.type);
    });
}

$('nav#date-panel').bind("DOMSubtreeModified", function () {
    scroll_nav_into_view();
    $('nav#date-panel button').on('shown.bs.tab', function (e) { // Change title on tab change
        $('span#title').text($(e.target).attr("schedule_data"));
    });

    bind_notepad();
    accessibility();
});

$("a.navbar-brand").click(function (e) { // Scroll to top when navbar is clicked
    e.preventDefault();
    $("div#content-panel").animate({ scrollTop: 0 }, "slow");
});

/* $('#menu-button').click(function () {
    /*
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
    

    if ($(this).css("transform") == 'none') {
        $(this).css("transform", "rotate(180deg)");
        $(this).css("-webkit-transform", "rotate(180deg)");
    } else {
        $(this).css("transform", "");
        $(this).css("-webkit-transform", "");
    }
}); */

$('select').focus(function () {
    $(this).closest('div').find('p.select-caption').css("color", "#026fd5");
});

$('select').blur(function () {
    if (getCookie("theme") == "dark") {
        $(this).closest('div').find('p.select-caption').css("color", "#9A9C9E");
    } else { // Light, etc.
        $(this).closest('div').find('p.select-caption').css("color", "#1E2323");
    }
});

/* Themes work */
document.addEventListener("DOMContentLoaded", function () {
    if (getCookie("theme") == "dark") {
        $("select#theme-select", this).html("<option value='dark' selected='selected'>Тёмная</option>" +
            "<option value='light'>Светлая</option>");
    } else if (getCookie("theme") == "light") {
        $("select#theme-select", this).html("<option value='dark'>Тёмная</option>" +
            "<option value='light' selected='selected'>Светлая</option>");
    } else {
        setCookie("theme", "dark", cookie_max_days);
        $("select#theme-select", this).html("<option value='dark' selected='selected'>Тёмная</option>" +
            "<option value='light'>Светлая</option>");
    }

    minusRemover();
    scroll_nav_into_view();
    bind_notepad();
    accessibility();
});

$('select#theme-select').on('change', function () {
    if (this.value == "dark") {
        setCookie("theme", "dark", cookie_max_days);
    } else if (this.value == "light") {
        setCookie("theme", "light", cookie_max_days);
    }
    window.location.reload();
});

if (getCookie('theme') == 'light') {
    $('div.bg-dark').removeClass('bg-dark');
}
/* ============================================== */

//Pull to refresh
const ptr = PullToRefresh.init({
    mainElement: '#content-panel',
    triggerElement: '#content-panel',

    shouldPullToRefresh: function () {
        return !this.mainElement.scrollTop;
    },

    distReload: 60,

    instructionsPullToRefresh: 'Потяните вниз, чтобы перезагрузить страницу',
    instructionsReleaseToRefresh: 'Отпустите, чтобы перезагрузить страницу',
    instructionsRefreshing: 'Перезагрузка',

    onRefresh() {
        window.location.reload();
    }
});

window.onresize = function () {
    minusRemover();
};
