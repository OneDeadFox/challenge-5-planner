// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

  //Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage.

  //Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?

  //Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.

  //Add code to display the current date in the header of the page.

$(function () {
  //Global Variables-------------------------------------------
  let hourBlocks = $('.time-block');
  let saveButtons = $('.saveBtn');
  let scheduleInput = $('.description');
  let firstLoad = localStorage.getItem('firstLoad');
  let todayDisplay = $('#currentDay');

  todayDisplay.text(dayjs());

  setTextValues();
  setRelativeColors();
  addQuote();

  //Click Event Listener---------------------------------------
  //listen for clicks on the save button
  hourBlocks.on('click', '.saveBtn', function(e){
    var hour = $(e.target).parent().attr('id');
    var inputActual = $(e.target).siblings('.description').val();
    
    localStorage.setItem(`${hour}`, inputActual);
    setTextValues();    
  });

  //Functions--------------------------------------------------
  //set text area value based on stored input
  function setTextValues(){
    $.each(hourBlocks, function(){
      $(this).children('.description').val(localStorage.getItem(`${$(this).attr('id')}`));
    });
  }

  //color formatting
  function setRelativeColors(){
    $.each(hourBlocks, function(){
      //I need to learn more about regEx
      var idString = $(this).attr('id').replace(/\D/g, "");
      var currentClass = $(this).attr('class');
      var hourActual = parseInt(idString);
      var hourCurrent = dayjs().format('H');

      if(hourActual - hourCurrent < 0){
        $(this).attr('class', `${currentClass} past `);
      } else if(hourActual - hourCurrent === 0){
        $(this).attr('class', `${currentClass} present`);
      } else if(hourActual - hourCurrent > 0){
        $(this).attr('class', `${currentClass} future`);
      }
    });
  }

  function addQuote(){
    var quote = ['The', 'best', 'laid', 'plans', 'of', 'mice', 'and', 'men'];
    var i = 0;

    if(firstLoad === null){
      $.each(hourBlocks, function(){
        $(this).children('.description').val(quote[i]);
        i++;
      });
      localStorage.setItem('firstLoad', 1);
    }
  }
});
