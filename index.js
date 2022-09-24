var positive1 = document.querySelector('#input1');
var positive2 = document.querySelector('#input2');
var positive3 = document.querySelector('#input3');

var saveButton = document.querySelector('#saveButton');
var forwardButton = document.querySelector('#forwardButton');
var backButton = document.querySelector('#backButton');

const key = 'days';

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

    listEmpty();

    // Get previous days
    let days = JSON.parse(localStorage.getItem(key));

    // Add new day to list of days
    days.push(day);

    // Save new list of days
    let json = JSON.stringify(days);
    localStorage.setItem(key, json);
}

function checkDate() {
    //check if date is filled
    listEmpty();
    let json = localStorage.getItem(key); //get json
    let list = JSON.parse(json); //make it a list again
    let today = new Date().toLocaleString('nl-BE').split(' ')[0];

    for (let i = 0; i < list.length; i++) {
        if (list[i].date == today) {
            return true;
        }
    }
    return false;
}

function listEmpty() {
    //Ensure list of previous days exists
    if (localStorage.getItem(key) == undefined) {
        let emptyList = [];
        let emptyJson = JSON.stringify(emptyList);
        localStorage.setItem(key, emptyJson);
    }
}

function buttonEnabled() {
    if (checkDate() == true) {
        document.getElementById('saveButton').disabled = true;
    }
}

saveButton.addEventListener('click', save);
