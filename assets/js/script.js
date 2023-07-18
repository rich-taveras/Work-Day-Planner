$(function () {
  // Get the current date and format it as "dddd, MMMM D"
  var currentDayTime = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDayTime);

  // Add a click event listener to all save buttons with the class "saveBtn"
  $(".saveBtn").on("click", function () {
    // Get the text area element and its corresponding hour
    var timeBlock = $(this).parent();
    var hour = timeBlock.attr("id").split("-")[1]; // Extract the hour from the id (e.g., "hour-9" -> "9")

    // Get the text content of the text area and save it to the local storage
    var textAreaContent = timeBlock.find("textarea").val();
    localStorage.setItem("hour-" + hour, textAreaContent);
  });

  // Load data from local storage and set it in the respective text areas
  for (let i = 9; i <= 17; i++) {
    var textAreaContent = localStorage.getItem("hour-" + i);
    if (textAreaContent) {
      $("#hour-" + i).find("textarea").val(textAreaContent);
    }
  }

  // Get the current hour
  var currentHour = dayjs().hour();

  // Compare the current hour with the hour of each time block and apply the appropriate class
  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]); // Extract the hour from the id (e.g., "hour-9" -> 9)
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
});
