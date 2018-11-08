// contact
// This is code that creates the journal entry  HTML component



const makeJournalEntryComponent =
    (props) => {
        const entryComponent =

            // Create your own HTML structure for a journal entry
            `
            <div class = "journalEntry">
                <h2>${props.concept}</h2>
                <h3>${props.date}</h3>
                <p>${props.entry}</p>
                <p>${props.mood}</p>
            </div>
            `
        return entryComponent
    }

//export default makeJournalEntryComponent