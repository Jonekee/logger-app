# Logger

A self-hosted application for remotely watching log files through a web UI.

**NOTE:** This application is currently in alpha stages of development. If you experience any bugs, please report them through the [GitHub repo](http://github.com/logger-app/logger-app).

If you want to understand the planned progression of this application, releases are currently detailed in a [todo list within this repository](./docs/TODO.md).

## Installation

Install this app using NPM: `npm install -g logger-app`

Then run the using the command `logger-app`

## Configuration

By default the app will run the UI server on port 8080 and the API server on port 3030. You can override this by passing command line arguments, either `--port [port]` and `--apiport [apiport]` or `-p [port]` and `-a [apiport]`.

Alternatively you can specify the properties `"port"` and `"apiport"` in a JSON config file which you provide using the command line argument `--config [file]` or `-c [file]`. Command line port arguments will override config port settings.

The log files to be watched should be manageable through the web UI but is currently in development. The file that stores these details is [system.json](./system.json) in the base folder of this application, make changes manually there for now.

## How it works

This project is a fork of the brilliant [react-redux-universal-hot-example boilerplate](https://github.com/erikras/react-redux-universal-hot-example).
