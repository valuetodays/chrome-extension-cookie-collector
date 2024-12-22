# chrome-extension-cookie-collector

## description

This extension will send your encrypted 'local cookie' to SPECIFIED SERVER that can be used in any other applications.

## install

open chrome.
type chrome://extensions/ in address bar.
turn on 'Developer mode'.
click 'Load Unpacked'.
choose directory where manifest.json locates.

## usage

- config your server in options page
  - [ ] add some excludes site
- [x] click extension icon or Ctrl+shift+F
- [x] auto push cookie when url changes

## remark

### How does popup.js call method in service_worker.js

Use `message`, see `queyrCookieAndPushToServer` in popup.js and `chrome.runtime.onMessage.addListener` in service_worker.js.
