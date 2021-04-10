
function getStartDate() {
    try {
        return Date.parse(document.getElementById('start_date_input').value)
    } catch (err) {
        createErrorDialog()
    }
}

function getEndDate() {
    try {
        return Date.parse(document.getElementById('end_date_input').value)
    } catch (err) {
        createErrorDialog()
    }
}

function getTypeDate() {
    return document.getElementById('radio_button_list_item_1').checked ? 0 : 1
}

function createDialog(id, options, setupFunc) {
    const dialog = document.getElementById(id);
    if (!dialog) {
        return false
    }

    let instance = M.Modal.init(dialog, options)

    if (setupFunc) {
        setupFunc(dialog, instance)
    }

    instance.open()

    return true
}

function createErrorDialog() {
    createDialog('date_error_dialog')
}

function start() {
    let startDate = getStartDate();
    const type = getTypeDate();

    if (!startDate.is().mon()) {
        startDate = startDate.last().mon()
    }

    let endDate = getEndDate().last().mon();
    if (!endDate.is().mon()) {
        endDate = endDate.last().mon()
    }

    const count = startDate.getElapsed(endDate) / 1000 / 3600 / 24 / 7;

    let text;

    if (count % 2 === 0) {
        text = type === 0 ? "Знаменатель" : "Числитель"
    } else {
        text = type === 1 ? "Знаменатель" : "Числитель"
    }

    createDialog('result_dialog', null, function(dialog, inst) {document.getElementById("result_dialog_text").innerHTML = text});
}


function setup() {

    let startDatePicker = document.getElementById('start_date_input');
    let endDatePicker = document.getElementById('end_date_input');

    let typeDatePicker1 = document.getElementById('radio_button_list_item_1');
    let typeDatePicker2 = document.getElementById('radio_button_list_item_2');

    const strCookie = document.cookie.split(';')
    console.log(strCookie)
    let cookies = {}
    for (tmp of strCookie) {
        let cur = tmp.split('=')
        cookies[cur[0].trim()] = cur[1]

    }

    console.log(cookies)
    if (cookies.savedStartDate) {
        startDatePicker.value = cookies.savedStartDate

    }
    if (cookies.savedTypeData) {
        if (cookies.savedTypeData === 'checked') {
            typeDatePicker1.checked = true
            typeDatePicker2.checked = false
        } else {
            typeDatePicker1.checked = false
            typeDatePicker2.checked = true
        }
    }

    M.Datepicker.init(
        startDatePicker,
        {format: "dd.mm.yyyy", autoClose: true, setDefaultDate: true, defaultDate: Date.parse(cookies.savedStartDate ? cookies.savedStartDate : "25.01.2021"), firstDay: 1, yearRange: 100}
        );


    M.Datepicker.init(
        endDatePicker,
        {format: "dd.mm.yyyy", autoClose: true, setDefaultDate: true, defaultDate: Date.today(), firstDay: 1, yearRange: 100}
    )

    startDatePicker.onchange = function (){
        console.log(12)
        document.cookie = "savedStartDate=" + startDatePicker.value
    }

    typeDatePicker2.onchange = typeDatePicker1.onchange = function() {
        console.log(12)
        document.cookie = "savedTypeData=" + (typeDatePicker1.checked ? "checked" : "not_checked")
    }




    // Set optimal background
    const backgrounds = new Map([[480, "data/background_480_320.jpg"],
        [720, "data/background_720_480.jpg"],
        [1080,"data/background_1080_720.jpg"],
        [1620, "data/background_1620_1080.jpg"],
        [2430, "data/background_2430_1620.jpg"]
    ])

    const width = window.outerWidth

    let found = null

    for (w of backgrounds.keys()) {
        if (width < w) {
            found = w;
            break
        }
    }

    let backUrl

    if (found) {
        backUrl = 'url(\'' + backgrounds.get(found) + '\')'
    } else {
        backUrl = 'url(\'data/background.jpg\')'
    }


    var css = 'body:before { background: ' + backUrl + 'center/cover no-repeat }';
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));

    document.body.appendChild(style);
}

window.onload = setup