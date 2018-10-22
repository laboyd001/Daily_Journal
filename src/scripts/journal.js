// Array of journal entries ---------------------------------------
// 10.22.18: removed the array and put it in entries.json
// -------------------------------------

// fetch to query data
fetch("http://localhost:3000/entries") // Fetch from the API
    .then((entry) => entry.json() )  // Parse as JSON
    .then(entries => {
        // What should happen when we finally have the array?
      
    


// Push journal entries to the DOM--------------------------------------

/*
  Purpose: To create, and return, a string template that
  represents a single journal entry object as HTML

  Arguments: journalEntry (object)
*/


const makeJournalEntryComponent = function(journalEntry) {
  // Create your own HTML structure for a journal entry
  return `
    <div class = "journalEntry">
     <h1>${journalEntry.concept}</h1>
     <h2>${journalEntry.date}</h2>
     <p>${journalEntry.entry}</p>
     <p>${journalEntry.mood}</p>
    </div>
  `
}

/*
    Purpose: To render all journal entries to the DOM
    Arguments: entries (array of objects)
*/
const renderJournalEntries = (entries) => {
  for(let i = 0; i < journalEntries.length; i++) {
    document.querySelector(".entryLog").innerHTML += makeJournalEntryComponent(entries[i]);
  }
}

// Invoke the render function
renderJournalEntries(journalEntries)

})