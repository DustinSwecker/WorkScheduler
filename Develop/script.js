//set up variables to grab the save button and the time blocks class and the time container

var saveButtonEl = document.getElementsByClassName("saveBtn");
var hourBlockEl = $('.time-block');
var timeContainer = $('#time-block-container');
var currentDayInHeader = $('#currentDay');

//set up empty array to grab the time-block ids
var idForTimeBlocks = [];

function getIdForTimeBlocks () {
  for (var i=0; i<hourBlockEl.length; i++) {
    idForTimeBlocks.push(hourBlockEl[i].id);
  }
}

function setTimeBlockFromLocalStorage () {
  
  for (var i = 0; i<idForTimeBlocks.length; i++) {
    var valueFromLocal = JSON.parse(localStorage.getItem(idForTimeBlocks[i]));
    var blocksId = hourBlockEl[i].children[1]
    blocksId.textContent = valueFromLocal;
  }
}

//setting up now variables with dayjs()

var now = dayjs().format('HH');
var nowCurrentDayFormat = dayjs().format('MM-DD-YYYY');

//functions to determine if past, present, or future

function ifPast () {
  for (var i=0; i<hourBlockEl.length; i++) {
    if (now-hourBlockEl[i].dataset.time>=1) 
    hourBlockEl[i].setAttribute("style", "background-color: #d3d3d3; color: white");
  }
};

function ifPresent() {
  for (var i=0; i<hourBlockEl.length; i++) {
    if (now-hourBlockEl[i].dataset.time >= 0 && now - hourBlockEl[i]<1) {
    hourBlockEl[i].setAttribute("style", "background-color: #ff6961; color: white");
    };
  }
};

function ifFuture() {
    for (var i=0; i<hourBlockEl.length; i++) {
      if (now-hourBlockEl[i].dataset.time<0 && now <hourBlockEl[i+1]) {
      hourBlockEl[i].setAttribute("style", "background-color: #77dd77; color: white");
      };
    }
  };

//wrap in jquery function to only load when the html elements have loaded

$(document).ready(function() {
ifPast();
ifPresent();
ifFuture();
getIdForTimeBlocks();
setTimeBlockFromLocalStorage();
});


//create the onclick event in the larger timeContainer and specifying the action to the 'saveBtn' element, then telling to store the value with the divID as the key, and the value of the divID as the value.

timeContainer.on('click', '.saveBtn', function(event) {

  var divId = event.target.parentElement.parentElement.id; //var to grab the id of the textarea connected to the saveBtn
  var divIdValue = event.target.parentElement.parentElement.children[1].value; //var to grab the user input inside the textarea of the saveBtn
  
  localStorage.setItem(divId, JSON.stringify(divIdValue));
});

//add current day to header
currentDayInHeader.text(nowCurrentDayFormat);
 