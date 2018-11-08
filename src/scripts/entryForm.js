class Entry {
  constructor (props) {
    this.concept = props.concept
    this.date = props.date
    this.entry = props.entry
    this.mood = props.mood
  }

  get entryInfo() {
    return {concept:this.concept,  date:this.date,
      entry:this.entry,
      mood:this.mood
    }
  }

  save() {
    return API.saveJournalEntry(this.entryInfo)
  }
}