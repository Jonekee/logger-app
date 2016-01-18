# TODO

### Essential Improvements

Removal of console output on client-side code or a Log Level management tool.

COMPONENTDIDUPDATE tracker on everythinggggggg.

Normalize state structure for more efficient updates.

Compute derived data such as active logs using Reselect.

### Unassigned Features

Config option to use real or fake websockets (for internal proxies)

Regex based search boxes

Highlight matched text on searched pages

Parallax effect on 404 page

Disconnect all button on Dashboard page.

Download log file

Download current log output (generate on client-side using base64 encoding
```javascript
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
```
)

Backtrack X amount of lines when starting to tail log

Reconnect socket connections automatically, toast errors

### Release 0

Make everything required, and defer rendering of Page components until state has been loaded

### Release 1

Management of groups and logs through UI

### Release 2

Addition of optional user auth

Management of users through UI

Show member users on group page (if admin)

### Release 3

Addition of remote log groups
 - With SSH key or password access?
 - Maybe split SSH keys into later release

### Release 4

Log level matching, analysis view and output filtering

Syntax highlighting

Management through UI

### Release 5

Admin status per group, users can add people/logs to a group if they are a admin of it


### Done

Active Logs nav section doesn't shrink after has had logs closed from it.

Add active lists groups pages.

Add no logs indicator to group pages and nav groups.

Add full logs list groups to dashboard page.

Clear hasNew when navigating to log output page, currently on happens if you are on log output page and a new line comes in.

Add functionality to clear output button

Add new indicator state for when log is inactive but is holding log output

Potential bug where output sits in paused log buffer, then the user stops watching, starts again, then paused and then starts again. The stale output from earlier will be added to the main output in the wrong position.

Dashboard list filtering.

Nav section overflow scroll management.

No logs matching search filter indicator on group pages and dashboard page.

Add dynamic title tag based on current page.

Sticky header on group pages when they overflow.

Nav group list is cut off at large list lengths.

Add focus highlights to buttons and anchors for keyboard based nav.
  - Includes: Nav a and button tags, search inputs, group logs list items, log page buttons

Skip over closed nav groups when navigating using keyboard.

Extend search filter to log file path.
