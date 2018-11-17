const journalFormManager = {
  journalHtmlForm: () => {
    return `
    
  <div class="questions">

    <div class="input-field">
      <h4>Date of Entry:</h4><br>
      <input type="text" class="datepicker" placeholder="Pick a Day" id="journalFormDate">
    </div>

    <div class="input-field">
      <h4>Concepts Covered:</h4><br>
      <input type="text" placeholder="Give it a Title" id="conceptsCovered">
    </div>

    <div class="input-field">
    <h4>Journal Entry:</h4><br>
      <textarea id="journalEntry" class="materialize-textarea" rows="20" cols="50">
      </textarea> 
    </div>

    <div class="input-field col s12">
    <h4>Your Mood:</h4><br>
      <select id="dailyMood">
        <option value="" disabled selected></option>
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Optimistic">Optimistic</option>
        <option value="Broken">Broken</option>
      </select>
      </div>

  </div>
  <br>

  <button id="record_button" class="btn waves-effect waves-light" type="submit" name="action">SUBMIT
  <i class="material-icons right"></i>
  </button><br><br>

    
    `
  },
  journalClearForm: () => {
    document.querySelector("#journalFormDate").value = ""
    document.querySelector("#conceptsCovered").value = ""
    document.querySelector("#journalEntry").value = ""
    document.querySelector("#dailyMood").value = ""

  }
}

export default journalFormManager