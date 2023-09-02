var titleDate = document.getElementById("titleDate");

var positive1 = document.querySelector('#input1');
var positive2 = document.querySelector('#input2');
var positive3 = document.querySelector('#input3');

var saveButton = document.querySelector('#saveButton');
var forwardButton = document.querySelector('#forwardButton');
var backButton = document.querySelector('#backButton');

// const we use to retrieve our list of days
const key = 'days';

var currentDay = 0;

var sec = 1000;
var min = 60 * sec;
var hour = 60 * min;


function save() {
    // Get positives fromtext inputs
    let pos1 = positive1.value;
    let pos2 = positive2.value;
    let pos3 = positive3.value;
    let today = new Date();
    today.setDate(today.getDate()+currentDay);
    let currentDate = today.toISOString();

    // Save them as a day
    let day = {
        date: currentDate,
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

function isCurrentDateFilledIn() {
    loadDaysList();

    // Get currentDates date
    let today = new Date();
    today.setDate(today.getDate()+currentDay);
    let currentDate = today.toLocaleDateString('nl-BE');

    //check if currentDate's date is filled
    for (let i = 0; i < daysList.length; i++) {
        let date = new Date(daysList[i].date).toLocaleDateString('nl-BE');
        if (date == currentDate) {
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

function isListEmpty() {
    return daysList.length == 0;
}

function saveButtonDisabled() {
    if (isCurrentDateFilledIn()) {
        saveButton.disabled = true;
    } else{
        saveButton.disabled = false;
    }
}

// function backButtonDisabled() {
//     if (isListEmpty()) {
//         backButton.disabled = true;
//         return;
//     }

//     // get earliest date from list
//     var earliestDateString = daysList[0].date;
//     var earliestDate = new Date(earliestDateString);
//     earliestDate.setHours(0, 0, 0, 0); // set hours to 0 to compare only the date

//     // get date we would go to if we pressed button
//     let newDate = new Date();
//     newDate.setDate(newDate.getDate() + (currentDay - 1));
//     newDate.setHours(0, 0, 0, 0); // set hours to 0 to compare only the date

//     if (daysList.length > 0) {
//         if (newDate >= earliestDate) {
//             backButton.disabled = false;
//         } else {
//             backButton.disabled = true;
//         }
//     }
// }

function forwardButtonDisabled() {

    // get furthest date from list
    var furthestDate = new Date();
    furthestDate.setHours(0, 0, 0, 0); // set hours to 0 to compare only the date

    // get date we would go to if we pressed button
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + (currentDay + 1));
    newDate.setHours(0, 0, 0, 0); // set hours to 0 to compare only the date

    if (newDate <= furthestDate) {
        forwardButton.disabled = false;
    } else {
        forwardButton.disabled = true;
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

function buttonsDisabled() {
    saveButtonDisabled();
    forwardButtonDisabled();
    //backButtonDisabled();
}

function loadCurrentDate() {
    // if (isListEmpty()) {
    //     return;
    // }

    // get date we want to view
    let dateToShow = new Date();
    dateToShow.setDate(dateToShow.getDate() + currentDay);
    dateToShow.setHours(0, 0, 0, 0);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    // get that day from the list
    var day = daysList.filter((day) =>
        compareDates(new Date(day.date), dateToShow)
    )[0];

    if (dateToShow.getTime() == today.getTime()) {
        titleDate.innerText = "Today";
    }
    else if (dateToShow.getTime() == yesterday.getTime()) {
        titleDate.innerText = "Yesterday";
    }
    else {
        titleDate.innerText = formatDate(dateToShow);
    }

    if (day != undefined) {
        positive1.value = day.pos1;
        positive2.value = day.pos2;
        positive3.value = day.pos3;
    }
    else {
        positive1.value = "";
        positive2.value = "";
        positive3.value = "";
    }
}

function compareDates(dateA, dateB) {
    return (
        dateA.toLocaleDateString('nl-BE') == dateB.toLocaleDateString('nl-BE')
    );
}

function formatDate(date) {
    return date.toLocaleString('en-GB', {
        month: 'long', // "June"
        day: 'numeric', // "01"
        year: 'numeric' // "2019"
      });
}

loadDaysList();

saveButton.addEventListener('click', save);
backButton.addEventListener('click', goBack);
forwardButton.addEventListener('click', goForward);
window.addEventListener('load', buttonsDisabled);
document.addEventListener('click', buttonsDisabled);