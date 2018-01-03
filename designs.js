// Select color input
var colorPicker = $("#colorPicker");
// Select size input
var inputHeight = $("#heightCounter");
var inputWidth = $("#widthCounter");
// When size is submitted by the user, call makeGrid()
var isRight = false;//checks if left or right mouse button
var isDown = false; // Tracks status of mouse button
var heightCounterVal = 35; //set grid height
var widthCounterVal = 35; //set grid width

//declaration for '+' sign funcionality - incrementing grid width/height
function addOnClick(counterType, selector) {
  counterType += 5; //increase ich row/column by 5
//max value limit
  if (counterType === 75) {
    alert("Max value is 70");
    counterType = 70;
  }
  selector.text(counterType); //update displayed value
  return counterType;
}
//declaration for '-' sign funcionality - decrementing grid width/height
function remOnClick(counterType, selector) {
  counterType -= 5;
//min value limit
  if (counterType === 0) {
    alert("Min value is 0");
    counterType = 5;
  }
  selector.text(counterType); //update displayed value
  return counterType;
}
/*********DRAW GRID DEFINITION*******/
function makeGrid() {
  var color = $("#colorPicker").val();
  var height = inputHeight.val();
  var width = inputWidth.val();
  var cell = $(".block");
  cell.remove(); //clear grid 
  for (var h = 0; h < heightCounterVal; h++) {
        $(".container").css("width", 7 * widthCounterVal + "px"); //set container's width: 5x5px div + 2x1px for border = 7px each * inserterd width val
    for (var w = 0; w < widthCounterVal; w++) {
      $('<div class="block"></div>').appendTo(".container"); //add clas for each div for styling
    }
  }
}

/*******INIT VALUES*******/
inputHeight.text(heightCounterVal); //init height 
inputWidth.text(widthCounterVal); //init width

/***** CUSTOM INPUTS *****/
//add 5 rows on each click
$("#input_height").on("click", function(evt) {
  evt.preventDefault();
  heightCounterVal = addOnClick(heightCounterVal, inputHeight);
});
//remove 5 rows on each click
$("#heightMinCount").on("click", function(evt) {
  evt.preventDefault();
  heightCounterVal = remOnClick(heightCounterVal, inputHeight);
});
//add 5 columns on each click
$("#input_width").on("click", function(evt) {
  evt.preventDefault();
  widthCounterVal = addOnClick(widthCounterVal, inputWidth);
});
//remove 5 columns on each click
$("#widthMinCount").on("click", function(evt) {
  evt.preventDefault();
  widthCounterVal = remOnClick(widthCounterVal, inputWidth);
});

//set event listener on "submit" button
$("#mkGrd").on("click", function(evt) {
  evt.preventDefault(); //don't reload page
  makeGrid(); //draw grid
  //set event listener on each grid's div
  //and listen if left mouse button is down
  $(".block").mousedown(function(evt) {
    isDown = true; //set flag
    if(evt.button === 2) {
      isRight = true; //set flag for right mouse button
      //remove context menu on right click
      $(this).contextmenu(function(){
          return false;
        });
      //set color to background
      $(this).css("background", "#262626");
    } else {
      //set div's color to selected one
      $(this).css("background", colorPicker.val());
    }
    
  });
  $(".block").mouseup(function() {
    isDown = false; //remove flag if mouseup
    isRight = false; //remove flag
  });
  $(".block").mouseover(function() {
    if (isDown) {
      if(isRight){
        $(this).contextmenu(function(){
          return false;
        });
        $(this).css("background", "#262626");
      } else {
        // Only change css if mouse is down
      $(this).css("background", colorPicker.val());
      }
    }
  });
});
