# Logger

## Future Features

 - Remote groups
 - Access Control lists
 - Configurable log output font-size


## Performance Considerations

It took 10 minutes for a log to render a change from 3,500 to 12,100 log lines where the the new 8,600 lines where produced within a 1 minute burst.
Another log was also active throughout this 10 minute period which had around 800 before the burst and 1,300 after the app finished rendering the burst.

Render time between log output page changes remained under/around 1 to 2 seconds.

Another browser was watching the slower log throughout this test and its performance was unaffected.


## To Do


### Release 0

Extend search filter to log file path.

Sticky header on group pages when they overflow.

Add dynamic title tag based on current page.

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

### Potential Features

Regex based search boxes

Parallax effect on 404 page

Disconnect all button on Dashboard page.

Download log file

Backtrack X amount of line when starting to tail log

### Essential Improvements

Removal of console output on client-side code or a Log Level management tool.

COMPONENTDIDUPDATE tracker on everythinggggggg


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
