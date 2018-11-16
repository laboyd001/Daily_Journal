(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// contactCollection
// This JS file directs us to the data
const journalUrl = "http://localhost:8088/entries"; // getJournalEntries performs a "GET" fetch to the entries DB

const journalDataManager = {
  getJournalEntries: () => {
    return fetch(`${journalUrl}`) // translate to javascript
    .then(journalData => journalData.json());
  },
  // saveJournalEntry performs a fetch "POST", .then converts data to javascript, .then hoists it up to be available for a later function
  saveJournalEntry: entry => {
    return fetch(`${journalUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(journalData => journalData.json());
  },
  deleteJournalEntry: id => {
    return fetch(`${journalUrl}/${id}`, {
      method: "DELETE"
    }).then(journalData => journalData.json());
  },
  journalEditEntry: (entry, id) => {
    return fetch(`${journalUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(journalData => journalData());
  },
  journalSingleEntry: id => {
    return fetch(`${journalUrl}/${id}`).then(journalData => journalData());
  }
};
var _default = journalDataManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryHTML = _interopRequireDefault(require("./entryHTML"));

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const journalDOM = entry => {
  document.querySelector("#entryLog").innerHTML += entry;
};

const journalDomRender = () => {
  _data.default.getJournalEntries().then(entries => {
    entries.forEach(entry => {
      const journalEntryHTML = (0, _entryHTML.default)(entry);
      journalDOM(journalEntryHTML);
    });
  });
};

var _default = journalDomRender;
exports.default = _default;

},{"./data":1,"./entryHTML":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const journalFormManager = {
  journalHtmlForm: () => {
    return `
    
  <div class="questions">

    <div class="input-field">
      <h4>Date of Entry:</h4><br>
      <input type="text" class="datepicker" placeholder="Pick a Day" id="journalDate">
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

  <input id="record_button" type="button" value="Record Journal Entry"><br><br>

    
    `;
  },
  journalClearForm: () => {
    document.querySelector("#journalDate").value = "";
    document.querySelector("#conceptsCovered").value = "";
    document.querySelector("#journalEntry").value = "";
  }
};
var _default = journalFormManager;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// journalHTMLEntry is a HTML representaion of the data.  This is how we'd like to see it in the dom.
const journalHTMLEntry = entry => {
  return `
            <div class = "journalEntry">
                <h4>${entry.concept}</h4>
                <h5>Date: ${entry.date}</h5>
                <p>Entry: <br>${entry.entry}</p>
                <p>Mood Today: <br>${entry.mood}</p>
            </div><br> 
            `;
};

var _default = journalHTMLEntry;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryForm = _interopRequireDefault(require("./entryForm"));

var _domRender = _interopRequireDefault(require("./domRender"));

var _saveEntry = _interopRequireDefault(require("./saveEntry"));

var _moodFilter = _interopRequireDefault(require("./moodFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const journal = () => {
  document.querySelector("#journalForm").innerHTML = _entryForm.default.journalHtmlForm();
  document.querySelector("#moodFilter").innerHTML = (0, _moodFilter.default)();
  (0, _domRender.default)();
  (0, _saveEntry.default)();
};

var _default = journal;
exports.default = _default;

},{"./domRender":2,"./entryForm":3,"./moodFilter":7,"./saveEntry":8}],6:[function(require,module,exports){
"use strict";

var _journal = _interopRequireDefault(require("./journal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("hi");
(0, _journal.default)(); // Materialize
// calendar

const calendar = document.querySelector(".datepicker");
M.Datepicker.init(calendar, {
  format: "dddd mmm dd, yyyy"
}); //  textarea

$("#journalEntry").val();
M.textareaAutoResize($("#journalEntry")); //  select

$(document).ready(function () {
  $('select').formSelect();
});

},{"./journal":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
          `;
};

var _default = journalMoodFilter;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _entryForm = _interopRequireDefault(require("./entryForm"));

var _domRender = _interopRequireDefault(require("./domRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveJournal = () => {
  document.querySelector("#record_button").addEventListener("click", () => {
    const date = document.querySelector("#journalFormDate").value;
    const concept = document.querySelector("#conceptsCovered").value;
    const entry = document.querySelector("#journalEntry").value;
    const mood = document.querySelector("#dailyMood").value;

    if (!journalDate || !journalConcept || !journalEntry || !journalMood) {
      alert("You missed a box");
    } else {
      document.querySelector("entryLog").innerHTML = "";
      const journalEntry = {
        date: date,
        concept: concept,
        entry: entry,
        mood: mood
      };

      _data.default.saveJournalEntry(journalEntry).then(() => {
        _entryForm.default.journalClearForm();

        (0, _domRender.default)();
      });
    }
  });
};

var _default = saveJournal;
exports.default = _default;

},{"./data":1,"./domRender":2,"./entryForm":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbVJlbmRlci5qcyIsIi4uL3NjcmlwdHMvZW50cnlGb3JtLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUhUTUwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3NhdmVFbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFJQSxNQUFNLFVBQVUsR0FBRywrQkFBbkIsQyxDQUNBOztBQUNBLE1BQU0sa0JBQWtCLEdBQUc7QUFDekIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsVUFBVyxFQUFmLENBQUwsQ0FDTDtBQURLLEtBRUosSUFGSSxDQUVDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBWixFQUZoQixDQUFQO0FBR0QsR0FMd0I7QUFPekI7QUFDQSxFQUFBLGdCQUFnQixFQUFHLEtBQUQsSUFBVztBQUMzQixXQUFPLEtBQUssQ0FBRSxHQUFFLFVBQVcsRUFBZixFQUFrQjtBQUMxQixNQUFBLE1BQU0sRUFBRSxNQURrQjtBQUUxQixNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlCO0FBSzFCLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtBQUxvQixLQUFsQixDQUFMLENBT0osSUFQSSxDQU9FLFdBQUQsSUFBaUIsV0FBVyxDQUFDLElBQVosRUFQbEIsQ0FBUDtBQVFELEdBakJ3QjtBQW1CekIsRUFBQSxrQkFBa0IsRUFBRyxFQUFELElBQVE7QUFDMUIsV0FBTyxLQUFLLENBQUUsR0FBRSxVQUFXLElBQUcsRUFBRyxFQUFyQixFQUF3QjtBQUNsQyxNQUFBLE1BQU0sRUFBRTtBQUQwQixLQUF4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QUEsSUFBSSxFQUFFLElBRGE7QUFFbkIsUUFBQSxPQUFPLEVBQUUsT0FGVTtBQUduQixRQUFBLEtBQUssRUFBRSxLQUhZO0FBSW5CLFFBQUEsSUFBSSxFQUFFO0FBSmEsT0FBckI7O0FBTUEsb0JBQW1CLGdCQUFuQixDQUFvQyxZQUFwQyxFQUFrRCxJQUFsRCxDQUF1RCxNQUFNO0FBQzNELDJCQUFtQixnQkFBbkI7O0FBQ0E7QUFDRCxPQUhEO0FBS0Q7QUFDRixHQXRCRDtBQXVCRCxDQXhCRDs7ZUEwQmUsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGNvbnRhY3RDb2xsZWN0aW9uXHJcbi8vIFRoaXMgSlMgZmlsZSBkaXJlY3RzIHVzIHRvIHRoZSBkYXRhXHJcblxyXG5cclxuXHJcbmNvbnN0IGpvdXJuYWxVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCJcclxuLy8gZ2V0Sm91cm5hbEVudHJpZXMgcGVyZm9ybXMgYSBcIkdFVFwiIGZldGNoIHRvIHRoZSBlbnRyaWVzIERCXHJcbmNvbnN0IGpvdXJuYWxEYXRhTWFuYWdlciA9IHtcclxuICBnZXRKb3VybmFsRW50cmllczogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9YClcclxuICAgICAgLy8gdHJhbnNsYXRlIHRvIGphdmFzY3JpcHRcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIC8vIHNhdmVKb3VybmFsRW50cnkgcGVyZm9ybXMgYSBmZXRjaCBcIlBPU1RcIiwgLnRoZW4gY29udmVydHMgZGF0YSB0byBqYXZhc2NyaXB0LCAudGhlbiBob2lzdHMgaXQgdXAgdG8gYmUgYXZhaWxhYmxlIGZvciBhIGxhdGVyIGZ1bmN0aW9uXHJcbiAgc2F2ZUpvdXJuYWxFbnRyeTogKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChqb3VybmFsRGF0YSkgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZUpvdXJuYWxFbnRyeTogKGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH0vJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSkudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgam91cm5hbEVkaXRFbnRyeTogKGVudHJ5LCBpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeSlcclxuICAgIH0pLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9LFxyXG5cclxuICBqb3VybmFsU2luZ2xlRW50cnk6IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YClcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRGF0YU1hbmFnZXIiLCJpbXBvcnQgam91cm5hbEh0bWxFbnRyeSBmcm9tIFwiLi9lbnRyeUhUTUxcIlxyXG5pbXBvcnQgam91cm5hbERhdGFNYW5hZ2VyIGZyb20gXCIuL2RhdGFcIlxyXG5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsRE9NID0gKGVudHJ5KSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUxvZ1wiKS5pbm5lckhUTUwgKz0gZW50cnlcclxufVxyXG5cclxuY29uc3Qgam91cm5hbERvbVJlbmRlciA9ICgpID0+IHtcclxuICBqb3VybmFsRGF0YU1hbmFnZXIuZ2V0Sm91cm5hbEVudHJpZXMoKVxyXG4gIC50aGVuKGVudHJpZXMgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5SFRNTCA9IGpvdXJuYWxIdG1sRW50cnkgKGVudHJ5KVxyXG4gICAgICBqb3VybmFsRE9NKGpvdXJuYWxFbnRyeUhUTUwpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxEb21SZW5kZXIiLCJjb25zdCBqb3VybmFsRm9ybU1hbmFnZXIgPSB7XHJcbiAgam91cm5hbEh0bWxGb3JtOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgXHJcbiAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uc1wiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxyXG4gICAgICA8aDQ+RGF0ZSBvZiBFbnRyeTo8L2g0Pjxicj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJkYXRlcGlja2VyXCIgcGxhY2Vob2xkZXI9XCJQaWNrIGEgRGF5XCIgaWQ9XCJqb3VybmFsRGF0ZVwiPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XHJcbiAgICAgIDxoND5Db25jZXB0cyBDb3ZlcmVkOjwvaDQ+PGJyPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkdpdmUgaXQgYSBUaXRsZVwiIGlkPVwiY29uY2VwdHNDb3ZlcmVkXCI+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cclxuICAgIDxoND5Kb3VybmFsIEVudHJ5OjwvaDQ+PGJyPlxyXG4gICAgICA8dGV4dGFyZWEgaWQ9XCJqb3VybmFsRW50cnlcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCIgcm93cz1cIjIwXCIgY29scz1cIjUwXCI+XHJcbiAgICAgIDwvdGV4dGFyZWE+IFxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cclxuICAgIDxoND5Zb3VyIE1vb2Q6PC9oND48YnI+XHJcbiAgICAgIDxzZWxlY3QgaWQ9XCJkYWlseU1vb2RcIj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhhcHB5XCI+SGFwcHk8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2FkXCI+U2FkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk9wdGltaXN0aWNcIj5PcHRpbWlzdGljPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkJyb2tlblwiPkJyb2tlbjwvb3B0aW9uPlxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG4gIDxicj5cclxuXHJcbiAgPGlucHV0IGlkPVwicmVjb3JkX2J1dHRvblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlJlY29yZCBKb3VybmFsIEVudHJ5XCI+PGJyPjxicj5cclxuXHJcbiAgICBcclxuICAgIGBcclxuICB9LFxyXG4gIGpvdXJuYWxDbGVhckZvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5XCIpLnZhbHVlID0gXCJcIlxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEZvcm1NYW5hZ2VyIiwiLy8gam91cm5hbEhUTUxFbnRyeSBpcyBhIEhUTUwgcmVwcmVzZW50YWlvbiBvZiB0aGUgZGF0YS4gIFRoaXMgaXMgaG93IHdlJ2QgbGlrZSB0byBzZWUgaXQgaW4gdGhlIGRvbS5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsSFRNTEVudHJ5ID0gKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJqb3VybmFsRW50cnlcIj5cclxuICAgICAgICAgICAgICAgIDxoND4ke2VudHJ5LmNvbmNlcHR9PC9oND5cclxuICAgICAgICAgICAgICAgIDxoNT5EYXRlOiAke2VudHJ5LmRhdGV9PC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPkVudHJ5OiA8YnI+JHtlbnRyeS5lbnRyeX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Nb29kIFRvZGF5OiA8YnI+JHtlbnRyeS5tb29kfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+PGJyPiBcclxuICAgICAgICAgICAgYFxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxIVE1MRW50cnkiLCJpbXBvcnQgam91cm5hbEZvcm1NYW5hZ2VyIGZyb20gXCIuL2VudHJ5Rm9ybVwiXG5pbXBvcnQgam91cm5hbERvbVJlbmRlciBmcm9tIFwiLi9kb21SZW5kZXJcIlxuaW1wb3J0IHNhdmVKb3VybmFsIGZyb20gXCIuL3NhdmVFbnRyeVwiXG5pbXBvcnQgam91cm5hbE1vb2RGaWx0ZXIgZnJvbSBcIi4vbW9vZEZpbHRlclwiO1xuXG5cbmNvbnN0IGpvdXJuYWwgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1cIikuaW5uZXJIVE1MID0gam91cm5hbEZvcm1NYW5hZ2VyLmpvdXJuYWxIdG1sRm9ybSgpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZEZpbHRlclwiKS5pbm5lckhUTUwgPSBqb3VybmFsTW9vZEZpbHRlcigpXG4gIGpvdXJuYWxEb21SZW5kZXIoKVxuICBzYXZlSm91cm5hbCgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWwiLCJjb25zb2xlLmxvZyhcImhpXCIpXHJcblxyXG5pbXBvcnQgam91cm5hbCBmcm9tIFwiLi9qb3VybmFsXCJcclxuXHJcbmpvdXJuYWwoKVxyXG5cclxuLy8gTWF0ZXJpYWxpemVcclxuXHJcbi8vIGNhbGVuZGFyXHJcbmNvbnN0IGNhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlcGlja2VyXCIpXHJcbiBNLkRhdGVwaWNrZXIuaW5pdChjYWxlbmRhcix7XHJcbiAgIGZvcm1hdDogXCJkZGRkIG1tbSBkZCwgeXl5eVwiXHJcbiB9KTtcclxuXHJcblxyXG4vLyAgdGV4dGFyZWFcclxuICQoXCIjam91cm5hbEVudHJ5XCIpLnZhbCgpO1xyXG4gTS50ZXh0YXJlYUF1dG9SZXNpemUoJChcIiNqb3VybmFsRW50cnlcIikpXHJcblxyXG4vLyAgc2VsZWN0XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgJCgnc2VsZWN0JykuZm9ybVNlbGVjdCgpO1xyXG59KTtcclxuIiwiY29uc3Qgam91cm5hbE1vb2RGaWx0ZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGBcclxuICA8bGVnZW5kPkZpbHRlciBKb3VybmFsIEVudHJpZXMgYnkgTW9vZDwvbGVnZW5kPlxyXG4gIDxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiaGFwcHlcIiBuYW1lPVwibW9vZFwiIHZhbHVlPVwiaGFwcHlcIiAvPlxyXG4gIDxsYWJlbCBmb3I9XCJoYXBweVwiPkhhcHB5PC9sYWJlbD5cclxuPC9kaXY+XHJcblxyXG48ZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInNhZFwiIG5hbWU9XCJtb29kXCIgdmFsdWU9XCJzYWRcIiBjaGVja2VkIC8+XHJcbiAgPGxhYmVsIGZvcj1cInNhZFwiPlNhZDwvbGFiZWw+XHJcbjwvZGl2PlxyXG5cclxuPGRpdj5cclxuICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJvcHRpbWlzdGljXCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cIm9wdGltaXN0aWNcIiAvPlxyXG4gIDxsYWJlbCBmb3I9XCJvcHRpbWlzdGljXCI+T3B0aW1pc3RpYzwvbGFiZWw+XHJcbjwvZGl2PlxyXG5cclxuPGRpdj5cclxuICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJicm9rZW5cIiBuYW1lPVwibW9vZFwiIHZhbHVlPVwiYnJva2VuXCIgLz5cclxuICA8bGFiZWwgZm9yPVwiYnJva2VuXCI+QnJva2VuPC9sYWJlbD5cclxuPC9kaXY+IFxyXG4gICAgICAgICAgYFxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxNb29kRmlsdGVyIiwiaW1wb3J0IGpvdXJuYWxEYXRhTWFuYWdlciBmcm9tIFwiLi9kYXRhXCJcclxuaW1wb3J0IGpvdXJuYWxGb3JtTWFuYWdlciBmcm9tIFwiLi9lbnRyeUZvcm1cIlxyXG5pbXBvcnQgam91cm5hbERvbVJlbmRlciBmcm9tIFwiLi9kb21SZW5kZXJcIlxyXG5cclxuY29uc3Qgc2F2ZUpvdXJuYWwgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWNvcmRfYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRm9ybURhdGVcIikudmFsdWVcclxuICAgIGNvbnN0IGNvbmNlcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZVxyXG4gICAgY29uc3QgZW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZVxyXG4gICAgY29uc3QgbW9vZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGFpbHlNb29kXCIpLnZhbHVlXHJcblxyXG4gICAgaWYgKCFqb3VybmFsRGF0ZSB8fCAham91cm5hbENvbmNlcHQgfHwgIWpvdXJuYWxFbnRyeSB8fCAham91cm5hbE1vb2QpIHtcclxuICAgICAgYWxlcnQoXCJZb3UgbWlzc2VkIGEgYm94XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZW50cnlMb2dcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICBjb25zdCBqb3VybmFsRW50cnkgPSB7XHJcbiAgICAgICAgZGF0ZTogZGF0ZSxcclxuICAgICAgICBjb25jZXB0OiBjb25jZXB0LFxyXG4gICAgICAgIGVudHJ5OiBlbnRyeSxcclxuICAgICAgICBtb29kOiBtb29kXHJcbiAgICAgIH1cclxuICAgICAgam91cm5hbERhdGFNYW5hZ2VyLnNhdmVKb3VybmFsRW50cnkoam91cm5hbEVudHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgICBqb3VybmFsRm9ybU1hbmFnZXIuam91cm5hbENsZWFyRm9ybSgpXHJcbiAgICAgICAgam91cm5hbERvbVJlbmRlcigpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNhdmVKb3VybmFsIl19
