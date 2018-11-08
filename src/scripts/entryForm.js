import API from "./data"

// class of Entry to construct the properties of the entry object for the database
class Entry {
  constructor(props) {
    this.concept = props.concept
    this.date = props.date
    this.entry = props.entry
    this.mood = props.mood
  }

  // the getter called entryInfo returns an obj with the specified values
  get entryInfo() {
    return {
      concept: this.concept,
      date: this.date,
      entry: this.entry,
      mood: this.mood
    }
  }

  // a save method declared below to post new entries to the DB
  save() {
    return API.saveJournalEntry(this.entryInfo)
  }
}

export default Entry