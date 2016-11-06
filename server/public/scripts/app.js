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


var classObject;
var classmateNumberTracker = 0;

$(document).ready(function(){
  displayFirstObject();
  getClassObject();
  $('#next').on('click', nextClick);
  $('#prev').on('click', prevClick);


    //Move to next classmate when next button is clicked
    function nextClick() {
      $('#object-container').empty();
      classmateNumberTracker++;
      if (classmateNumberTracker > classObject.sigmanauts.length - 1) {
        classmateNumberTracker = 0;
      }
      appendClassmate();
    }
    //Move to previous classmate when previous button is clicked
    function prevClick() {
      $('#object-container').empty();
      classmateNumberTracker--;
      if (classmateNumberTracker < 0) {
        classmateNumberTracker = classObject.sigmanauts.length - 1;
      }
      appendClassmate();
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
          $('#object-container').append('<h3>' + data.sigmanauts[classmateNumberTracker].name + ' - ' + 'Git Username: ' +  data.sigmanauts[classmateNumberTracker].git_username + '</h3>');
          $('#object-container').append('<p>' + data.sigmanauts[classmateNumberTracker].shoutout + '</p>');
        }
      });
    }
    //Append classmates upon click of next or previous
    function appendClassmate() {
      $('#object-container').append('<h3>' + classObject.sigmanauts[classmateNumberTracker].name + ' - ' + 'Git Username: ' +  classObject.sigmanauts[classmateNumberTracker].git_username + '</h3>');
      $('#object-container').append('<p>' + classObject.sigmanauts[classmateNumberTracker].shoutout + '</p>');
    }
});
