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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbVJlbmRlci5qcyIsIi4uL3NjcmlwdHMvZW50cnlGb3JtLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUhUTUwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3NhdmVFbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFJQSxNQUFNLFVBQVUsR0FBRywrQkFBbkIsQyxDQUNBOztBQUNBLE1BQU0sa0JBQWtCLEdBQUc7QUFDekIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsVUFBVyxFQUFmLENBQUwsQ0FDTDtBQURLLEtBRUosSUFGSSxDQUVDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBWixFQUZoQixDQUFQO0FBR0QsR0FMd0I7QUFPekI7QUFDQSxFQUFBLGdCQUFnQixFQUFHLEtBQUQsSUFBVztBQUMzQixXQUFPLEtBQUssQ0FBRSxHQUFFLFVBQVcsRUFBZixFQUFrQjtBQUMxQixNQUFBLE1BQU0sRUFBRSxNQURrQjtBQUUxQixNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlCO0FBSzFCLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtBQUxvQixLQUFsQixDQUFMLENBT0osSUFQSSxDQU9FLFdBQUQsSUFBaUIsV0FBVyxDQUFDLElBQVosRUFQbEIsQ0FBUDtBQVFELEdBakJ3QjtBQW1CekIsRUFBQSxrQkFBa0IsRUFBRyxFQUFELElBQVE7QUFDMUIsV0FBTyxLQUFLLENBQUUsR0FBRSxVQUFXLElBQUcsRUFBRyxFQUFyQixFQUF3QjtBQUNsQyxNQUFBLE1BQU0sRUFBRTtBQUQwQixLQUF4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QXVCLFdBQXZCLEVBQW9DLFNBQXBDLEdBQWdELEVBQWhEO0FBQ0EsWUFBTSxZQUFZLEdBQUc7QUFDbkIsUUFBQSxJQUFJLEVBQUUsSUFEYTtBQUVuQixRQUFBLE9BQU8sRUFBRSxPQUZVO0FBR25CLFFBQUEsS0FBSyxFQUFFLEtBSFk7QUFJbkIsUUFBQSxJQUFJLEVBQUU7QUFKYSxPQUFyQjs7QUFNQSxvQkFBbUIsZ0JBQW5CLENBQW9DLFlBQXBDLEVBQWtELElBQWxELENBQXVELE1BQU07QUFDM0QsMkJBQW1CLGdCQUFuQjs7QUFDQTtBQUNELE9BSEQ7QUFLRDtBQUNGLEdBdEJEO0FBdUJELENBeEJEOztlQTBCZSxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gY29udGFjdENvbGxlY3Rpb25cclxuLy8gVGhpcyBKUyBmaWxlIGRpcmVjdHMgdXMgdG8gdGhlIGRhdGFcclxuXHJcblxyXG5cclxuY29uc3Qgam91cm5hbFVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIlxyXG4vLyBnZXRKb3VybmFsRW50cmllcyBwZXJmb3JtcyBhIFwiR0VUXCIgZmV0Y2ggdG8gdGhlIGVudHJpZXMgREJcclxuY29uc3Qgam91cm5hbERhdGFNYW5hZ2VyID0ge1xyXG4gIGdldEpvdXJuYWxFbnRyaWVzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH1gKVxyXG4gICAgICAvLyB0cmFuc2xhdGUgdG8gamF2YXNjcmlwdFxyXG4gICAgICAudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgLy8gc2F2ZUpvdXJuYWxFbnRyeSBwZXJmb3JtcyBhIGZldGNoIFwiUE9TVFwiLCAudGhlbiBjb252ZXJ0cyBkYXRhIHRvIGphdmFzY3JpcHQsIC50aGVuIGhvaXN0cyBpdCB1cCB0byBiZSBhdmFpbGFibGUgZm9yIGEgbGF0ZXIgZnVuY3Rpb25cclxuICBzYXZlSm91cm5hbEVudHJ5OiAoZW50cnkpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHtqb3VybmFsVXJsfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeSlcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKGpvdXJuYWxEYXRhKSA9PiBqb3VybmFsRGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgZGVsZXRlSm91cm5hbEVudHJ5OiAoaWQpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgJHtqb3VybmFsVXJsfS8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICB9KS50aGVuKGpvdXJuYWxEYXRhID0+IGpvdXJuYWxEYXRhLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBqb3VybmFsRWRpdEVudHJ5OiAoZW50cnksIGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH0vJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVudHJ5KVxyXG4gICAgfSkudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YSgpKVxyXG4gIH0sXHJcblxyXG4gIGpvdXJuYWxTaW5nbGVFbnRyeTogKGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH0vJHtpZH1gKVxyXG4gICAgICAudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YSgpKVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxEYXRhTWFuYWdlciIsImltcG9ydCBqb3VybmFsSHRtbEVudHJ5IGZyb20gXCIuL2VudHJ5SFRNTFwiXHJcbmltcG9ydCBqb3VybmFsRGF0YU1hbmFnZXIgZnJvbSBcIi4vZGF0YVwiXHJcblxyXG5cclxuXHJcbmNvbnN0IGpvdXJuYWxET00gPSAoZW50cnkpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5TG9nXCIpLmlubmVySFRNTCArPSBlbnRyeVxyXG59XHJcblxyXG5jb25zdCBqb3VybmFsRG9tUmVuZGVyID0gKCkgPT4ge1xyXG4gIGpvdXJuYWxEYXRhTWFuYWdlci5nZXRKb3VybmFsRW50cmllcygpXHJcbiAgLnRoZW4oZW50cmllcyA9PiB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICBjb25zdCBqb3VybmFsRW50cnlIVE1MID0gam91cm5hbEh0bWxFbnRyeSAoZW50cnkpXHJcbiAgICAgIGpvdXJuYWxET00oam91cm5hbEVudHJ5SFRNTClcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgam91cm5hbERvbVJlbmRlciIsImNvbnN0IGpvdXJuYWxGb3JtTWFuYWdlciA9IHtcclxuICBqb3VybmFsSHRtbEZvcm06ICgpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICBcclxuICA8ZGl2IGNsYXNzPVwicXVlc3Rpb25zXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XHJcbiAgICAgIDxoND5EYXRlIG9mIEVudHJ5OjwvaDQ+PGJyPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImRhdGVwaWNrZXJcIiBwbGFjZWhvbGRlcj1cIlBpY2sgYSBEYXlcIiBpZD1cImpvdXJuYWxGb3JtRGF0ZVwiPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XHJcbiAgICAgIDxoND5Db25jZXB0cyBDb3ZlcmVkOjwvaDQ+PGJyPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkdpdmUgaXQgYSBUaXRsZVwiIGlkPVwiY29uY2VwdHNDb3ZlcmVkXCI+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cclxuICAgIDxoND5Kb3VybmFsIEVudHJ5OjwvaDQ+PGJyPlxyXG4gICAgICA8dGV4dGFyZWEgaWQ9XCJqb3VybmFsRW50cnlcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCIgcm93cz1cIjIwXCIgY29scz1cIjUwXCI+XHJcbiAgICAgIDwvdGV4dGFyZWE+IFxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cclxuICAgIDxoND5Zb3VyIE1vb2Q6PC9oND48YnI+XHJcbiAgICAgIDxzZWxlY3QgaWQ9XCJkYWlseU1vb2RcIj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhhcHB5XCI+SGFwcHk8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2FkXCI+U2FkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk9wdGltaXN0aWNcIj5PcHRpbWlzdGljPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkJyb2tlblwiPkJyb2tlbjwvb3B0aW9uPlxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG4gIDxicj5cclxuXHJcbiAgPGJ1dHRvbiBpZD1cInJlY29yZF9idXR0b25cIiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiPlNVQk1JVFxyXG4gIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIj48L2k+XHJcbiAgPC9idXR0b24+PGJyPjxicj5cclxuXHJcbiAgICBcclxuICAgIGBcclxuICB9LFxyXG4gIGpvdXJuYWxDbGVhckZvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1EYXRlXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZSA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGFpbHlNb29kXCIpLnZhbHVlID0gXCJcIlxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxGb3JtTWFuYWdlciIsIi8vIGpvdXJuYWxIVE1MRW50cnkgaXMgYSBIVE1MIHJlcHJlc2VudGFpb24gb2YgdGhlIGRhdGEuICBUaGlzIGlzIGhvdyB3ZSdkIGxpa2UgdG8gc2VlIGl0IGluIHRoZSBkb20uXHJcblxyXG5cclxuY29uc3Qgam91cm5hbEhUTUxFbnRyeSA9IChlbnRyeSkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFwiam91cm5hbEVudHJ5XCI+XHJcbiAgICAgICAgICAgICAgICA8aDQ+JHtlbnRyeS5jb25jZXB0fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8aDU+RGF0ZTogJHtlbnRyeS5kYXRlfTwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD5FbnRyeTogPGJyPiR7ZW50cnkuZW50cnl9PC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+TW9vZCBUb2RheTogPGJyPiR7ZW50cnkubW9vZH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2Pjxicj4gXHJcbiAgICAgICAgICAgIGBcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsSFRNTEVudHJ5IiwiaW1wb3J0IGpvdXJuYWxGb3JtTWFuYWdlciBmcm9tIFwiLi9lbnRyeUZvcm1cIlxuaW1wb3J0IGpvdXJuYWxEb21SZW5kZXIgZnJvbSBcIi4vZG9tUmVuZGVyXCJcbmltcG9ydCBzYXZlSm91cm5hbCBmcm9tIFwiLi9zYXZlRW50cnlcIlxuaW1wb3J0IGpvdXJuYWxNb29kRmlsdGVyIGZyb20gXCIuL21vb2RGaWx0ZXJcIjtcblxuXG5jb25zdCBqb3VybmFsID0gKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxGb3JtXCIpLmlubmVySFRNTCA9IGpvdXJuYWxGb3JtTWFuYWdlci5qb3VybmFsSHRtbEZvcm0oKVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RGaWx0ZXJcIikuaW5uZXJIVE1MID0gam91cm5hbE1vb2RGaWx0ZXIoKVxuICBqb3VybmFsRG9tUmVuZGVyKClcbiAgc2F2ZUpvdXJuYWwoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsIiwiY29uc29sZS5sb2coXCJoaVwiKVxyXG5cclxuaW1wb3J0IGpvdXJuYWwgZnJvbSBcIi4vam91cm5hbFwiXHJcblxyXG5qb3VybmFsKClcclxuXHJcbi8vIE1hdGVyaWFsaXplXHJcblxyXG4vLyBjYWxlbmRhclxyXG5jb25zdCBjYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZXBpY2tlclwiKVxyXG4gTS5EYXRlcGlja2VyLmluaXQoY2FsZW5kYXIse1xyXG4gICBmb3JtYXQ6IFwiZGRkZCBtbW0gZGQsIHl5eXlcIlxyXG4gfSk7XHJcblxyXG5cclxuLy8gIHRleHRhcmVhXHJcbiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKTtcclxuIE0udGV4dGFyZWFBdXRvUmVzaXplKCQoXCIjam91cm5hbEVudHJ5XCIpKVxyXG5cclxuLy8gIHNlbGVjdFxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICQoJ3NlbGVjdCcpLmZvcm1TZWxlY3QoKTtcclxufSk7XHJcbiIsImNvbnN0IGpvdXJuYWxNb29kRmlsdGVyID0gKCkgPT4ge1xyXG4gIHJldHVybiBgXHJcbiAgPGxlZ2VuZD5GaWx0ZXIgSm91cm5hbCBFbnRyaWVzIGJ5IE1vb2Q8L2xlZ2VuZD5cclxuICA8ZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImhhcHB5XCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cImhhcHB5XCIgLz5cclxuICA8bGFiZWwgZm9yPVwiaGFwcHlcIj5IYXBweTwvbGFiZWw+XHJcbjwvZGl2PlxyXG5cclxuPGRpdj5cclxuICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJzYWRcIiBuYW1lPVwibW9vZFwiIHZhbHVlPVwic2FkXCIgY2hlY2tlZCAvPlxyXG4gIDxsYWJlbCBmb3I9XCJzYWRcIj5TYWQ8L2xhYmVsPlxyXG48L2Rpdj5cclxuXHJcbjxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwib3B0aW1pc3RpY1wiIG5hbWU9XCJtb29kXCIgdmFsdWU9XCJvcHRpbWlzdGljXCIgLz5cclxuICA8bGFiZWwgZm9yPVwib3B0aW1pc3RpY1wiPk9wdGltaXN0aWM8L2xhYmVsPlxyXG48L2Rpdj5cclxuXHJcbjxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiYnJva2VuXCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cImJyb2tlblwiIC8+XHJcbiAgPGxhYmVsIGZvcj1cImJyb2tlblwiPkJyb2tlbjwvbGFiZWw+XHJcbjwvZGl2PiBcclxuICAgICAgICAgIGBcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTW9vZEZpbHRlciIsImltcG9ydCBqb3VybmFsRGF0YU1hbmFnZXIgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBqb3VybmFsRm9ybU1hbmFnZXIgZnJvbSBcIi4vZW50cnlGb3JtXCJcclxuaW1wb3J0IGpvdXJuYWxEb21SZW5kZXIgZnJvbSBcIi4vZG9tUmVuZGVyXCJcclxuXHJcbmNvbnN0IHNhdmVKb3VybmFsID0gKCkgPT4ge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVjb3JkX2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1EYXRlXCIpLnZhbHVlXHJcbiAgICBjb25zdCBjb25jZXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWVcclxuICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWVcclxuICAgIGNvbnN0IG1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhaWx5TW9vZFwiKS52YWx1ZVxyXG5cclxuICAgIGlmICghZGF0ZSB8fCAhY29uY2VwdCB8fCAhZW50cnkgfHwgIW1vb2QpIHtcclxuICAgICAgYWxlcnQoXCJZb3UgbWlzc2VkIGEgYm94XCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5TG9nXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5ID0ge1xyXG4gICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgY29uY2VwdDogY29uY2VwdCxcclxuICAgICAgICBlbnRyeTogZW50cnksXHJcbiAgICAgICAgbW9vZDogbW9vZFxyXG4gICAgICB9XHJcbiAgICAgIGpvdXJuYWxEYXRhTWFuYWdlci5zYXZlSm91cm5hbEVudHJ5KGpvdXJuYWxFbnRyeSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgam91cm5hbEZvcm1NYW5hZ2VyLmpvdXJuYWxDbGVhckZvcm0oKVxyXG4gICAgICAgIGpvdXJuYWxEb21SZW5kZXIoKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzYXZlSm91cm5hbCJdfQ==
