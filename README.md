# MARKFLY

Live Markdown previewer

## Install

```bash
npm install -g markfly
```

## Features

* Live update without reloading the page.
* Scrolling options, to always keep the important text visible
* Syntax highlighting for code blocks
* Multiple browser connections
* Editor agnostic. It's only a webapp.
* Works on Linux and MacOSX. Windows still needs to be tested.

## Usage
In a terminal window, run `markfly <mardown file>`, and point a browser to localhost:8494. You should see a compiled version of your file.

Edit the markdown file, and the change should reflect instantly in the browser preview.

### Scrolling Modes
There are two scrolling modes available just yet, accessible with the icons on the right of the screen. *Fix Scroll*, the first icon, will make the browser window to not scroll when the content changes. The *Pin Down* icon (with an arrow), will make the window to scroll to the bottom whenever text changes.

Still in development a smart scrolling option, that will detect where the change occurred, and scroll accordingly.

## License
Markfly is released under __ISC__ License. Click [here](http://opensource.org/licenses/ISC) for details.

## TODOS
* Detect content that changed for better scrolling
* Improve the cli with some arguments:
  * -p to select the port. Will default to 8494.
  * -h to select the websocket host. Default to localhost.
* Include some control routes, such as __/set-content__ and __/config__, for use in editor extensions.
* Test on windows.
