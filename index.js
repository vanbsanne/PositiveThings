var positive1 = document.querySelector('#input1');
var positive2 = document.querySelector('#input2');
var positive3 = document.querySelector('#input3');

var saveButton = document.querySelector('#saveButton');
var forwardButton = document.querySelector('#forwardButton');
var backButton = document.querySelector('#backButton');

const key = 'days';

var daysList = loadDaysList();

var currentDay = 0;

function save() {
    // Get positives fromtext inputs
    let pos1 = positive1.value;
    let pos2 = positive2.value;
    let pos3 = positive3.value;

    // Save them as a day
    let day = {
        date: new Date().toISOString(),
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

    saveButtonDisabled();
}

function isTodayFilledIn() {
    //check if date is filled
    loadDaysList();
    let today = new Date().toLocaleDateString('nl-BE');

    for (let i = 0; i < daysList.length; i++) {
        let date = new Date(daysList[i].date).toLocaleDateString('nl-BE');
        if (date == today) {
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

function saveButtonDisabled() {
    if (isTodayFilledIn()) {
        saveButton.disabled = true;
    }
}

function backButtonDisabled(){
    var earliestDateString = daysList[0].date;
    var earliestDate = new Date(earliestDateString);
    let newDate = new Date();
    newDate = new Date(newDate.setDate(newDate.getDate() + (currentDay - 1)));

    if (daysList.length > 0) {
        if (newDate >= earliestDate) {
            backButton.disabled = false;
        } else {
            backButton.disabled = true;
        }
    }
}

function forwardButtonDisabled(){
    var furthestDateString = daysList[daysList.length - 1].date;
    var furthestDate = new Date(furthestDateString);
    console.log('furthestDate', furthestDate);
    let newDate = new Date();
    newDate = new Date(newDate.setDate(newDate.getDate() + (currentDay + 1)));

    console.log('newDate', newDate);
    if (daysList.length > 0) {
        if (newDate <= furthestDate) {
            forwardButton.disabled = false;
        } else {
            forwardButton.disabled = true;
        }
    }
}

function loadDaysList() {
    ensureListExists();
    daysList = JSON.parse(localStorage.getItem(key));
}

function goBack() {
    currentDay--;
    loadCurrentDate();
}

function goForward() {
    currentDay++;
    loadCurrentDate();
}

function buttonsDisabled(){
    saveButtonDisabled();
    forwardButtonDisabled();
    backButtonDisabled();
}

function loadCurrentDate() {
    // get date we want to view
    let newDate = new Date();
    newDate = new Date(newDate.setDate(newDate.getDate() + currentDay));

    // get that day from the list
    var day = daysList.filter((day) =>
        compareDates(new Date(day.date), newDate)
    )[0];

    positive1.value = day.pos1;
    positive2.value = day.pos2;
    positive3.value = day.pos3;
}

function compareDates(dateA, dateB) {
    return (
        dateA.toLocaleDateString('nl-BE') == dateB.toLocaleDateString('nl-BE')
    );
}

saveButton.addEventListener('click', save);
backButton.addEventListener('click', goBack);
forwardButton.addEventListener('click', goForward);
window.addEventListener('load', saveButtonDisabled);
document.addEventListener('click', buttonsDisabled);