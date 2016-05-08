



# Logger

## Releases

### Version 1.0

Essential feature complete release. Also requires redundant code to be removed.

### Version 1.1

User authentication enabled. But no group based access system. Management of users through UI.

### Version 1.2

Access Control lists on Groups. Potentially Admins per group, other wise only the main admin can assign users to groups and create logs.

### Version 1.3

Addition of remote log groups

- With SSH key or password access?
- Maybe split SSH keys into later release

### Version 1.4

Log level matching, analysis view and output filtering (with management through UI)

Syntax highlighting (with management through UI)





## Current Release tasks

### Essential

1. **Edit Log form API**
   1. Edit Name
   2. Edit Group
   3. Edit File
   4. Edit Path


2. **Channel all async events through a new notifications redux state**
   1. Successes:
        1. Edit log name
        2. Edited log group
        3. Edited log file
        4. Edited log path

   2. Fails:
      1. Edit log
3. ~~Kill listeners for a Log when it is deleted (test current behaviour)~~
4. ~~Base active Tailer sessions on ID not file~~
5. ~~Base socket rooms on log ID~~
6. ~~Try moving or changing permissions on the config file while server is running, may need to protect against this~~
7. ~~Make file name and path a reasonable length and protect against overflow~~
8. ~~Correct user input max lengths~~
   1. ~~Group name: 15~~
   2. ~~Log name: 15~~
   3. ~~Log file: 1000~~
   4. ~~Log path: 1000~~
9. Test what happens when a log file's permissions are changed or it is moved while being watched


### Extras

1. ~~Line numbers on logs~~
2. ~~Sticky headers on Settings~~
3. ~~Box-sizing *~~
4. ~~Make all user generated titles etc use CSS ellipsis when too log~~
5. Get create/edit log form to submit with enter key - issue with multiple` input` tags
6. Notifiaction improvements:
   1. Add overflow indicator
   2. Add clear all button


1. Client side validation and field specific error messages on:

   - New/Edit Group Name
   - New/Edit Log File
   - Edit App Settings
2. Add learn more links like to app errors for futher explanation in docs
   1. Tail fail
   2. C/E/D Groups
   3. C/E/D Logs
   4. App Settings







## Unassigned Tasks

### Small

- Make Dashboard group headers links
- Highlight current page in NavPanel
- Make notification count down reverese when hovering

### Medium

- Get consistency across use of `.isRequired` on props.

### Large

- Stop the server from saving changes until the config file write returns successfully
  - I.e. when permission of the file is lost


- Regex based search boxes


- Download log file


- Download current log output. Generate on client-side using base64 encoding:

```
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

- Backtrack X amount of lines (if possible) when starting to tail log


- Disconnect all button on Dashboard page.
- Safe deletes, i.e. only deletign log once listeners have disconnected
- Auto-update with changes made to config file manually
  - Make this an optional App Setting
  - Either watch for changes or detect using polling






## Technical Improvements

- Standardise page headers

- Standardise Management page phase-in panels

  - Make panel only mount just prior to being visible



- Update as many non-breaking NPM dependancies as possible

- At least think about some testing

  ​
