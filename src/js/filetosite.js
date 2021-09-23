class WrongFileTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "WrongFileTypeError";
    }
}

var xls_windows_opened = 0;

$("#send-xls-file").click(function (ev) {
    var xls_file = $("#data-xls-file").prop("files")[0]
    xls_windows_opened += 1;
    try {
        XLS_to_JSON(xls_file);
    } catch (e) {
        switch (e.name) {
            case "WrongFileTypeError":
                alert("Неправильный тип файла. Это должен быть .xls-файл (Excel-файл старого формата).");
                break;
            default:
                alert('Во время обработки файла произошла ошибка. Пожалуйста, отправьте сообщение ниже разработчику по данным, указанным в разделе "Информация".\n\n' + e.name + ":" + e.message + "\n" + e.stack);
                break;
        }
    }

    $('#data-xls-modal').modal('hide');
});

function XLS_to_JSON(file_in, to_dom = true) {

    const short_facult_name = {
        "факультета Кит.яз.": "ФКЯиК",
        "факультета Меж.ком.": "ФМК"
    };

    function read_cell(wsh, cl) {
        var ret_cell = wsh[cl];
        var value = (ret_cell ? ret_cell.v : undefined);

        return value;
    }

    if (!file_in.name.match(/\.xls/)) {
        throw new WrongFileTypeError("Wrong file type, it must be an .xls (old Excel format) file");
    }

    var reader = new FileReader();

    reader.onload = function (e) {
        var json_result = {
            "info": {
                "date": null,

                "type": "student",
                "faculty": null,
                "group": null
            },
            "ПН": [],
            "ВТ": [],
            "СР": [],
            "ЧТ": [],
            "ПТ": [],
            "СБ": [],
            "ВС": []
        };

        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { "type": "array" });

        var worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Getting the day date and adding a new tab
        var rx_day = /(?<=\().*(?=\))/g;
        var date_str = read_cell(worksheet, "A1").match(rx_day);

        json_result["info"]["date"] = date_str[0];

        //Students schedule
        json_result["info"]["type"] = "student";
        json_result["info"]["faculty"] = short_facult_name[read_cell(worksheet, "A1").match(/(?<=, ).+(?= на)/g)];
        json_result["info"]["group"] = read_cell(worksheet, "C2").match(/.+(?= )/g)[0];

        var day = undefined;
        var last_str = "";
        var a_cell_count = 2;

        var prev_time = null;

        while (true) {
            a_cell_count += 1;
            prev_day = day;
            day = read_cell(worksheet, "A" + a_cell_count);
            var work_day = "";
            if (typeof (day) === "string") {
                last_str = day;
                work_day = day;
            } else {
                work_day = last_str;
            }

            if (last_str == "СБ" && day == undefined
                && read_cell(worksheet, "C" + a_cell_count) == undefined) {
                break;
            }

            // Adding lesson
            var time = "";
            if (read_cell(worksheet, "B" + a_cell_count)) {
                time = read_cell(worksheet, "B" + a_cell_count);
            }
            var name_n_type = "";
            var lesson_type = "";
            var lesson_name = "";

            if (read_cell(worksheet, "C" + a_cell_count)) {
                name_n_type = read_cell(worksheet, "C" + a_cell_count).split('\n')[0]
                lesson_type = name_n_type.match(/(?<=\,\s).*/)[0];
                lesson_name = name_n_type.match(/.*(?=,\s)/)[0];
            }
            var teacher_name = "";
            if (read_cell(worksheet, "C" + a_cell_count)) {
                teacher_name = read_cell(worksheet, "C" + a_cell_count).split('\n')[1];
            }
            var room = ""
            if (read_cell(worksheet, "D" + a_cell_count)) {
                room = read_cell(worksheet, "D" + a_cell_count).replace(/\s/, '');
            }

            time = time.replace(/-/, ' - ');

            if (time == "" && name_n_type == "" && lesson_type == "") {
                json_result[day] == [];
            } else {
                if (time == "") time = prev_time;
                else prev_time = time;

                var lesson = {
                    "time": time, "lesson_name": lesson_name, "lesson_type": lesson_type,
                    "teacher_name": teacher_name, "room": room
                };
                if (day === undefined) day = prev_day;
                json_result[day].push(lesson);
            }
        }

        if (to_dom) {
            JSON_to_DOM(json_result);
        }

        return json_result;
    }
    reader.readAsArrayBuffer(file_in);
}

function JSON_to_DOM(json_in) {
    days_from_short = {
        "ПН": "Понедельник",
        "ВТ": "Вторник",
        "СР": "Среда",
        "ЧТ": "Четверг",
        "ПТ": "Пятница",
        "СБ": "Суббота",
        "ВС": "Воскресенье"
    }

    //Students_str
    var data_str = json_in["info"]["faculty"] + " " + json_in["info"]["group"];

    var new_tab = '<li class="nav-item" role="presentation"> <button class="nav-link" type="' + json_in["info"]["type"]
        + '" schedule_data="' + data_str + '" id="xls-tab' + xls_windows_opened + '" data-bs-toggle="tab" data-bs-target="#content-xls'
        + xls_windows_opened
        + '" type="button" role="tab" aria-controls="home" aria-selected="true">'
        + json_in["info"]["date"] + '</button></li>';
    $("ul.nav.nav-tabs[role='tablist']").append(new_tab);

    new_tab = '<div class="tab-pane fade" id="content-xls' + xls_windows_opened + '" role="tabpanel" aria-labelledby="profile-tab"><div class="schedule container" id="xls-container"></div></div>';
    $("div.tab-content#content-panel").append(new_tab);

    for (let day_raw in json_in) {
        if (day_raw == "info") continue;
        var day = days_from_short[day_raw];

        $('div#xls-container').append('<div class="day" id="' + day + '">')
        $('div#content-xls' + xls_windows_opened + ' div.day#' + day).append('<div class="row day-title">' +
            '<div class="col-11">' +
            '    <p class="day-text">' + day + '</p>' +
            '</div>' +
            '<div class="col-1">' +
            '    <img src="static/img/file-icon.svg" class="icon-filter file-icon file-icon">' +
            '</div>' +
            '</div>');

        if (json_in[day_raw] == "") {
            $('div#content-xls' + xls_windows_opened + ' div.day#' + day).append('<div class="row lesson">' +
                '<div class="col-2">' +
                '    <p></p>' +
                '</div>' +
                '<div class="col-9">' +
                '    <p class="lesson-name">В этот день занятий нет</p>' +
                '    <p></p>' +
                '    </p>' +
                '    <p class="teacher"></p>' +
                '</div>' +
                '<div class="col-1 room">' +
                '    <p></p>' +
                '</div>' +
                '</div>' +
                '<hr class="les-sep">');
        } else {
            json_in[day_raw].forEach(function (lesson) {
                $('div#content-xls' + xls_windows_opened + ' div.day#' + day).append('<div class="row lesson">' +
                    '<div class="col-2">' +
                    '    <p>' + lesson["time"] + '</p>' +
                    '</div>' +
                    '<div class="col-9">' +
                    '    <p class="lesson-name">' + lesson["lesson_name"] + '</p>' +
                    '    <p>' + lesson["lesson_type"] + '</p>' +
                    '    </p>' +
                    '    <p class="teacher">' + lesson["teacher_name"] + '</p>' +
                    '</div>' +
                    '<div class="col-1 room">' +
                    '    <p>' + lesson["room"] + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<hr class="les-sep">');
            });
        }
    }

    $('.nav-tabs button.active').removeClass('active');
    $('span#title').text(data_str);
    $('ul.nav-tabs li:last-child button').tab('show');
}
