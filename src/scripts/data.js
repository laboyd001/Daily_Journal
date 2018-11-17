// contactCollection
// This JS file directs us to the data



const journalUrl = "http://localhost:8088/entries"
// getJournalEntries performs a "GET" fetch to the entries DB
const journalDataManager = {
  getJournalEntries: () => {
    return fetch(`${journalUrl}?_sort=date&_order=desc&_expand=mood`)
      // translate to javascript
      .then(journalData => journalData.json())
      .then( (entries) => {
        console.log("entries", entries)
      }
  },

  // saveJournalEntry performs a fetch "POST", .then converts data to javascript, .then hoists it up to be available for a later function
  saveJournalEntry: (entry) => {
    return fetch(`${journalUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
      })
      .then((journalData) => journalData.json())
  },

  deleteJournalEntry: (id) => {
    return fetch(`${journalUrl}/${id}`, {
      method: "DELETE"
    }).then(journalData => journalData.json())
  },

  journalEditEntry: (entry, id) => {
    return fetch(`${journalUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(journalData => journalData())
  },

  journalSingleEntry: (id) => {
    return fetch(`${journalUrl}/${id}`)
      .then(journalData => journalData())
  }
}


export default journalDataManager