// contactList
// This JS file holds code that modifies the DOM

// import API from "./data"
// import makeJournalEntryComponent from "./entryComponent"

const container = document.getElementById("entryLog")

const renderJournalEntries =(entryArr) => {
  container.innerHTML = ""
  entryArr.forEach(function(entry)  {
    let entryComponent
    entryComponent = makeJournalEntryComponent(entry.date, entry.concept, entry.entry, entry.mood)
    container.innerHTML += entryComponent
  });
}

//  export default renderJournalEntries