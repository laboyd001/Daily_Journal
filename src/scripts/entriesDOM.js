
// contactList
// This JS file holds code that modifies the DOM

// import API from "./data"
// import makeJournalEntryComponent from "./entryComponent"

let container = document.getElementById("entryLog")

function renderJournalEntries (entries) {
 entries.forEach((entry) => {
   let div = document.createElement("div")
   let entryContents = makeJournalEntryComponent(entry)
   div.innerHTML = entryContents
   container.appendChild(div);
 });
 }

 function clear() {
  container.innerHTML = ""
}

const getMoreEntries = () => {
  clear ()
  API.getJournalEntries().then(entries => renderJournalEntries(entries))
}

//  export default renderJournalEntries