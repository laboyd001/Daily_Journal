
// contactCollection
// This JS file directs us to the data


const API = {
  getJournalEntries: function () {
    return fetch("http://localhost:8088/entries")
      .then(response => response.json())
  },
  postJournalEntries: function (toSave) {
   
  fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSave)
    })
    console.log("toSave", toSave)
  }
}

// export default API