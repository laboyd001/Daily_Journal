// Array of journal entries ---------------------------------------
// 10.22.18: removed the array and put it in entries.json
// -------------------------------------

// 10.23.18: removed code that fetches DB and translates HTML into the DOM

// --------------------------------------


/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/
API.getJournalEntries().then(entries => renderJournalEntries(entries))

// In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.


let record = document.getElementById("record_button")
let dateEntry = document.getElementById("date")
let conceptEntry = document.getElementById("concept") 
let entryEntry = document.getElementById("entry")
let moodEntry = document.getElementById("mood")

record.addEventListener("click", saveJournalEntry)

function saveJournalEntry() {
let date = document.getElementById("journalDate").value
let concept = document.getElementById("conceptsCovered").value
let entry = document.getElementById("journalEntry").value
let mood = document.getElementById("dailyMood").value


let savedEntry = {
    date: date,
    concept: concept,
    entry: entry,
    mood: mood
}

fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(savedEntry)
  })

}