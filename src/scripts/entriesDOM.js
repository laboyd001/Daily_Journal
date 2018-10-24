// This JS file holds code that modifies the DOM

function renderJournalEntries(parsedEntries) {
 parsedEntries.forEach(entry => {
   container.innerHTML += makeJournalEntryComponent(entry);
 });
 }