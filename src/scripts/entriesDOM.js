import entryComponent from "./entryHTML"
import API from "./data"


// this function is returning a "GET" fetch and .then taking that data and mapping through all of the objects in the array to create entryComponent => a HTML representation of data
export default () => {
  return API.getJournalEntries().then((entries) => entries.map(entry => entryComponent(entry)))
}