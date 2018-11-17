import journalHtmlEntry from "./entryHTML"
import journalDataManager from "./data"



const journalDOM = (entry) => {
  document.querySelector("#entryLog").innerHTML += entry
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