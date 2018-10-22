// Array of journal entries ---------------------------------------
// 10.22.18: removed the array and put it in entries.json
// -------------------------------------

// fetch to query data
fetch("http://localhost:3000/entries") // Fetch from the API
  .then((journalEntry) => journalEntry.json()) // Parse as JSON
  .then((parsedEntries) => {
    // What should happen when we finally have the array?

    parsedEntries.forEach((entry) => {


      // Push journal entries to the DOM--------------------------------------

      const makeJournalEntryComponent = function (journalEntry) {
        // Create your own HTML structure for a journal entry
        return `
    <div class = "journalEntry">
     <h1>${entry.concept}</h1>
     <h2>${entry.date}</h2>
     <p>${entry.entry}</p>
     <p>${entry.mood}</p>
    </div>
  `
      }
      document.querySelector(".entryLog").innerHTML += makeJournalEntryComponent(parsedEntries);
    })


  })