(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// contactCollection
// This JS file directs us to the data
var _default = {
  // getJournalEntries performs a "GET" fetch to the entries DB
  getJournalEntries() {
    return fetch("http://localhost:8088/entries") // translate to javascript
    .then(response => response.json()) // .then below to get data later
    .then(entryData => entryData);
  },

  // saveJournalEntry performs a fetch "POST", .then converts data to javascript, .then hoists it up to be available for a later function
  saveJournalEntry(entry) {
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(data => data.json()).then(data => data).catch(error => `Something happened ${error.message}`);
  }

};
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
var _default = () => {
  return _data.default.getJournalEntries().then(entries => entries.map(entry => (0, _entryHTML.default)(entry)));
};

exports.default = _default;

},{"./data":1,"./entryHTML":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class of Entry to construct the properties of the entry object for the database
class Entry {
  constructor(props) {
    this.concept = props.concept;
    this.date = props.date;
    this.entry = props.entry;
    this.mood = props.mood;
  } // the getter called entryInfo returns an obj with the specified values


  get entryInfo() {
    return {
      concept: this.concept,
      date: this.date,
      entry: this.entry,
      mood: this.mood
    };
  } // a save method declared below to post new entries to the DB


  save() {
    return _data.default.saveJournalEntry(this.entryInfo);
  }

}

var _default = Entry;
exports.default = _default;

},{"./data":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// entryComponent is a HTML representaion of the data.  This is how we'd like to see it in the dom.
var _default = props => {
  const entryComponent = `
            <div class = "journalEntry">
                <h2>${props.concept}</h2>
                <h3>Date: ${props.date}</h3>
                <p>Entry: <br>${props.entry}</p>
                <p>Mood Today: <br>${props.mood}</p>
            </div>
            <br>
              `;
  return entryComponent;
};

exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// rendering function accepts an element and component argument, targets element, and appends stuff to that element conatiner
var _default = (element, components) => {
  const $container = $(`#${element}`);
  $container.empty().append(components);
};

exports.default = _default;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5Rm9ybS5qcyIsIi4uL3NjcmlwdHMvZW50cnlIVE1MLmpzIiwiLi4vc2NyaXB0cy9lbnRyeVJlbmRlci5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0E7ZUFHZTtBQUViO0FBQ0EsRUFBQSxpQkFBaUIsR0FBRztBQUNsQixXQUFPLEtBQUssQ0FBQywrQkFBRCxDQUFMLENBQ0w7QUFESyxLQUVKLElBRkksQ0FFQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFGYixFQUdMO0FBSEssS0FJSixJQUpJLENBSUUsU0FBRCxJQUFlLFNBSmhCLENBQVA7QUFLRCxHQVRZOztBQVdiO0FBQ0EsRUFBQSxnQkFBZ0IsQ0FBQyxLQUFELEVBQVE7QUFDdEIsV0FBTyxLQUFLLENBQUMsK0JBQUQsRUFBa0M7QUFDMUMsTUFBQSxNQUFNLEVBQUUsTUFEa0M7QUFFMUMsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUZpQztBQUsxQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLEtBQWY7QUFMb0MsS0FBbEMsQ0FBTCxDQU9KLElBUEksQ0FPRSxJQUFELElBQVUsSUFBSSxDQUFDLElBQUwsRUFQWCxFQVFKLElBUkksQ0FRQyxJQUFJLElBQUksSUFSVCxFQVNKLEtBVEksQ0FTRSxLQUFLLElBQUssc0JBQXFCLEtBQUssQ0FBQyxPQUFRLEVBVC9DLENBQVA7QUFVRDs7QUF2QlksQzs7Ozs7Ozs7Ozs7QUNKZjs7QUFDQTs7OztBQUdBO2VBQ2UsTUFBTTtBQUNuQixTQUFPLGNBQUksaUJBQUosR0FBd0IsSUFBeEIsQ0FBOEIsT0FBRCxJQUFhLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBSyxJQUFJLHdCQUFlLEtBQWYsQ0FBckIsQ0FBMUMsQ0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ1BEOzs7O0FBRUE7QUFDQSxNQUFNLEtBQU4sQ0FBWTtBQUNWLEVBQUEsV0FBVyxDQUFDLEtBQUQsRUFBUTtBQUNqQixTQUFLLE9BQUwsR0FBZSxLQUFLLENBQUMsT0FBckI7QUFDQSxTQUFLLElBQUwsR0FBWSxLQUFLLENBQUMsSUFBbEI7QUFDQSxTQUFLLEtBQUwsR0FBYSxLQUFLLENBQUMsS0FBbkI7QUFDQSxTQUFLLElBQUwsR0FBWSxLQUFLLENBQUMsSUFBbEI7QUFDRCxHQU5TLENBUVY7OztBQUNBLE1BQUksU0FBSixHQUFnQjtBQUNkLFdBQU87QUFDTCxNQUFBLE9BQU8sRUFBRSxLQUFLLE9BRFQ7QUFFTCxNQUFBLElBQUksRUFBRSxLQUFLLElBRk47QUFHTCxNQUFBLEtBQUssRUFBRSxLQUFLLEtBSFA7QUFJTCxNQUFBLElBQUksRUFBRSxLQUFLO0FBSk4sS0FBUDtBQU1ELEdBaEJTLENBa0JWOzs7QUFDQSxFQUFBLElBQUksR0FBRztBQUNMLFdBQU8sY0FBSSxnQkFBSixDQUFxQixLQUFLLFNBQTFCLENBQVA7QUFDRDs7QUFyQlM7O2VBd0JHLEs7Ozs7Ozs7Ozs7O0FDM0JmO2VBRWdCLEtBQUQsSUFBVztBQUN0QixRQUFNLGNBQWMsR0FDZjs7c0JBRWEsS0FBSyxDQUFDLE9BQVE7NEJBQ1IsS0FBSyxDQUFDLElBQUs7Z0NBQ1AsS0FBSyxDQUFDLEtBQU07cUNBQ1AsS0FBSyxDQUFDLElBQUs7OztlQU41QztBQVVBLFNBQU8sY0FBUDtBQUNILEM7Ozs7Ozs7Ozs7OztBQ2REO2VBSWUsQ0FBQyxPQUFELEVBQVUsVUFBVixLQUF5QjtBQUN0QyxRQUFNLFVBQVUsR0FBRyxDQUFDLENBQUUsSUFBRyxPQUFRLEVBQWIsQ0FBcEI7QUFDQSxFQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLE1BQW5CLENBQTBCLFVBQTFCO0FBRUQsQzs7Ozs7OztBQ1JEOztBQUNBOztBQUNBOzs7O0FBR0E7QUFDQSwyQkFDRyxJQURILENBQ1EsU0FBUyxJQUFJLDBCQUFPLFVBQVAsRUFBbUIsU0FBbkIsQ0FEckIsRSxDQUtBOztBQUNBLENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CLEtBQXBCLENBQTBCLE1BQU07QUFDOUIsUUFBTSxLQUFLLEdBQUcsSUFBSSxrQkFBSixDQUFVO0FBRXRCLElBQUEsSUFBSSxFQUFFLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsR0FBbEIsRUFGZ0I7QUFHdEIsSUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsR0FBdEIsRUFIYTtBQUl0QixJQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CLEdBQW5CLEVBSmU7QUFLdEIsSUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixHQUFoQjtBQUxnQixHQUFWLENBQWQ7QUFRQSxFQUFBLEtBQUssQ0FBQyxJQUFOLEdBQ0csSUFESCxDQUNTLElBQUQsSUFBVTtBQUNkLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQjtBQUNBLFdBQU8sMEJBQVA7QUFDRCxHQUpILEVBS0csSUFMSCxDQUtRLFNBQVMsSUFBSSwwQkFBTyxVQUFQLEVBQW1CLFNBQW5CLENBTHJCO0FBTUEsRUFBQSxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLENBQXNCLEVBQXRCO0FBQ0EsRUFBQSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixHQUF0QixDQUEwQixFQUExQjtBQUNBLEVBQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixDQUF1QixFQUF2QjtBQUNBLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixHQUFoQixDQUFvQixFQUFwQjtBQUNELENBbkJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gY29udGFjdENvbGxlY3Rpb25cclxuLy8gVGhpcyBKUyBmaWxlIGRpcmVjdHMgdXMgdG8gdGhlIGRhdGFcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblxyXG4gIC8vIGdldEpvdXJuYWxFbnRyaWVzIHBlcmZvcm1zIGEgXCJHRVRcIiBmZXRjaCB0byB0aGUgZW50cmllcyBEQlxyXG4gIGdldEpvdXJuYWxFbnRyaWVzKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcclxuICAgICAgLy8gdHJhbnNsYXRlIHRvIGphdmFzY3JpcHRcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAvLyAudGhlbiBiZWxvdyB0byBnZXQgZGF0YSBsYXRlclxyXG4gICAgICAudGhlbigoZW50cnlEYXRhKSA9PiBlbnRyeURhdGEpXHJcbiAgfSxcclxuXHJcbiAgLy8gc2F2ZUpvdXJuYWxFbnRyeSBwZXJmb3JtcyBhIGZldGNoIFwiUE9TVFwiLCAudGhlbiBjb252ZXJ0cyBkYXRhIHRvIGphdmFzY3JpcHQsIC50aGVuIGhvaXN0cyBpdCB1cCB0byBiZSBhdmFpbGFibGUgZm9yIGEgbGF0ZXIgZnVuY3Rpb25cclxuICBzYXZlSm91cm5hbEVudHJ5KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiBkYXRhKVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gYFNvbWV0aGluZyBoYXBwZW5lZCAke2Vycm9yLm1lc3NhZ2V9YClcclxuICB9XHJcbn0iLCJpbXBvcnQgZW50cnlDb21wb25lbnQgZnJvbSBcIi4vZW50cnlIVE1MXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcclxuXHJcblxyXG4vLyB0aGlzIGZ1bmN0aW9uIGlzIHJldHVybmluZyBhIFwiR0VUXCIgZmV0Y2ggYW5kIC50aGVuIHRha2luZyB0aGF0IGRhdGEgYW5kIG1hcHBpbmcgdGhyb3VnaCBhbGwgb2YgdGhlIG9iamVjdHMgaW4gdGhlIGFycmF5IHRvIGNyZWF0ZSBlbnRyeUNvbXBvbmVudCA9PiBhIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgZGF0YVxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgcmV0dXJuIEFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4oKGVudHJpZXMpID0+IGVudHJpZXMubWFwKGVudHJ5ID0+IGVudHJ5Q29tcG9uZW50KGVudHJ5KSkpXHJcbn0iLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxyXG5cclxuLy8gY2xhc3Mgb2YgRW50cnkgdG8gY29uc3RydWN0IHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBlbnRyeSBvYmplY3QgZm9yIHRoZSBkYXRhYmFzZVxyXG5jbGFzcyBFbnRyeSB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHRoaXMuY29uY2VwdCA9IHByb3BzLmNvbmNlcHRcclxuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcclxuICAgIHRoaXMuZW50cnkgPSBwcm9wcy5lbnRyeVxyXG4gICAgdGhpcy5tb29kID0gcHJvcHMubW9vZFxyXG4gIH1cclxuXHJcbiAgLy8gdGhlIGdldHRlciBjYWxsZWQgZW50cnlJbmZvIHJldHVybnMgYW4gb2JqIHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZXNcclxuICBnZXQgZW50cnlJbmZvKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29uY2VwdDogdGhpcy5jb25jZXB0LFxyXG4gICAgICBkYXRlOiB0aGlzLmRhdGUsXHJcbiAgICAgIGVudHJ5OiB0aGlzLmVudHJ5LFxyXG4gICAgICBtb29kOiB0aGlzLm1vb2RcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGEgc2F2ZSBtZXRob2QgZGVjbGFyZWQgYmVsb3cgdG8gcG9zdCBuZXcgZW50cmllcyB0byB0aGUgREJcclxuICBzYXZlKCkge1xyXG4gICAgcmV0dXJuIEFQSS5zYXZlSm91cm5hbEVudHJ5KHRoaXMuZW50cnlJbmZvKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW50cnkiLCIvLyBlbnRyeUNvbXBvbmVudCBpcyBhIEhUTUwgcmVwcmVzZW50YWlvbiBvZiB0aGUgZGF0YS4gIFRoaXMgaXMgaG93IHdlJ2QgbGlrZSB0byBzZWUgaXQgaW4gdGhlIGRvbS5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgZW50cnlDb21wb25lbnQgPVxyXG4gICAgICAgIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFwiam91cm5hbEVudHJ5XCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+JHtwcm9wcy5jb25jZXB0fTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8aDM+RGF0ZTogJHtwcm9wcy5kYXRlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8cD5FbnRyeTogPGJyPiR7cHJvcHMuZW50cnl9PC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+TW9vZCBUb2RheTogPGJyPiR7cHJvcHMubW9vZH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgYFxyXG4gICAgcmV0dXJuIGVudHJ5Q29tcG9uZW50XHJcbn0iLCIvLyByZW5kZXJpbmcgZnVuY3Rpb24gYWNjZXB0cyBhbiBlbGVtZW50IGFuZCBjb21wb25lbnQgYXJndW1lbnQsIHRhcmdldHMgZWxlbWVudCwgYW5kIGFwcGVuZHMgc3R1ZmYgdG8gdGhhdCBlbGVtZW50IGNvbmF0aW5lclxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZWxlbWVudCwgY29tcG9uZW50cykgPT4ge1xyXG4gIGNvbnN0ICRjb250YWluZXIgPSAkKGAjJHtlbGVtZW50fWApXHJcbiAgJGNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChjb21wb25lbnRzKVxyXG5cclxufSIsImltcG9ydCBFbnRyeSBmcm9tIFwiLi9lbnRyeUZvcm1cIlxuaW1wb3J0IGdldEVudHJpZXMgZnJvbSBcIi4vZW50cmllc0RPTVwiXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2VudHJ5UmVuZGVyXCJcblxuXG4vLyBwb3N0IHByZXZpb3VzbHkgc2F2ZWQgZW50cmllcyB0byBkb20gb24gcGFnZSBsb2FkXG5nZXRFbnRyaWVzKClcbiAgLnRoZW4oZW50cnlMaXN0ID0+IHJlbmRlcihcImVudHJ5TG9nXCIsIGVudHJ5TGlzdCkpXG5cblxuXG4vLyBhZGQgY2xpY2sgZXZlbnQgdG8gcmVjb3JkIGJ1dHRvbiB0aGVuIGNyZWF0ZSBvYmogb24gY2xpY2ssIHBlcmZvcm0gXCJzYXZlXCIgbWV0aG9kIG9uIG5ldyBlbnRyeSwgdGhlbiB0YWtlIGEgc25hcHNob3Qgb2YgdGhlIHVwZGF0ZWQgZGF0YWJhc2UgYW5kIHBvc3QgdG8gZG9tXG4kKFwiI3JlY29yZF9idXR0b25cIikuY2xpY2soKCkgPT4ge1xuICBjb25zdCBlbnRyeSA9IG5ldyBFbnRyeSh7XG5cbiAgICBkYXRlOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxuICAgIGNvbmNlcHQ6ICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbCgpLFxuICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcbiAgICBtb29kOiAkKFwiI2RhaWx5TW9vZFwiKS52YWwoKVxuICB9KVxuXG4gIGVudHJ5LnNhdmUoKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIm5ldyBlbnRyeSBzYXZlZFwiLCBkYXRhKVxuICAgICAgcmV0dXJuIGdldEVudHJpZXMoKVxuICAgIH0pXG4gICAgLnRoZW4oZW50cnlMaXN0ID0+IHJlbmRlcihcImVudHJ5TG9nXCIsIGVudHJ5TGlzdCkpXG4gICQoXCIjam91cm5hbERhdGVcIikudmFsKFwiXCIpXG4gICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbChcIlwiKVxuICAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoXCJcIilcbiAgJChcIiNkYWlseU1vb2RcIikudmFsKFwiXCIpXG59KSJdfQ==
