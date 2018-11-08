// contactList
// This JS file holds code that modifies the DOM

// import API from "./data"
// import makeJournalEntryComponent from "./entryComponent"



const renderJournalEntries = () => {
  return API.getJournalEntries().then((entries) => entries.map(entry => entryComponent(entry)))
}

//  export default renderJournalEntries