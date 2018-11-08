import Entry from "./entryForm"
import getEntries from "./entriesDOM"
import render from "./entryRender"


// post previously saved entries to dom on page load
getEntries()
  .then(entryList => render("entryLog", entryList))



// add click event to record button then create obj on click, perform "save" method on new entry, then take a snapshot of the updated database and post to dom
$("#record_button").click(() => {
  const entry = new Entry({

    date: $("#journalDate").val(),
    concept: $("#conceptsCovered").val(),
    entry: $("#journalEntry").val(),
    mood: $("#dailyMood").val()
  })

  entry.save()
    .then((data) => {
      console.log("new entry saved", data)
      return getEntries()
    })
    .then(entryList => render("entryLog", entryList))
  $("#journalDate").val("")
  $("#conceptsCovered").val("")
  $("#journalEntry").val("")
  $("#dailyMood").val("")
})