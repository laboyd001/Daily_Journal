// contact
// This is code that creates the journal entry  HTML component



const makeJournalEntryComponent =
    (entry) => {
const entryComponoent =

        // Create your own HTML structure for a journal entry
         `
<div class = "journalEntry">
    <h2>${entry.concept}</h2>
    <h3>${entry.date}</h3>
    <p>${entry.entry}</p>
    <p>${entry.mood}</p>
</div>
`
return entryComponoent
    }

//export default makeJournalEntryComponent