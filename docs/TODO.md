# TODO

### Version 0.6

Get consistency across use of `.isRequired` on props.

Get consistency on use of `fetchData` vs `fetchDataDeferred`

Enable real native web sockets

### Version 0.7

Management of app config through config file, given or default

Optional commandline override for app config options

### Version 0.8

Management of app config through UI with changes being saved back to config file

### Version 0.9

Break down redux reducer into multilpe nested reducers

Removal of unused boilerplate code

### Version 1.0

Management of groups and logs through UI

### Version 1.1

Addition of optional user auth

Management of users through UI

Show member users on group page (if admin)

### Version 1.2

Addition of remote log groups
 - With SSH key or password access?
 - Maybe split SSH keys into later release

### Version 1.3

Log level matching, analysis view and output filtering (with management through UI)

Syntax highlighting (with management through UI)

### Version 1.4

Admin status per group, users can add people/logs to a group if they are a admin of it

### Future features

Regex based search boxes

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

### Unsure features

Disconnect all button on Dashboard page.
