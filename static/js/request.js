function getCurrentWeekID() {
    return (Number(moment().format('W')) + Number(moment().year()) * 52) - 104554;
}

function c(html_in) {
    return "https://cors-anywhere.herokuapp.com/" + html_in
}

$('div select#faculty').on('change', async function (e) {
    // Set faculty
    await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.faculty:change"), {
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
            "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
            "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
            "X-Requested-With": "XMLHttpRequest",
            "X-Prototype-Version": "1.7",
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
        "body": "t%3Azoneid=studyGroupZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=" + this.value,
        "method": "POST",
        "mode": "cors"
    }).then(async function (resp) {
        if (this.value != 0) {
            // Set year
            await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.studyyears:change"), {
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                    "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
                    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-Prototype-Version": "1.7",
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
                "body": "t%3Azoneid=studyWeekZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=" + moment().year(),
                "method": "POST",
                "mode": "cors"
            }).then(async function (e) {
                // Set week
                await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.studyweeks:change"), {
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                        "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
                        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-Prototype-Version": "1.7",
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Pragma": "no-cache",
                        "Cache-Control": "no-cache"
                    },
                    "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
                    "body": "t%3Azoneid=buttonZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=" + getCurrentWeekID(),
                    "method": "POST",
                    "mode": "cors"
                });
            });
            $('select#course').prop('disabled', false);
        } else {
            $('select#course').prop('disabled', true);
            $('select#group').prop('disabled', true);
        }
    });
});

$('div select#course').on('change', async function (e) {
    if (this.value == "") {
        $('select#group').prop('disabled', true);
    } else {
        await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.printrank:change"), {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
                "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                "X-Requested-With": "XMLHttpRequest",
                "X-Prototype-Version": "1.7",
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
            "body": "t%3Azoneid=buttonZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=1",
            "method": "POST",
            "mode": "cors"
        });

        await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.printdegree:change"), {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
                "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                "X-Requested-With": "XMLHttpRequest",
                "X-Prototype-Version": "1.7",
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
            "body": "t%3Azoneid=buttonZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=1",
            "method": "POST",
            "mode": "cors"
        });

        await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.printnamesubject:change"), {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
                "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                "X-Requested-With": "XMLHttpRequest",
                "X-Prototype-Version": "1.7",
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
            "body": "t%3Azoneid=buttonZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=1",
            "method": "POST",
            "mode": "cors"
        });



        await fetch(c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport.course:change"), {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
                "Accept": "text/javascript, text/html, application/xml, text/xml, */*",
                "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                "X-Requested-With": "XMLHttpRequest",
                "X-Prototype-Version": "1.7",
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": c("http://raspisanie.mslu.by/schedule/reports/publicreports/schedulelistforgroupreport"),
            "body": "t%3Azoneid=studyWeekZone&t%3Aformid=printForm&t%3Aformcomponentid=reports%2Fpublicreports%2FScheduleListForGroupReport%3Aprintform&t%3Aselectvalue=" + this.value,
            "method": "POST",
            "mode": "cors"
        }).then(function (resp) {
            $('select#group').html(JSON.stringify(resp).match(/<option value=''>(.|\n)*(?=<input)/));
            $('select#group').prop('disabled', false);
        });
    }
});
