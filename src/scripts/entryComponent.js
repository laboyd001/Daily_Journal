// contact
// This is code that creates the journal entry  HTML component



const makeJournalEntryComponent = (date, concept, entry, mood) => 

    // Create your own HTML structure for a journal entry
    `
<div class = "journalEntry">
    <h2>${concept}</h2>
    <h3>${date}</h3>
    <p>${entry}</p>
    <p>${mood}</p>
</div>
`

//export default makeJournalEntryComponent