
// contactCollection
// This JS file directs us to the data


const API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/entries")
      .then((response) => response.json())
  }
}

// export default API