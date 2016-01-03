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

Nav section overflow scroll management.

Removal of console output on client-side code or a Log Level management tool

No logs matching filter indicator

COMPONENTDIDUPDATE tracker on everythinggggggg


## Done

Active Logs nav section doesn't shrink after has had logs closed from it.

Add active lists groups pages.

Add no logs indicator to group pages and nav groups.

Add full logs list groups to dashboard page.

Clear hasNew when navigating to log output page, currently on happens if you are on log output page and a new line comes in.

Add functionality to clear output button

Add new indicator state for when log is inactive but is holding log output

Potential bug where output sits in paused log buffer, then the user stops watching, starts again, then paused and then starts again. The stale output from earlier will be added to the main output in the wrong position.

Dashboard list filtering.
