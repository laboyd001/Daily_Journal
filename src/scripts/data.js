// This JS file directs us to the data

// old code-----------------------------------------
// // fetch to query data
// fetch("http://localhost:3000/entries") // Fetch from the API
//   .then((journalEntry) => journalEntry.json()) // Parse as JSON
// ---------------------------------------------------

const API = {
  getJournalEntries () {
      return fetch("http://localhost:3000/entries")
          .then(response => response.json())
  }
}