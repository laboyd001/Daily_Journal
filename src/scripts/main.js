console.log("hi")

import journal from "./journal"

journal()

// Materialize

// calendar
const calendar = document.querySelector(".datepicker")
 M.Datepicker.init(calendar,{
   format: "dddd mmm dd, yyyy"
 });


//  textarea
 $("#journalEntry").val();
 M.textareaAutoResize($("#journalEntry"))

//  select
$(document).ready(function(){
  $('select').formSelect();
});
