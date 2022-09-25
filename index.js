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

    buttonDisabled();
}

function isTodayFilledIn() {
    //check if date is filled
    loadDaysList();
    let today = new Date().toISOString();

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

    forwardButton.disabled = true;
}

function loadDaysList() {
    ensureListExists();
    daysList = JSON.parse(localStorage.getItem(key));
}

function goBack() {
    var earliestDateString = daysList[0].date;
    var earliestDate = new Date(earliestDateString);
    let newDate = new Date();
    newDate = new Date(newDate.setDate(newDate.getDate() + (currentDay - 1)));

    if (daysList.length > 0) {
        if (newDate >= earliestDate) {
            console.log('a');
            currentDay--;
            backButton.disabled = false;
            loadCurrentDate();
        } else {
            console.log('b');
            backButton.disabled = true;
        }
    }
}

function loadCurrentDate() {
    // get date we want to view
    let newDate = new Date();
    newDate = new Date(newDate.setDate(newDate.getDate() + currentDay));

    // get that day from the list
    var day = daysList.filter((day) =>
        compareDates(new Date(day.date), newDate)
    )[0];

    console.log('day');

    positive1.value = day.pos1;
    positive2.value = day.pos2;
    positive3.value = day.pos3;
}

function compareDates(dateA, dateB) {
    return (
        dateA.toLocaleDateString('nl-BE') == dateB.toLocaleDateString('nl-BE')
    );
}

//function goForward(){
//    currentDay++;
//}

saveButton.addEventListener('click', save);
backButton.addEventListener('click', goBack);
window.addEventListener('load', buttonDisabled);
