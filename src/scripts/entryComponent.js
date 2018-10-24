// This is code that creates the journal entry  HTML component

const container = document.querySelector(".entryLog")

const makeJournalEntryComponent = function(entry) {

        // Create your own HTML structure for a journal entry
        return `
<div class = "journalEntry">
<h1>${entry.concept}</h1>
<h2>${entry.date}</h2>
<p>${entry.entry}</p>
<p>${entry.mood}</p>
</div>
`
    }
