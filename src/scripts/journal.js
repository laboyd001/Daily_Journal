/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

*/
console.log("howdy")
renderJournalEntries()
.then(entryList => entryRender("entryLog", entryList))

// In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

$("#record_button").click(() => {
  const entry = new Entry({

    date: $("#journalDate").val(),
    concept: $("#conceptsCovered").val(),
    entry: $("#journalEntry").val(),
    mood: $("dailyMood").val()
  })

  entry.save()
    .then((data) => {
      console.log("new entry saved", data)
      return getJournalEntries()
    })
    .then(entryList => entryRender("entryLog", entryList))
})





// ===========================

// let radios = document.getElementById("moodFilter")



// console.log(radios.elements["mood"].value)

// radios.addEventListener('click', happy)

// const happy = (() => {
//   if(radios.value === "happy") {
//     console.log("I'm happy")
//   }
// })

// const sad = (() => {
//   if(radios.value === "sad") {
//     console.log("I'm sad")
//   }
// })