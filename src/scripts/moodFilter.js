const journalMoodFilter = () => {
  return `
  <legend>Filter Journal Entries by Mood</legend>
  <div>
  <input type="radio" id="happy" name="mood" value="happy" />
  <label for="happy">Happy</label>
</div>

<div>
  <input type="radio" id="sad" name="mood" value="sad" checked />
  <label for="sad">Sad</label>
</div>

<div>
  <input type="radio" id="optimistic" name="mood" value="optimistic" />
  <label for="optimistic">Optimistic</label>
</div>

<div>
  <input type="radio" id="broken" name="mood" value="broken" />
  <label for="broken">Broken</label>
</div> 
          `
}



export default journalMoodFilter