import journalDataManager from "./data"
import journalFormManager from "./entryForm"
import journalDomRender from "./domRender"

const saveJournal = () => {
  document.querySelector("#record_button").addEventListener("click", () => {
    const date = document.querySelector("#journalFormDate").value
    const concept = document.querySelector("#conceptsCovered").value
    const entry = document.querySelector("#journalEntry").value
    const mood = document.querySelector("#dailyMood").value

    if (!journalDate || !journalConcept || !journalEntry || !journalMood) {
      alert("You missed a box")
    } else {
      document.querySelector("entryLog").innerHTML = ""
      const journalEntry = {
        date: date,
        concept: concept,
        entry: entry,
        mood: mood
      }
      journalDataManager.saveJournalEntry(journalEntry).then(() => {
        journalFormManager.journalClearForm()
        journalDomRender()
      })

    }
  })
}

export default saveJournal