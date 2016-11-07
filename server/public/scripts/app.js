// I created a new JSON data file and inside it you will find an array of objects. Each object, is each one of you!
//
// AJAX Request
//
// Your first task is to make an AJAX call from the client side app.js using the .ajax method. The AJAX call will be a GET request that accesses the /data URL. Upon success, it should bring the data back down.
//
// On the DOM
//
// On the DOM should be:
//
// One person's information
// A series of 22 (or the number of people in the data array) index points with the first person's index highlighted or called out in style differently than the others.
// A 'Next' button and a 'Previous' button
// Clicking on the Next button should navigate to the next person, clicking on the Previous button should navigate to the previous person. The highlighted index point should update also as you click through to other people.
// Person Display
//
// When a person is displayed, show their name, their Github link, and their piece of shoutout feedback. Only one person should be showcased at any given time.
//
// You will need to combine everything you learned this week to accomplish this task, and each of the challenges you have completed this week play a part in this task.
//
// Working Example
//
// Here is a similar example from Zeta so you can see the functionality. It's really ugly, however. The code is also minified (no cheating!):
//
// https://polar-ravine-37299.herokuapp.com/
//
// HARD MODE
// Include a fade out and fade in animation in-between transitioning people.
//
// PRO MODE
// Include a timer that moves to the next person if the user is not clicking on next or prev. If the user clicks on next or prev, the timer should be reset. The timer should transition between people every 10 seconds.


$(document).ready(function(){
  displayFirstObject();
  indicatorMaker();
  getClassObject();
  $('#next').on('click', nextClick);
  $('#prev').on('click', prevClick);
  $('#display-container').on('click', 'li', indexSelector);
  $('#display-container').on('mouseenter', 'li', initialGenerator);
  $('#display-container').on('mouseleave', 'li', removeInitials);
});


var classObject;
var classmateNumberTracker = 0;
var interval;

//Move to next classmate when next button is clicked
function nextClick() {
  universalClickHandler();
  classmateNumberTracker++;
  if (classmateNumberTracker > classObject.sigmanauts.length - 1) {
    classmateNumberTracker = 0;
    $('#indicatorNav').find('.active').removeClass('active');
    $('li').first().addClass('active');
  } else {
    $('#indicatorNav').find('.active').removeClass('active').next().addClass('active');
  }
  appendClassmate();
  $('p, h3').fadeIn('slow');
}
//Move to previous classmate when previous button is clicked
function prevClick() {
  universalClickHandler();
  classmateNumberTracker--;
  if (classmateNumberTracker < 0) {
    classmateNumberTracker = classObject.sigmanauts.length - 1;
    $('#indicatorNav').find('.active').removeClass('active');
    $('li').last().addClass('active');
  } else {
    $('#indicatorNav').find('.active').removeClass('active').prev().addClass('active');
  }
  appendClassmate();
  $('p, h3').fadeIn('slow');
}

//function that allows user to select and index from the carousel and move to that shoutout
function indexSelector() {
  universalClickHandler();
  classmateNumberTracker = $(this).data('index');
  appendClassmate();
  $('p, h3').fadeIn('slow');
  $('#indicatorNav').find('.active').removeClass('active')
  $(this).addClass('active');
}

//save information from JSON file into local variable
function getClassObject() {
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      classObject = data;
    }
  });
}

//Display first object from JSON file
function displayFirstObject() {
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      $('#display-container').append('<p>' + data.sigmanauts[classmateNumberTracker].shoutout + '</p>');
      $('#display-container').append('<h3>-' + data.sigmanauts[classmateNumberTracker].name + ' - ' + 'Git Username: ' +  data.sigmanauts[classmateNumberTracker].git_username + '</h3>');
      $('p, h3').fadeIn();
      interval = window.setInterval(nextClick, 10000)
    }
  });
}

//dynamically creates the index carousel depending on number of items in shoutout array
function indicatorMaker() {
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      var total = data.sigmanauts.length;
      $('#display-container').append('<ul id="indicatorNav"></ul>');
      for (var i = 0; i < total; i++) {
        $('#indicatorNav').append('<li></li>');
        $('li').last().data('index', i);
      }
      $('li').first().addClass("active");
    }
  });
}

//Append classmates upon click of next or previous
function appendClassmate() {
  $('#display-container').prepend('<h3>- ' + classObject.sigmanauts[classmateNumberTracker].name + ' - ' + 'Git Username: ' +  classObject.sigmanauts[classmateNumberTracker].git_username + '</h3>');
  $('#display-container').prepend('<p>' + classObject.sigmanauts[classmateNumberTracker].shoutout + '</p>');
}

//timer reset
function resetInterval() {
  clearInterval(interval);
}

//function which restarts timer and fades out current shoutout. Used on next, prev and indexSelector
function universalClickHandler() {
  resetInterval();
  interval = window.setInterval(nextClick, 10000)
  $('p, h3').fadeOut('slow');
  $('p, h3').remove();
}


// Gets initials for each classmate
function initialGenerator() {
  var index = $(this).data('index');
  var initials = classObject.sigmanauts[index].name.charAt(0);
    for (var i = 0; i < classObject.sigmanauts[index].name.length; i++) {
      if(classObject.sigmanauts[index].name.charAt(i) === " ") {
        initials += classObject.sigmanauts[index].name.charAt(i + 1);
      }
    }
  $(this).animate({height: '30px', width: '30px'});
  $(this).text(initials);
}

function removeInitials() {
  $(this).animate({height: '10px', width: '10px'});
  $(this).text("");

}
