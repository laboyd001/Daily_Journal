// contactList
// This JS file holds code that modifies the DOM

// import API from "./data"
// import makeJournalEntryComponent from "./entryComponent"

const container = document.getElementById("entryLog")

// const renderJournalEntries = (entryArray) => {
//  entryArray.forEach(function (entry) {
//   let entryComponent;
//   entryComponent = makeJournalEntryComponent(entry.date, entry.concepts, entry.entry, entry.mood)
//   container.innerHTML += entryComponent

//  })

// }

function renderJournalEntries(entries) {
  container.innerHTML = ""
  entries.forEach(entry => {
    let entryComponent
    entryComponent = makeJournalEntryComponent(entry.date, entry.concepts, entry.entry, entry.mood)
    container.innerHTML += entryComponent
  });
}

//  export default renderJournalEntries