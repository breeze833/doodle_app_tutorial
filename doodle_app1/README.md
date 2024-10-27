# Demonstration of Doodle Application

## Version 1

In this version, we add the Electron desktop app. It fetches the web service
at _http://localhost:3000/_ by default. This vsersion is intended for testing
that the client and the server are speparated. There are two steps to make it
work:
 1. go to doole\_serve and use _npm start_ to start the service
 2. goto doodle\_client and use _npm start_ to launch the Electron app

If you can omit the first step and the Electron app works, that implies
something wrong with the setup.

## Version 0

In this version, we adapt a web-based doodle page to the Express framework.
The original source files are available as static files:
 * public/doodle.html
 * public/stylesheets/style.css
 * public/javascripts/script.js

The adopted files for Express are:
 * view/index.pug
 * public/stylesheets/style.css
 * hyperscripts/script.\_hs

You may try them after start the Express app
 * http://localhost:3000/doodle.html (the orignal version)
 * http://localhost:3000/ (the adapted version)
