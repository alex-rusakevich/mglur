const cookie_max_days = 10 * 365;

function loadCSS(file) {
    let url_prefix = document.querySelector("input[name='url_prefix']").value;

    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", `${url_prefix}/static/css/${file}`);
    document.getElementsByTagName("head")[0].appendChild(link)
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; samesite=strict";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setTheme(){
    if (getCookie('theme') == 'dark') {
        loadCSS("dark.css");
    } else {
        setCookie('theme', 'light', cookie_max_days);
        loadCSS("light.css");
    }
}

if(document.readyState === "interactive") {
    setTheme();
}
else {
    window.addEventListener("DOMContentLoaded", setTheme);
}
