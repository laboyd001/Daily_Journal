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
    return fetch(`${journalUrl}?_sort=date&_order=desc&_expand=mood`) // translate to javascript
    .then(journalData => journalData.json()).then(journalData => journalData.reverse());
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

    
    `;
  },
  journalClearForm: () => {
    document.querySelector("#journalFormDate").value = "";
    document.querySelector("#conceptsCovered").value = "";
    document.querySelector("#journalEntry").value = "";
    document.querySelector("#dailyMood").value = "";
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
            </div><br> 
            `;
};

var _default = journalHTMLEntry;
/* <p>Mood Today: <br>${entry.mood.label}</p> */

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

    if (!date || !concept || !entry || !mood) {
      alert("You missed a box");
    } else {
      document.querySelector("#entryLog").innerHTML = "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbVJlbmRlci5qcyIsIi4uL3NjcmlwdHMvZW50cnlGb3JtLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUhUTUwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3NhdmVFbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFJQSxNQUFNLFVBQVUsR0FBRywrQkFBbkIsQyxDQUNBOztBQUNBLE1BQU0sa0JBQWtCLEdBQUc7QUFDekIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsVUFBVyxzQ0FBZixDQUFMLENBQ0w7QUFESyxLQUVKLElBRkksQ0FFQyxXQUFXLElBQUksV0FBVyxDQUFDLElBQVosRUFGaEIsRUFHSixJQUhJLENBR0MsV0FBVyxJQUFJLFdBQVcsQ0FBQyxPQUFaLEVBSGhCLENBQVA7QUFJRCxHQU53QjtBQVF6QjtBQUNBLEVBQUEsZ0JBQWdCLEVBQUcsS0FBRCxJQUFXO0FBQzNCLFdBQU8sS0FBSyxDQUFFLEdBQUUsVUFBVyxFQUFmLEVBQWtCO0FBQzFCLE1BQUEsTUFBTSxFQUFFLE1BRGtCO0FBRTFCLE1BQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQsT0FGaUI7QUFLMUIsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTG9CLEtBQWxCLENBQUwsQ0FPSixJQVBJLENBT0UsV0FBRCxJQUFpQixXQUFXLENBQUMsSUFBWixFQVBsQixDQUFQO0FBUUQsR0FsQndCO0FBb0J6QixFQUFBLGtCQUFrQixFQUFHLEVBQUQsSUFBUTtBQUMxQixXQUFPLEtBQUssQ0FBRSxHQUFFLFVBQVcsSUFBRyxF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TUFFTztBQUNMLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsU0FBcEMsR0FBZ0QsRUFBaEQ7QUFDQSxZQUFNLFlBQVksR0FBRztBQUNuQixRQUFBLElBQUksRUFBRSxJQURhO0FBRW5CLFFBQUEsT0FBTyxFQUFFLE9BRlU7QUFHbkIsUUFBQSxLQUFLLEVBQUUsS0FIWTtBQUluQixRQUFBLElBQUksRUFBRTtBQUphLE9BQXJCOztBQU1BLG9CQUFtQixnQkFBbkIsQ0FBb0MsWUFBcEMsRUFBa0QsSUFBbEQsQ0FBdUQsTUFBTTtBQUMzRCwyQkFBbUIsZ0JBQW5COztBQUNBO0FBQ0QsT0FIRDtBQUtEO0FBQ0YsR0F0QkQ7QUF1QkQsQ0F4QkQ7O2VBMEJlLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBjb250YWN0Q29sbGVjdGlvblxyXG4vLyBUaGlzIEpTIGZpbGUgZGlyZWN0cyB1cyB0byB0aGUgZGF0YVxyXG5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsVXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiXHJcbi8vIGdldEpvdXJuYWxFbnRyaWVzIHBlcmZvcm1zIGEgXCJHRVRcIiBmZXRjaCB0byB0aGUgZW50cmllcyBEQlxyXG5jb25zdCBqb3VybmFsRGF0YU1hbmFnZXIgPSB7XHJcbiAgZ2V0Sm91cm5hbEVudHJpZXM6ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHtqb3VybmFsVXJsfT9fc29ydD1kYXRlJl9vcmRlcj1kZXNjJl9leHBhbmQ9bW9vZGApXHJcbiAgICAgIC8vIHRyYW5zbGF0ZSB0byBqYXZhc2NyaXB0XHJcbiAgICAgIC50aGVuKGpvdXJuYWxEYXRhID0+IGpvdXJuYWxEYXRhLmpzb24oKSlcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEucmV2ZXJzZSgpKVxyXG4gIH0sXHJcblxyXG4gIC8vIHNhdmVKb3VybmFsRW50cnkgcGVyZm9ybXMgYSBmZXRjaCBcIlBPU1RcIiwgLnRoZW4gY29udmVydHMgZGF0YSB0byBqYXZhc2NyaXB0LCAudGhlbiBob2lzdHMgaXQgdXAgdG8gYmUgYXZhaWxhYmxlIGZvciBhIGxhdGVyIGZ1bmN0aW9uXHJcbiAgc2F2ZUpvdXJuYWxFbnRyeTogKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChqb3VybmFsRGF0YSkgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZUpvdXJuYWxFbnRyeTogKGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH0vJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSkudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgam91cm5hbEVkaXRFbnRyeTogKGVudHJ5LCBpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeSlcclxuICAgIH0pLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9LFxyXG5cclxuICBqb3VybmFsU2luZ2xlRW50cnk6IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YClcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRGF0YU1hbmFnZXIiLCJpbXBvcnQgam91cm5hbEh0bWxFbnRyeSBmcm9tIFwiLi9lbnRyeUhUTUxcIlxyXG5pbXBvcnQgam91cm5hbERhdGFNYW5hZ2VyIGZyb20gXCIuL2RhdGFcIlxyXG5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsRE9NID0gKGVudHJ5KSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUxvZ1wiKS5pbm5lckhUTUwgKz0gZW50cnlcclxufVxyXG5cclxuY29uc3Qgam91cm5hbERvbVJlbmRlciA9ICgpID0+IHtcclxuICBqb3VybmFsRGF0YU1hbmFnZXIuZ2V0Sm91cm5hbEVudHJpZXMoKVxyXG4gIC50aGVuKGVudHJpZXMgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5SFRNTCA9IGpvdXJuYWxIdG1sRW50cnkgKGVudHJ5KVxyXG4gICAgICBqb3VybmFsRE9NKGpvdXJuYWxFbnRyeUhUTUwpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxEb21SZW5kZXIiLCJjb25zdCBqb3VybmFsRm9ybU1hbmFnZXIgPSB7XHJcbiAgam91cm5hbEh0bWxGb3JtOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgXHJcbiAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uc1wiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxyXG4gICAgICA8aDQ+RGF0ZSBvZiBFbnRyeTo8L2g0Pjxicj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJkYXRlcGlja2VyXCIgcGxhY2Vob2xkZXI9XCJQaWNrIGEgRGF5XCIgaWQ9XCJqb3VybmFsRm9ybURhdGVcIj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxyXG4gICAgICA8aDQ+Q29uY2VwdHMgQ292ZXJlZDo8L2g0Pjxicj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJHaXZlIGl0IGEgVGl0bGVcIiBpZD1cImNvbmNlcHRzQ292ZXJlZFwiPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XHJcbiAgICA8aDQ+Sm91cm5hbCBFbnRyeTo8L2g0Pjxicj5cclxuICAgICAgPHRleHRhcmVhIGlkPVwiam91cm5hbEVudHJ5XCIgY2xhc3M9XCJtYXRlcmlhbGl6ZS10ZXh0YXJlYVwiIHJvd3M9XCIyMFwiIGNvbHM9XCI1MFwiPlxyXG4gICAgICA8L3RleHRhcmVhPiBcclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XHJcbiAgICA8aDQ+WW91ciBNb29kOjwvaDQ+PGJyPlxyXG4gICAgICA8c2VsZWN0IGlkPVwiZGFpbHlNb29kXCI+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPjwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJIYXBweVwiPkhhcHB5PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhZFwiPlNhZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJPcHRpbWlzdGljXCI+T3B0aW1pc3RpYzwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCcm9rZW5cIj5Ccm9rZW48L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuICA8YnI+XHJcblxyXG4gIDxidXR0b24gaWQ9XCJyZWNvcmRfYnV0dG9uXCIgY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5TVUJNSVRcclxuICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHJpZ2h0XCI+PC9pPlxyXG4gIDwvYnV0dG9uPjxicj48YnI+XHJcblxyXG4gICAgXHJcbiAgICBgXHJcbiAgfSxcclxuICBqb3VybmFsQ2xlYXJGb3JtOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxGb3JtRGF0ZVwiKS52YWx1ZSA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhaWx5TW9vZFwiKS52YWx1ZSA9IFwiXCJcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRm9ybU1hbmFnZXIiLCIvLyBqb3VybmFsSFRNTEVudHJ5IGlzIGEgSFRNTCByZXByZXNlbnRhaW9uIG9mIHRoZSBkYXRhLiAgVGhpcyBpcyBob3cgd2UnZCBsaWtlIHRvIHNlZSBpdCBpbiB0aGUgZG9tLlxyXG5cclxuXHJcbmNvbnN0IGpvdXJuYWxIVE1MRW50cnkgPSAoZW50cnkpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcImpvdXJuYWxFbnRyeVwiPlxyXG4gICAgICAgICAgICAgICAgPGg0PiR7ZW50cnkuY29uY2VwdH08L2g0PlxyXG4gICAgICAgICAgICAgICAgPGg1PkRhdGU6ICR7ZW50cnkuZGF0ZX08L2g1PlxyXG4gICAgICAgICAgICAgICAgPHA+RW50cnk6IDxicj4ke2VudHJ5LmVudHJ5fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+PGJyPiBcclxuICAgICAgICAgICAgYFxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxIVE1MRW50cnlcclxuXHJcblxyXG4vKiA8cD5Nb29kIFRvZGF5OiA8YnI+JHtlbnRyeS5tb29kLmxhYmVsfTwvcD4gKi8iLCJpbXBvcnQgam91cm5hbEZvcm1NYW5hZ2VyIGZyb20gXCIuL2VudHJ5Rm9ybVwiXG5pbXBvcnQgam91cm5hbERvbVJlbmRlciBmcm9tIFwiLi9kb21SZW5kZXJcIlxuaW1wb3J0IHNhdmVKb3VybmFsIGZyb20gXCIuL3NhdmVFbnRyeVwiXG5pbXBvcnQgam91cm5hbE1vb2RGaWx0ZXIgZnJvbSBcIi4vbW9vZEZpbHRlclwiO1xuXG5cbmNvbnN0IGpvdXJuYWwgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1cIikuaW5uZXJIVE1MID0gam91cm5hbEZvcm1NYW5hZ2VyLmpvdXJuYWxIdG1sRm9ybSgpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZEZpbHRlclwiKS5pbm5lckhUTUwgPSBqb3VybmFsTW9vZEZpbHRlcigpXG4gIGpvdXJuYWxEb21SZW5kZXIoKVxuICBzYXZlSm91cm5hbCgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWwiLCJjb25zb2xlLmxvZyhcImhpXCIpXHJcblxyXG5cclxuaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbFwiXHJcblxyXG5qb3VybmFsKClcclxuXHJcbi8vIE1hdGVyaWFsaXplXHJcblxyXG4vLyBjYWxlbmRhclxyXG5jb25zdCBjYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZXBpY2tlclwiKVxyXG4gTS5EYXRlcGlja2VyLmluaXQoY2FsZW5kYXIse1xyXG4gICBmb3JtYXQ6IFwiZGRkZCBtbW0gZGQsIHl5eXlcIlxyXG4gfSk7XHJcblxyXG5cclxuLy8gIHRleHRhcmVhXHJcbiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKTtcclxuIE0udGV4dGFyZWFBdXRvUmVzaXplKCQoXCIjam91cm5hbEVudHJ5XCIpKVxyXG5cclxuLy8gIHNlbGVjdFxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICQoJ3NlbGVjdCcpLmZvcm1TZWxlY3QoKTtcclxufSk7XHJcbiIsImNvbnN0IGpvdXJuYWxNb29kRmlsdGVyID0gKCkgPT4ge1xyXG4gIHJldHVybiBgXHJcbiAgPGxlZ2VuZD5GaWx0ZXIgSm91cm5hbCBFbnRyaWVzIGJ5IE1vb2Q8L2xlZ2VuZD5cclxuICA8ZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImhhcHB5XCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cImhhcHB5XCIgLz5cclxuICA8bGFiZWwgZm9yPVwiaGFwcHlcIj5IYXBweTwvbGFiZWw+XHJcbjwvZGl2PlxyXG5cclxuPGRpdj5cclxuICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJzYWRcIiBuYW1lPVwibW9vZFwiIHZhbHVlPVwic2FkXCIgY2hlY2tlZCAvPlxyXG4gIDxsYWJlbCBmb3I9XCJzYWRcIj5TYWQ8L2xhYmVsPlxyXG48L2Rpdj5cclxuXHJcbjxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwib3B0aW1pc3RpY1wiIG5hbWU9XCJtb29kXCIgdmFsdWU9XCJvcHRpbWlzdGljXCIgLz5cclxuICA8bGFiZWwgZm9yPVwib3B0aW1pc3RpY1wiPk9wdGltaXN0aWM8L2xhYmVsPlxyXG48L2Rpdj5cclxuXHJcbjxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiYnJva2VuXCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cImJyb2tlblwiIC8+XHJcbiAgPGxhYmVsIGZvcj1cImJyb2tlblwiPkJyb2tlbjwvbGFiZWw+XHJcbjwvZGl2PiBcclxuICAgICAgICAgIGBcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTW9vZEZpbHRlciIsImltcG9ydCBqb3VybmFsRGF0YU1hbmFnZXIgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBqb3VybmFsRm9ybU1hbmFnZXIgZnJvbSBcIi4vZW50cnlGb3JtXCJcclxuaW1wb3J0IGpvdXJuYWxEb21SZW5kZXIgZnJvbSBcIi4vZG9tUmVuZGVyXCJcclxuXHJcbmNvbnN0IHNhdmVKb3VybmFsID0gKCkgPT4ge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVjb3JkX2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1EYXRlXCIpLnZhbHVlXHJcbiAgICBjb25zdCBjb25jZXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWVcclxuICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWVcclxuICAgIGNvbnN0IG1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhaWx5TW9vZFwiKS52YWx1ZVxyXG5cclxuICAgIGlmICghZGF0ZSB8fCAhY29uY2VwdCB8fCAhZW50cnkgfHwgIW1vb2QpIHtcclxuICAgICAgYWxlcnQoXCJZb3UgbWlzc2VkIGEgYm94XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5TG9nXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5ID0ge1xyXG4gICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgY29uY2VwdDogY29uY2VwdCxcclxuICAgICAgICBlbnRyeTogZW50cnksXHJcbiAgICAgICAgbW9vZDogbW9vZFxyXG4gICAgICB9XHJcbiAgICAgIGpvdXJuYWxEYXRhTWFuYWdlci5zYXZlSm91cm5hbEVudHJ5KGpvdXJuYWxFbnRyeSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgam91cm5hbEZvcm1NYW5hZ2VyLmpvdXJuYWxDbGVhckZvcm0oKVxyXG4gICAgICAgIGpvdXJuYWxEb21SZW5kZXIoKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzYXZlSm91cm5hbCJdfQ==
