import journalFormManager from "./entryForm"
import journalDomRender from "./domRender"
import saveJournal from "./saveEntry"
import journalMoodFilter from "./moodFilter";


const journal = () => {
  document.querySelector("#journalForm").innerHTML = journalFormManager.journalHtmlForm()
  document.querySelector("#moodFilter").innerHTML = journalMoodFilter()
  journalDomRender()
  saveJournal()
}

export default journal