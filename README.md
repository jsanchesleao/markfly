# MARKFLY

Live Markdown Previewer

## Install

```bash
npm install -g markfly
```

## Features

* Live update without reloading the page.
* Automatically scrolls to match text changes!
* Scrolling options, to always keep the important text visible
* Syntax highlighting for code blocks (powered by highlight.js)
* Multiple browser connections
* Editor agnostic. It's only a webapp.
* Works on Linux and MacOSX. Windows still needs to be tested.

## Usage
In a terminal window, run `markfly <mardown file>`, and point a browser to localhost:8494. You should see a compiled version of your file.

Edit the markdown file, and the change should reflect instantly in the browser preview.

### Command Line Arguments

* __--port__: the port to run the server. Default is 8494
* __-p__: alias to --port
* __--host__: the host to connect websockets. Default is localhost.
* __-h__: alias to --host

```bash
markfly --port=9000 myfile.md #opens in localhost:9000

markfly -p9000 myfile.md      #same as previous, shorter

markfly --host=192.168.10.10  #changes the host
                              #could also be -h192.168.10.10
```

### Scrolling Modes
There are three scrolling modes available just yet, accessible with the icons on the right of the screen. 
* *Smart Scroll* will make the screen scroll to match the last change!!!
* The *Pin Down* icon (with an arrow), will make the window scroll to the bottom whenever text changes.
* *Fix Scroll*, will make the browser window to not scroll at all when the content changes. 

## License
Markfly is released under __ISC__ License. Click [here](http://opensource.org/licenses/ISC) for details.

## TODOS
* Include some control routes, such as __/set-content__ and __/config__, for use in editor extensions.
* Check smart scroll accuracy across different browsers.
* Test on windows.
