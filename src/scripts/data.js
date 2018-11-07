
// contactCollection
// This JS file directs us to the data


const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/entries")
      .then(response => response.json())
      .then((entryData)=> entryData)
  },
 
   saveJournalEntry(entry){
  return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
    console.log("toSave", toSave)
    .then((data)=> data.json())
    .then(data => data)
    .catch(error => `Something happened ${error.message}`)
  }
}

// export default API