# chrome-extension-cookie-collector

## Description

This extension will send your encrypted 'local cookie' to SPECIFIED SERVER that can be used in any other applications.

## Installation

- Open chrome.
- Type `chrome://extensions/` in address bar.
- Turn on 'Developer mode'.
- Click 'Load Unpacked'.
- Choose directory where manifest.json locates.

## Usage

- [x] config your server in options page
  - [x] add target url to receive cookie
  - [x] add exclude domains
  - [x] show options in json format
  - [x] save options in json format
- [x] click extension icon or Ctrl+shift+F
- [x] auto push cookie when url changes

## Remark

### How does popup.js call method in service_worker.js

Use `message`, see `queyrCookieAndPushToServer` in popup.js and `chrome.runtime.onMessage.addListener` in service_worker.js.
