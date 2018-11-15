import journalHTMLEntry from "./entryHTML"
import journalDataManager from "./data"


// this function is returning a "GET" fetch and .then taking that data and mapping through all of the objects in the array to create entryComponent => a HTML representation of data
const journalDOM = (entry) => {
  document.querySelector("#").innerHTML += entry
}

const journalDomRender = () => {
  journalDataManager.getJournalEntries()
  .then(entries => {
    entries.forEach(entry => {
      const journalEntryHTML = journalHtmlEntry (entry)
      journalDOM(journalEntryHTML)
    })
  })
}

export default journalDomRender