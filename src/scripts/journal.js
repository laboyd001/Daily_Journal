/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

*/
const container = document.getElementById("entryLog")

let displayEntry = () => {
  container.innerHTML = ""
  API.getJournalEntries().then((newEntry) => {
    container.insertAdjacentHTML("beforeend", renderJournalEntries.addRenderedEntry(newEntry))
  })
}

displayEntry()

// In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

let record = document.getElementById("record_button")

record.addEventListener("click", () => {
  let date = document.getElementById("journalDate").value
  let concept = document.getElementById("conceptsCovered").value
  let entry = document.getElementById("journalEntry").value
  let mood = document.getElementById("dailyMood").value

  let savedEntry = {
    "date": date,
    "concept": concept,
    "entry": entry,
    "mood": mood
  }
  API.postJournalEntries(savedEntry()).then(() => {
    displayEntry()
  })
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