// contactForm


// import API from "./data"

let dateEntry = document.getElementById("date")
let conceptEntry = document.getElementById("concept")
let entryEntry = document.getElementById("entry")
let moodEntry = document.getElementById("mood")



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
  


// export default saveJournalEntry