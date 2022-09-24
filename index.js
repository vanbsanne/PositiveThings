var positive1 = document.querySelector('#input1');
var positive2 = document.querySelector('#input2');
var positive3 = document.querySelector('#input3');

var saveButton = document.querySelector('#saveButton');
var forwardButton = document.querySelector('#forwardButton');
var backButton = document.querySelector('#backButton');

var daysList = loadDaysList();

const key = 'days';

function save() {
    // Get positives fromtext inputs
    let pos1 = positive1.value;
    let pos2 = positive2.value;
    let pos3 = positive3.value;

    // Save them as a day
    let day = {
        date: new Date().toLocaleDateString('nl-BE'),
        pos1: pos1,
        pos2: pos2,
        pos3: pos3,
    };

    ensureListExists();

    // Get previous days
    loadDaysList();

    // Add new day to list of days
    daysList.push(day);

    // Save new list of days
    let json = JSON.stringify(daysList);
    localStorage.setItem(key, json);

    buttonDisabled();
}

function isTodayFilledIn() {
    //check if date is filled
    loadDaysList();
    let today = new Date().toLocaleDateString('nl-BE');

    for (let i = 0; i < daysList.length; i++) {
        if (daysList[i].date == today) {
            return true;
        }
    }
    return false;
}

function ensureListExists() {
    //Ensure list of previous days exists
    if (localStorage.getItem(key) == undefined) {
        let emptyList = [];
        let emptyJson = JSON.stringify(emptyList);
        localStorage.setItem(key, emptyJson);
    }
}

function buttonDisabled() {
    if (isTodayFilledIn()) {
        saveButton.disabled = true;
    }
}

function loadDaysList(){
    ensureListExists();
    daysList = JSON.parse(localStorage.getItem(key));
}

saveButton.addEventListener('click', save);
window.addEventListener('load', buttonDisabled);