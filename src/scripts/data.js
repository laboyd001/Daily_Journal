// contactCollection
// This JS file directs us to the data


export default {

  // getJournalEntries performs a "GET" fetch to the entries DB
  getJournalEntries() {
    return fetch("http://localhost:8088/entries")
      // translate to javascript
      .then(response => response.json())
      // .then below to get data later
      .then((entryData) => entryData)
  },

  // saveJournalEntry performs a fetch "POST", .then converts data to javascript, .then hoists it up to be available for a later function
  saveJournalEntry(entry) {
    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
      })
      .then((data) => data.json())
      .then(data => data)
      .catch(error => `Something happened ${error.message}`)
  }
}