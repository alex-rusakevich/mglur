/* Pure UI work */
$('nav#date-panel').bind("DOMSubtreeModified", function () {
    $('nav#date-panel button').on('shown.bs.tab', function (e) { // Change title on tab change
        $('span#title').text($(e.target).attr("schedule_data"));
    });
});

$("a.navbar-brand").click(function (e) { // Scroll to top when navbar is clicked
    e.preventDefault();
    $("div#content-panel").animate({ scrollTop: 0 }, "slow");
});

$('#menu-button').click(function () {
    /*
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
    */

    if ($(this).css("transform") == 'none') {
        $(this).css("transform", "rotate(180deg)");
        $(this).css("-webkit-transform", "rotate(180deg)");
    } else {
        $(this).css("transform", "");
        $(this).css("-webkit-transform", "");
    }
});

$('select').focus(function () {
    $(this).closest('div').find('p.select-caption').css("color", "#026fd5");
});

$('select').blur(function () {
    if (getCookie("theme") == "dark") {
        $(this).closest('div').find('p.select-caption').css("color", "#9A9C9E");
    } else if (getCookie("theme") == "light") {
        $(this).closest('div').find('p.select-caption').css("color", "#1E2323");
    } else {
        $(this).closest('div').find('p.select-caption').css("color", "#9A9C9E");
    }
});

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
