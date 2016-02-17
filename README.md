# Logger

A self-hosted application for remotely watching log files through a web UI.

**NOTE:** This application is currently in alpha stages of development. If you experience any bugs, please report them through the [GitHub repo](http://github.com/logger-app/logger-app).

If you want to understand the planned progression of this application, releases are currently detailed in a [todo list within this repository](./docs/TODO.md).

## Installation

Install this app using NPM: `npm install -g logger-app`

Then run the using the command `logger-app`.
This will run the app on the default ports, `8080` for the web server and `3030` for the API. If you need to change these, see the below details on configuration.

### Offline Installation

If you would like to deploy this to a server which doesn't have an outgoing internet connection or can't access the NPM repo, do so using [npmbox](https://www.npmjs.com/package/npmbox). You will first need to install NodeJS/NPM and npmbox offline, this is a relatively easy and well documented process.

## App Configuration

By default the app will run the UI server on port `8080` and the API server on port `3030`. These, and other values, can be changed using the following methods:

### 1. Through the web UI

You can access the app settings through the web UI. There you can change various app settings and they will be saved back to whichever config file you are using (see below).

So if you don't want to have to manually edit any config, start the app, make your changes through the UI and then restart the app for them to take effect.
*Note:* Only port value changes need an app restart.

### 2. Pre-packaged config file

When installed the app comes with a default config file, stored in the root NPM module folder. This file is called `system.json`. This file is automatically used by the app if no command-line override is given. You can manually make your config changes here and restart the app for them to take effect. If any essential properties are missing from this file then they will be created with default values on startup.

### 3. External config file

You can use the command-line parameter `--config [file]` or `-c [file]` to specify specific config file to be used instead to the pre-packaged file. This file should contain the same properties as the pre-packaged file, so take a copy of that if you need to create one. This must be a JSON file and can be stored anywhere that the app process has access to. If any essential properties are missing from this file then they will be created with default values on startup.

### 4. Command-line overrides

You can override app config values by passing command line arguments, either `--port [port]` and `--apiport [apiport]` or `-p [port]` and `-a [apiport]`. These settings can be used along side a config file but will always override the values found there.

## System Configuration

The method of adding/editing/deleting groups and logs through the UI is currently in development. Please make your changes manually in either of the two config file methods mentioned above.

## How it works

This project is a fork of the brilliant [react-redux-universal-hot-example boilerplate](https://github.com/erikras/react-redux-universal-hot-example).
