# TODO

### Essential Improvements

Log Level management tool.

`componentDidUpdate` tracker on everything.

Ensure only essential `componentDidUpdate`'s are happening.

Reconnect socket connections automatically, toast errors.

### Improvements

Compute derived data such as active logs using Reselect.

Standardise active group and normal group components.

Get consistency across use of `.isRequired` on props.

Get consistency on use of `fetchData` vs `fetchDataDeferred`

### Unassigned Features

Regex based search boxes

Highlight matched text on searched pages

Parallax effect on 404 page

Disconnect all button on Dashboard page.

Download log file

Download current log output. Generate on client-side using base64 encoding:
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

Backtrack X amount of lines (if possible) when starting to tail log

### Release 1

Config option to use real or fake websockets (for internal proxies)

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

Log level matching, analysis view and output filtering (with management through UI)

Syntax highlighting (with management through UI)

### Release 5

Admin status per group, users can add people/logs to a group if they are a admin of it

