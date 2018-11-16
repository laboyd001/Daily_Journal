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
                <h2>${entry.concept}</h2>
                <h3>Date: ${entry.date}</h3>
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

console.log("howdy");
(0, _journal.default)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbVJlbmRlci5qcyIsIi4uL3NjcmlwdHMvZW50cnlGb3JtLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUhUTUwuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21vb2RGaWx0ZXIuanMiLCIuLi9zY3JpcHRzL3NhdmVFbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFJQSxNQUFNLFVBQVUsR0FBRywrQkFBbkIsQyxDQUNBOztBQUNBLE1BQU0sa0JBQWtCLEdBQUc7QUFDekIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsVUFBVyxFQUFmLENBQUwsQ0FDTDtBQURLLEtBRUosSUFGSSxDQUVDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBWixFQUZoQixDQUFQO0FBR0QsR0FMd0I7QUFPekI7QUFDQSxFQUFBLGdCQUFnQixFQUFHLEtBQUQsSUFBVztBQUMzQixXQUFPLEtBQUssQ0FBRSxHQUFFLFVBQVcsRUFBZixFQUFrQjtBQUMxQixNQUFBLE1BQU0sRUFBRSxNQURrQjtBQUUxQixNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlCO0FBSzFCLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtBQUxvQixLQUFsQixDQUFMLENBT0osSUFQSSxDQU9FLFdBQUQsSUFBaUIsV0FBVyxDQUFDLElBQVosRUFQbEIsQ0FBUDtBQVFELEdBakJ3QjtBQW1CekIsRUFBQSxrQkFBa0IsRUFBRyxFQUFELElBQVE7QUFDMUIsV0FBTyxLQUFLLENBQUUsR0FBRSxVQUFXLElBQUcsRUFBRyxFQUFyQixFQUF3QjtBQUNsQyxNQUFBLE1BQU0sRUFBRTtBQUQwQixLQUF4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QU0sV0FBVyxHQUFHLE1BQU07QUFDeEIsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLE1BQU07QUFDdkUsVUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQXhEO0FBQ0EsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQTNEO0FBQ0EsVUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsS0FBdEQ7QUFDQSxVQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUFsRDs7QUFFQSxRQUFJLENBQUMsV0FBRCxJQUFnQixDQUFDLGNBQWpCLElBQW1DLENBQUMsWUFBcEMsSUFBb0QsQ0FBQyxXQUF6RCxFQUFzRTtBQUNwRSxNQUFBLEtBQUssQ0FBQyxrQkFBRCxDQUFMO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQUFtQyxTQUFuQyxHQUErQyxFQUEvQztBQUNBLFlBQU0sWUFBWSxHQUFHO0FBQ25CLFFBQUEsSUFBSSxFQUFFLElBRGE7QUFFbkIsUUFBQSxPQUFPLEVBQUUsT0FGVTtBQUduQixRQUFBLEtBQUssRUFBRSxLQUhZO0FBSW5CLFFBQUEsSUFBSSxFQUFFO0FBSmEsT0FBckI7O0FBTUEsb0JBQW1CLGdCQUFuQixDQUFvQyxZQUFwQyxFQUFrRCxJQUFsRCxDQUF1RCxNQUFNO0FBQzNELDJCQUFtQixnQkFBbkI7O0FBQ0E7QUFDRCxPQUhEO0FBS0Q7QUFDRixHQXRCRDtBQXVCRCxDQXhCRDs7ZUEwQmUsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGNvbnRhY3RDb2xsZWN0aW9uXHJcbi8vIFRoaXMgSlMgZmlsZSBkaXJlY3RzIHVzIHRvIHRoZSBkYXRhXHJcblxyXG5cclxuXHJcbmNvbnN0IGpvdXJuYWxVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCJcclxuLy8gZ2V0Sm91cm5hbEVudHJpZXMgcGVyZm9ybXMgYSBcIkdFVFwiIGZldGNoIHRvIHRoZSBlbnRyaWVzIERCXHJcbmNvbnN0IGpvdXJuYWxEYXRhTWFuYWdlciA9IHtcclxuICBnZXRKb3VybmFsRW50cmllczogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9YClcclxuICAgICAgLy8gdHJhbnNsYXRlIHRvIGphdmFzY3JpcHRcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIC8vIHNhdmVKb3VybmFsRW50cnkgcGVyZm9ybXMgYSBmZXRjaCBcIlBPU1RcIiwgLnRoZW4gY29udmVydHMgZGF0YSB0byBqYXZhc2NyaXB0LCAudGhlbiBob2lzdHMgaXQgdXAgdG8gYmUgYXZhaWxhYmxlIGZvciBhIGxhdGVyIGZ1bmN0aW9uXHJcbiAgc2F2ZUpvdXJuYWxFbnRyeTogKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChqb3VybmFsRGF0YSkgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZUpvdXJuYWxFbnRyeTogKGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH0vJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSkudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgam91cm5hbEVkaXRFbnRyeTogKGVudHJ5LCBpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeSlcclxuICAgIH0pLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9LFxyXG5cclxuICBqb3VybmFsU2luZ2xlRW50cnk6IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YClcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRGF0YU1hbmFnZXIiLCJpbXBvcnQgam91cm5hbEh0bWxFbnRyeSBmcm9tIFwiLi9lbnRyeUhUTUxcIlxyXG5pbXBvcnQgam91cm5hbERhdGFNYW5hZ2VyIGZyb20gXCIuL2RhdGFcIlxyXG5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsRE9NID0gKGVudHJ5KSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUxvZ1wiKS5pbm5lckhUTUwgKz0gZW50cnlcclxufVxyXG5cclxuY29uc3Qgam91cm5hbERvbVJlbmRlciA9ICgpID0+IHtcclxuICBqb3VybmFsRGF0YU1hbmFnZXIuZ2V0Sm91cm5hbEVudHJpZXMoKVxyXG4gIC50aGVuKGVudHJpZXMgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5SFRNTCA9IGpvdXJuYWxIdG1sRW50cnkgKGVudHJ5KVxyXG4gICAgICBqb3VybmFsRE9NKGpvdXJuYWxFbnRyeUhUTUwpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxEb21SZW5kZXIiLCJcclxuY29uc3Qgam91cm5hbEZvcm1NYW5hZ2VyID0ge1xyXG4gIGpvdXJuYWxIdG1sRm9ybTogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uc1wiPlxyXG4gICAgPGZpZWxkc2V0IGlkPVwiZGF0ZVwiPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiam91cm5hbERhdGVcIj5EYXRlIG9mIEVudHJ5PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImpvdXJuYWxEYXRlXCIgaWQ9XCJqb3VybmFsRGF0ZVwiPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgIDxmaWVsZHNldCBpZD1cImNvbmNlcHRcIj5cclxuICAgICAgPGxhYmVsIGZvcj1cImNvbmNlcHRzQ292ZXJlZFwiPkNvbmNlcHRzIENvdmVyZWQ8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29uY2VwdHNDb3ZlcmVkXCIgaWQ9XCJjb25jZXB0c0NvdmVyZWRcIj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICA8ZmllbGRzZXQgaWQ9XCJlbnRyeVwiPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiam91cm5hbEVudHJ5XCI+Sm91cm5hbCBFbnRyeTwvbGFiZWw+XHJcbiAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiam91cm5hbEVudHJ5XCIgaWQ9XCJqb3VybmFsRW50cnlcIiByb3dzPVwiMjBcIiBjb2xzPVwiNTBcIj5cclxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICA8ZmllbGRzZXQgaWQ9XCJtb29kXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJkYWlseU1vb2RcIj5Nb29kIGZvciB0aGUgRGF5PC9sYWJlbD5cclxuICAgICAgPHNlbGVjdCBpZD1cImRhaWx5TW9vZFwiPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJIYXBweVwiPkhhcHB5PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhZFwiPlNhZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJPcHRpbWlzdGljXCI+T3B0aW1pc3RpYzwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCcm9rZW5cIj5Ccm9rZW48L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gIDwvZGl2Pjxicj5cclxuXHJcbiAgPGlucHV0IGlkPVwicmVjb3JkX2J1dHRvblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlJlY29yZCBKb3VybmFsIEVudHJ5XCI+PGJyPjxicj5cclxuXHJcbiAgICBcclxuICAgIGBcclxuICB9LFxyXG4gIGpvdXJuYWxDbGVhckZvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5XCIpLnZhbHVlID0gXCJcIlxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEZvcm1NYW5hZ2VyIiwiLy8gam91cm5hbEhUTUxFbnRyeSBpcyBhIEhUTUwgcmVwcmVzZW50YWlvbiBvZiB0aGUgZGF0YS4gIFRoaXMgaXMgaG93IHdlJ2QgbGlrZSB0byBzZWUgaXQgaW4gdGhlIGRvbS5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsSFRNTEVudHJ5ID0gKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJqb3VybmFsRW50cnlcIj5cclxuICAgICAgICAgICAgICAgIDxoMj4ke2VudHJ5LmNvbmNlcHR9PC9oMj5cclxuICAgICAgICAgICAgICAgIDxoMz5EYXRlOiAke2VudHJ5LmRhdGV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxwPkVudHJ5OiA8YnI+JHtlbnRyeS5lbnRyeX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Nb29kIFRvZGF5OiA8YnI+JHtlbnRyeS5tb29kfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+PGJyPiBcclxuICAgICAgICAgICAgYFxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxIVE1MRW50cnkiLCJpbXBvcnQgam91cm5hbEZvcm1NYW5hZ2VyIGZyb20gXCIuL2VudHJ5Rm9ybVwiXG5pbXBvcnQgam91cm5hbERvbVJlbmRlciBmcm9tIFwiLi9kb21SZW5kZXJcIlxuaW1wb3J0IHNhdmVKb3VybmFsIGZyb20gXCIuL3NhdmVFbnRyeVwiXG5pbXBvcnQgam91cm5hbE1vb2RGaWx0ZXIgZnJvbSBcIi4vbW9vZEZpbHRlclwiO1xuXG5cbmNvbnN0IGpvdXJuYWwgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1cIikuaW5uZXJIVE1MID0gam91cm5hbEZvcm1NYW5hZ2VyLmpvdXJuYWxIdG1sRm9ybSgpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZEZpbHRlclwiKS5pbm5lckhUTUwgPSBqb3VybmFsTW9vZEZpbHRlcigpXG4gIGpvdXJuYWxEb21SZW5kZXIoKVxuICBzYXZlSm91cm5hbCgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWwiLCJjb25zb2xlLmxvZyhcImhvd2R5XCIpXHJcblxyXG5pbXBvcnQgam91cm5hbCBmcm9tIFwiLi9qb3VybmFsXCJcclxuXHJcbmpvdXJuYWwoKSIsImNvbnN0IGpvdXJuYWxNb29kRmlsdGVyID0gKCkgPT4ge1xyXG4gIHJldHVybiBgXHJcbiAgPGxlZ2VuZD5GaWx0ZXIgSm91cm5hbCBFbnRyaWVzIGJ5IE1vb2Q8L2xlZ2VuZD5cclxuICA8ZGl2PlxyXG4gIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImhhcHB5XCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cImhhcHB5XCIgLz5cclxuICA8bGFiZWwgZm9yPVwiaGFwcHlcIj5IYXBweTwvbGFiZWw+XHJcbjwvZGl2PlxyXG5cclxuPGRpdj5cclxuICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJzYWRcIiBuYW1lPVwibW9vZFwiIHZhbHVlPVwic2FkXCIgY2hlY2tlZCAvPlxyXG4gIDxsYWJlbCBmb3I9XCJzYWRcIj5TYWQ8L2xhYmVsPlxyXG48L2Rpdj5cclxuXHJcbjxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwib3B0aW1pc3RpY1wiIG5hbWU9XCJtb29kXCIgdmFsdWU9XCJvcHRpbWlzdGljXCIgLz5cclxuICA8bGFiZWwgZm9yPVwib3B0aW1pc3RpY1wiPk9wdGltaXN0aWM8L2xhYmVsPlxyXG48L2Rpdj5cclxuXHJcbjxkaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiYnJva2VuXCIgbmFtZT1cIm1vb2RcIiB2YWx1ZT1cImJyb2tlblwiIC8+XHJcbiAgPGxhYmVsIGZvcj1cImJyb2tlblwiPkJyb2tlbjwvbGFiZWw+XHJcbjwvZGl2PiBcclxuICAgICAgICAgIGBcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsTW9vZEZpbHRlciIsImltcG9ydCBqb3VybmFsRGF0YU1hbmFnZXIgZnJvbSBcIi4vZGF0YVwiXHJcbmltcG9ydCBqb3VybmFsRm9ybU1hbmFnZXIgZnJvbSBcIi4vZW50cnlGb3JtXCJcclxuaW1wb3J0IGpvdXJuYWxEb21SZW5kZXIgZnJvbSBcIi4vZG9tUmVuZGVyXCJcclxuXHJcbmNvbnN0IHNhdmVKb3VybmFsID0gKCkgPT4ge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVjb3JkX2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEZvcm1EYXRlXCIpLnZhbHVlXHJcbiAgICBjb25zdCBjb25jZXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWVcclxuICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWVcclxuICAgIGNvbnN0IG1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhaWx5TW9vZFwiKS52YWx1ZVxyXG5cclxuICAgIGlmICgham91cm5hbERhdGUgfHwgIWpvdXJuYWxDb25jZXB0IHx8ICFqb3VybmFsRW50cnkgfHwgIWpvdXJuYWxNb29kKSB7XHJcbiAgICAgIGFsZXJ0KFwiWW91IG1pc3NlZCBhIGJveFwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImVudHJ5TG9nXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5ID0ge1xyXG4gICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgY29uY2VwdDogY29uY2VwdCxcclxuICAgICAgICBlbnRyeTogZW50cnksXHJcbiAgICAgICAgbW9vZDogbW9vZFxyXG4gICAgICB9XHJcbiAgICAgIGpvdXJuYWxEYXRhTWFuYWdlci5zYXZlSm91cm5hbEVudHJ5KGpvdXJuYWxFbnRyeSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgam91cm5hbEZvcm1NYW5hZ2VyLmpvdXJuYWxDbGVhckZvcm0oKVxyXG4gICAgICAgIGpvdXJuYWxEb21SZW5kZXIoKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzYXZlSm91cm5hbCJdfQ==
