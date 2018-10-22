// Array of journal entries ---------------------------------------

const journalEntries = [{
    date: "10/16/2018",
    concept: "Data Queries",
    entry: "The data practice has been a struggle.  I understand that we use loops to look through the data, but pinpointing where to look in the practice exercise was a real challenge.",
    mood: "broken"
  },
  {
    date: "10/17/2018",
    concept: "Building DOM Components",
    entry: "We learned how you can store data in JS and then run functions to display the data in the DOM with HTML.  I'm still a little fuzzy on the syntax.",
    mood: "happy"
  },
  {
    date: "10/18/2018",
    concept: "Building and Using an API",
    entry: "We learned how to build our own API and store data on .JSON servers.  This looked pretty cool.  I'm excited to tap into external APIs soon.",
    mood: "optimistic"
  }
]

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

