
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
    M.Datepicker.init(
        document.getElementById('start_date_input'),
        {format: "dd.mm.yyyy", autoClose: true, setDefaultDate: true, defaultDate: Date.parse("25.01.2021"), firstDay: 1, yearRange: 100}
        );

    M.Datepicker.init(
        document.getElementById('end_date_input'),
        {format: "dd.mm.yyyy", autoClose: true, setDefaultDate: true, defaultDate: Date.today(), firstDay: 1, yearRange: 100}
    )
}

window.onload = setup