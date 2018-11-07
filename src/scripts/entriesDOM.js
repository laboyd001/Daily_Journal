// contactList
// This JS file holds code that modifies the DOM

// import API from "./data"
// import makeJournalEntryComponent from "./entryComponent"



const renderJournalEntries = {
  addRenderedEntry(entries) {
    let entry = ""
    entries.forEach((element) => {
      entry += makeJournalEntryComponent.construct(element)
    })
    return entry
  }
}

//  export default renderJournalEntries