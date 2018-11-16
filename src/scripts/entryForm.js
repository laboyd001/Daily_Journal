
const journalFormManager = {
  journalHtmlForm: () => {
    return `
    
    <div class="questions">
    <fieldset id="date">
      <label for="journalDate">Date of Entry</label>
      <input type="date" name="journalDate" id="journalDate">
    </fieldset>
    <fieldset id="concept">
      <label for="conceptsCovered">Concepts Covered</label>
      <input type="text" name="conceptsCovered" id="conceptsCovered">
    </fieldset>
    <fieldset id="entry">
      <label for="journalEntry">Journal Entry</label>
      <textarea name="journalEntry" id="journalEntry" rows="20" cols="50">
            </textarea>
    </fieldset>
    <fieldset id="mood">
      <label for="dailyMood">Mood for the Day</label>
      <select id="dailyMood">
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Optimistic">Optimistic</option>
        <option value="Broken">Broken</option>
      </select>
    </fieldset>
  </div><br>

  <input id="record_button" type="button" value="Record Journal Entry"><br><br>

    
    `
  },
  journalClearForm: () => {
    document.querySelector("#journalDate").value = ""
    document.querySelector("#conceptsCovered").value = ""
    document.querySelector("#journalEntry").value = ""
  }
}

export default journalFormManager