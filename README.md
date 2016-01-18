# Logger

A self-hosted application for remotely watching log files through a web UI.

**NOTE:** This application is currently in alpha stages of development. If you experience any bugs, please report them through the [GitHub repo](http://github.com/logger-app/logger-app).

If you want to understand the planned progression of this application, releases are currently detailed in a [todo list within this repository](./docs/TODO.md).

## Configuration

Currently details such as server port aren't configurable, these will be added soon after some performance improvements.

The log files to be watched should be manageable through the web UI but is currently in development. The file that stores these details is [system.json](./system.json) in the base folder of this application, make the change manually there for now.

## How it works

This project is a fork of the brilliant [react-redux-universal-hot-example boilerplate](https://github.com/erikras/react-redux-universal-hot-example).
