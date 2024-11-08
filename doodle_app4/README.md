# Demonstration of Doodle Application

## Version 4

We enhance the Electron client by allow the user to choose a local PNG
and load it into the canvas. There are a few async operations involved,
both in file loading part and rendering part. Please study the code.

## Version 3

In this version, we allow uploading the canvas to the server and saved as static PNG files for later access via URL `/doodles/<png file name>`. There ar also new endpoints for serving the uploaded doodles:
 * POST `/doodle/upload` for uploading
 * GET `/doodle/api/random/<n>` for getting a JSON list of `n` random PNG names
 * GET `/doodle/random/<n>` for getting a list of `n` random HTML IMGs based on the available PNGs
 * GET /showcase for periodically show a random doodle

An enhancement is also implemented:
 * Resize canvas when the window size is changed

## Version 2

In this version, we demonstrate the capability of saving the drawing
to a local PNG file. The Electron app exposes the local API for saving
to image file. If the local API is available, the save button appears;
otherwise the button is hidden. The version distinguishes the type of
a client and provide a different feature.

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
