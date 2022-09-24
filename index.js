var positive1 = document.querySelector('#input1');
var positive2 = document.querySelector('#input2');
var positive3 = document.querySelector('#input3');

var saveButton = document.querySelector('#saveButton');
var forwardButton = document.querySelector('#forwardButton');
var backButton = document.querySelector('#backButton');

function save() {
    // Get positives fromtext inputs
    let pos1 = positive1.value;
    let pos2 = positive2.value;
    let pos3 = positive3.value;

    // Save them as a day
    let day = {
        date: new Date().toLocaleString('nl-BE').split(' ')[0],
        pos1: pos1,
        pos2: pos2,
        pos3: pos3,
    };

    // Ensure list of previous days exists
    if (localStorage.getItem('days') == undefined) {
        let emptyList = [];
        let emptyJson = JSON.stringify(emptyList);
        localStorage.setItem('days', emptyJson);
    }

    // Get previous days
    let days = JSON.parse(localStorage.getItem('days'));

    // Add new day to list of days
    days.push(day);

    // Save new list of days
    let json = JSON.stringify(days);
    localStorage.setItem('days', json);
}

saveButton.addEventListener('click', save);
