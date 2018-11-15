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

// this function is returning a "GET" fetch and .then taking that data and mapping through all of the objects in the array to create entryComponent => a HTML representation of data
const journalDOM = entry => {
  document.querySelector("#").innerHTML += entry;
};

const journalDomRender = () => {
  _data.default.getJournalEntries().then(entries => {
    entries.forEach(entry => {
      const journalEntryHTML = journalHtmlEntry(entry);
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

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  </div>

  <input id="record_button" type="button" value="Record Journal Entry">

    
    `;
  },
  newsClearForm: () => {
    document.querySelector("#journalDate").value = "";
    document.querySelector("#conceptsCovered").value = "";
    document.querySelector("#journalEntry").value = "";
  }
};
var _default = journalFormManager;
exports.default = _default;

},{"./data":1}],4:[function(require,module,exports){
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
// rendering function accepts an element and component argument, targets element, and appends stuff to that element conatiner
// export default (element, components) => {
//   const $container = $(`#${element}`)
//   $container.empty().append(components)
// }
"use strict";

},{}],6:[function(require,module,exports){
"use strict";

var _entryForm = _interopRequireDefault(require("./entryForm"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

var _entryRender = _interopRequireDefault(require("./entryRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// post previously saved entries to dom on page load
(0, _entriesDOM.default)().then(entryList => (0, _entryRender.default)("entryLog", entryList)); // add click event to record button then create obj on click, perform "save" method on new entry, then take a snapshot of the updated database and post to dom

$("#record_button").click(() => {
  const entry = new _entryForm.default({
    date: $("#journalDate").val(),
    concept: $("#conceptsCovered").val(),
    entry: $("#journalEntry").val(),
    mood: $("#dailyMood").val()
  });
  entry.save().then(data => {
    console.log("new entry saved", data);
    return (0, _entriesDOM.default)();
  }).then(entryList => (0, _entryRender.default)("entryLog", entryList));
  $("#journalDate").val("");
  $("#conceptsCovered").val("");
  $("#journalEntry").val("");
  $("#dailyMood").val("");
});

},{"./entriesDOM":2,"./entryForm":3,"./entryRender":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5Rm9ybS5qcyIsIi4uL3NjcmlwdHMvZW50cnlIVE1MLmpzIiwiLi4vc2NyaXB0cy9lbnRyeVJlbmRlci5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFJQSxNQUFNLFVBQVUsR0FBRywrQkFBbkIsQyxDQUNBOztBQUNBLE1BQU0sa0JBQWtCLEdBQUc7QUFDekIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsVUFBVyxFQUFmLENBQUwsQ0FDTDtBQURLLEtBRUosSUFGSSxDQUVDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBWixFQUZoQixDQUFQO0FBR0QsR0FMd0I7QUFPekI7QUFDQSxFQUFBLGdCQUFnQixFQUFHLEtBQUQsSUFBVztBQUMzQixXQUFPLEtBQUssQ0FBRSxHQUFFLFVBQVcsRUFBZixFQUFrQjtBQUMxQixNQUFBLE1BQU0sRUFBRSxNQURrQjtBQUUxQixNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlCO0FBSzFCLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBZjtBQUxvQixLQUFsQixDQUFMLENBT0osSUFQSSxDQU9FLFdBQUQsSUFBaUIsV0FBVyxDQUFDLElBQVosRUFQbEIsQ0FBUDtBQVFELEdBakJ3QjtBQW1CekIsRUFBQSxrQkFBa0IsRUFBRyxFQUFELElBQVE7QUFDMUIsV0FBTyxLQUFLLENBQUUsR0FBRSxVQUFXLElBQUcsRUFBRyxFQUFyQixFQUF3QjtBQUNsQyxNQUFBLE1BQU0sRUFBRTtBQUQwQixLQUF4QixDQUFMLENBRUosSUFGSSxDQUVDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFB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R0FBaEI7QUFMZ0IsR0FBVixDQUFkO0FBUUEsRUFBQSxLQUFLLENBQUMsSUFBTixHQUNHLElBREgsQ0FDUyxJQUFELElBQVU7QUFDZCxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQSxXQUFPLDBCQUFQO0FBQ0QsR0FKSCxFQUtHLElBTEgsQ0FLUSxTQUFTLElBQUksMEJBQU8sVUFBUCxFQUFtQixTQUFuQixDQUxyQjtBQU1BLEVBQUEsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixDQUFzQixFQUF0QjtBQUNBLEVBQUEsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsR0FBdEIsQ0FBMEIsRUFBMUI7QUFDQSxFQUFBLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUIsR0FBbkIsQ0FBdUIsRUFBdkI7QUFDQSxFQUFBLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsR0FBaEIsQ0FBb0IsRUFBcEI7QUFDRCxDQW5CRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGNvbnRhY3RDb2xsZWN0aW9uXHJcbi8vIFRoaXMgSlMgZmlsZSBkaXJlY3RzIHVzIHRvIHRoZSBkYXRhXHJcblxyXG5cclxuXHJcbmNvbnN0IGpvdXJuYWxVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCJcclxuLy8gZ2V0Sm91cm5hbEVudHJpZXMgcGVyZm9ybXMgYSBcIkdFVFwiIGZldGNoIHRvIHRoZSBlbnRyaWVzIERCXHJcbmNvbnN0IGpvdXJuYWxEYXRhTWFuYWdlciA9IHtcclxuICBnZXRKb3VybmFsRW50cmllczogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9YClcclxuICAgICAgLy8gdHJhbnNsYXRlIHRvIGphdmFzY3JpcHRcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIC8vIHNhdmVKb3VybmFsRW50cnkgcGVyZm9ybXMgYSBmZXRjaCBcIlBPU1RcIiwgLnRoZW4gY29udmVydHMgZGF0YSB0byBqYXZhc2NyaXB0LCAudGhlbiBob2lzdHMgaXQgdXAgdG8gYmUgYXZhaWxhYmxlIGZvciBhIGxhdGVyIGZ1bmN0aW9uXHJcbiAgc2F2ZUpvdXJuYWxFbnRyeTogKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChqb3VybmFsRGF0YSkgPT4gam91cm5hbERhdGEuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZUpvdXJuYWxFbnRyeTogKGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7am91cm5hbFVybH0vJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSkudGhlbihqb3VybmFsRGF0YSA9PiBqb3VybmFsRGF0YS5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgam91cm5hbEVkaXRFbnRyeTogKGVudHJ5LCBpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShlbnRyeSlcclxuICAgIH0pLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9LFxyXG5cclxuICBqb3VybmFsU2luZ2xlRW50cnk6IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke2pvdXJuYWxVcmx9LyR7aWR9YClcclxuICAgICAgLnRoZW4oam91cm5hbERhdGEgPT4gam91cm5hbERhdGEoKSlcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRGF0YU1hbmFnZXIiLCJpbXBvcnQgam91cm5hbEhUTUxFbnRyeSBmcm9tIFwiLi9lbnRyeUhUTUxcIlxyXG5pbXBvcnQgam91cm5hbERhdGFNYW5hZ2VyIGZyb20gXCIuL2RhdGFcIlxyXG5cclxuXHJcbi8vIHRoaXMgZnVuY3Rpb24gaXMgcmV0dXJuaW5nIGEgXCJHRVRcIiBmZXRjaCBhbmQgLnRoZW4gdGFraW5nIHRoYXQgZGF0YSBhbmQgbWFwcGluZyB0aHJvdWdoIGFsbCBvZiB0aGUgb2JqZWN0cyBpbiB0aGUgYXJyYXkgdG8gY3JlYXRlIGVudHJ5Q29tcG9uZW50ID0+IGEgSFRNTCByZXByZXNlbnRhdGlvbiBvZiBkYXRhXHJcbmNvbnN0IGpvdXJuYWxET00gPSAoZW50cnkpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiKS5pbm5lckhUTUwgKz0gZW50cnlcclxufVxyXG5cclxuY29uc3Qgam91cm5hbERvbVJlbmRlciA9ICgpID0+IHtcclxuICBqb3VybmFsRGF0YU1hbmFnZXIuZ2V0Sm91cm5hbEVudHJpZXMoKVxyXG4gIC50aGVuKGVudHJpZXMgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgY29uc3Qgam91cm5hbEVudHJ5SFRNTCA9IGpvdXJuYWxIdG1sRW50cnkgKGVudHJ5KVxyXG4gICAgICBqb3VybmFsRE9NKGpvdXJuYWxFbnRyeUhUTUwpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxEb21SZW5kZXIiLCJpbXBvcnQgam91cm5hbERhdGFNYW5hZ2VyIGZyb20gXCIuL2RhdGFcIlxyXG5cclxuY29uc3Qgam91cm5hbEZvcm1NYW5hZ2VyID0ge1xyXG4gIGpvdXJuYWxIdG1sRm9ybTogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uc1wiPlxyXG4gICAgPGZpZWxkc2V0IGlkPVwiZGF0ZVwiPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiam91cm5hbERhdGVcIj5EYXRlIG9mIEVudHJ5PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImpvdXJuYWxEYXRlXCIgaWQ9XCJqb3VybmFsRGF0ZVwiPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgIDxmaWVsZHNldCBpZD1cImNvbmNlcHRcIj5cclxuICAgICAgPGxhYmVsIGZvcj1cImNvbmNlcHRzQ292ZXJlZFwiPkNvbmNlcHRzIENvdmVyZWQ8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29uY2VwdHNDb3ZlcmVkXCIgaWQ9XCJjb25jZXB0c0NvdmVyZWRcIj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICA8ZmllbGRzZXQgaWQ9XCJlbnRyeVwiPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiam91cm5hbEVudHJ5XCI+Sm91cm5hbCBFbnRyeTwvbGFiZWw+XHJcbiAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiam91cm5hbEVudHJ5XCIgaWQ9XCJqb3VybmFsRW50cnlcIiByb3dzPVwiMjBcIiBjb2xzPVwiNTBcIj5cclxuICAgICAgICAgICAgPC90ZXh0YXJlYT5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICA8ZmllbGRzZXQgaWQ9XCJtb29kXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJkYWlseU1vb2RcIj5Nb29kIGZvciB0aGUgRGF5PC9sYWJlbD5cclxuICAgICAgPHNlbGVjdCBpZD1cImRhaWx5TW9vZFwiPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJIYXBweVwiPkhhcHB5PC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhZFwiPlNhZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJPcHRpbWlzdGljXCI+T3B0aW1pc3RpYzwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCcm9rZW5cIj5Ccm9rZW48L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8aW5wdXQgaWQ9XCJyZWNvcmRfYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIj5cclxuXHJcbiAgICBcclxuICAgIGBcclxuICB9LFxyXG4gIG5ld3NDbGVhckZvcm06ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5XCIpLnZhbHVlID0gXCJcIlxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEZvcm1NYW5hZ2VyIiwiLy8gam91cm5hbEhUTUxFbnRyeSBpcyBhIEhUTUwgcmVwcmVzZW50YWlvbiBvZiB0aGUgZGF0YS4gIFRoaXMgaXMgaG93IHdlJ2QgbGlrZSB0byBzZWUgaXQgaW4gdGhlIGRvbS5cclxuXHJcblxyXG5jb25zdCBqb3VybmFsSFRNTEVudHJ5ID0gKGVudHJ5KSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJqb3VybmFsRW50cnlcIj5cclxuICAgICAgICAgICAgICAgIDxoMj4ke2VudHJ5LmNvbmNlcHR9PC9oMj5cclxuICAgICAgICAgICAgICAgIDxoMz5EYXRlOiAke2VudHJ5LmRhdGV9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxwPkVudHJ5OiA8YnI+JHtlbnRyeS5lbnRyeX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Nb29kIFRvZGF5OiA8YnI+JHtlbnRyeS5tb29kfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+PGJyPiBcclxuICAgICAgICAgICAgYFxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxIVE1MRW50cnkiLCIvLyByZW5kZXJpbmcgZnVuY3Rpb24gYWNjZXB0cyBhbiBlbGVtZW50IGFuZCBjb21wb25lbnQgYXJndW1lbnQsIHRhcmdldHMgZWxlbWVudCwgYW5kIGFwcGVuZHMgc3R1ZmYgdG8gdGhhdCBlbGVtZW50IGNvbmF0aW5lclxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCAoZWxlbWVudCwgY29tcG9uZW50cykgPT4ge1xyXG4vLyAgIGNvbnN0ICRjb250YWluZXIgPSAkKGAjJHtlbGVtZW50fWApXHJcbi8vICAgJGNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChjb21wb25lbnRzKVxyXG5cclxuLy8gfSIsImltcG9ydCBFbnRyeSBmcm9tIFwiLi9lbnRyeUZvcm1cIlxuaW1wb3J0IGdldEVudHJpZXMgZnJvbSBcIi4vZW50cmllc0RPTVwiXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2VudHJ5UmVuZGVyXCJcblxuXG4vLyBwb3N0IHByZXZpb3VzbHkgc2F2ZWQgZW50cmllcyB0byBkb20gb24gcGFnZSBsb2FkXG5nZXRFbnRyaWVzKClcbiAgLnRoZW4oZW50cnlMaXN0ID0+IHJlbmRlcihcImVudHJ5TG9nXCIsIGVudHJ5TGlzdCkpXG5cblxuXG4vLyBhZGQgY2xpY2sgZXZlbnQgdG8gcmVjb3JkIGJ1dHRvbiB0aGVuIGNyZWF0ZSBvYmogb24gY2xpY2ssIHBlcmZvcm0gXCJzYXZlXCIgbWV0aG9kIG9uIG5ldyBlbnRyeSwgdGhlbiB0YWtlIGEgc25hcHNob3Qgb2YgdGhlIHVwZGF0ZWQgZGF0YWJhc2UgYW5kIHBvc3QgdG8gZG9tXG4kKFwiI3JlY29yZF9idXR0b25cIikuY2xpY2soKCkgPT4ge1xuICBjb25zdCBlbnRyeSA9IG5ldyBFbnRyeSh7XG5cbiAgICBkYXRlOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxuICAgIGNvbmNlcHQ6ICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbCgpLFxuICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcbiAgICBtb29kOiAkKFwiI2RhaWx5TW9vZFwiKS52YWwoKVxuICB9KVxuXG4gIGVudHJ5LnNhdmUoKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIm5ldyBlbnRyeSBzYXZlZFwiLCBkYXRhKVxuICAgICAgcmV0dXJuIGdldEVudHJpZXMoKVxuICAgIH0pXG4gICAgLnRoZW4oZW50cnlMaXN0ID0+IHJlbmRlcihcImVudHJ5TG9nXCIsIGVudHJ5TGlzdCkpXG4gICQoXCIjam91cm5hbERhdGVcIikudmFsKFwiXCIpXG4gICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbChcIlwiKVxuICAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoXCJcIilcbiAgJChcIiNkYWlseU1vb2RcIikudmFsKFwiXCIpXG59KSJdfQ==
