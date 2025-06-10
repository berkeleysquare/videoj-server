# Kindler
## Overview
Kindler includes a utility to download a Kindle library from Amazon's cloud reader (/public/util/console_download.js) and a viewer to dispaly the JSON download.

## Download a Kindle library
Open the [Cloud Kindle Viewer](https://read.amazon.com)

Open the browser console (F12|ctl-shift-I|More Tools -> Developer tools). Go to Console tab.

Paste the snippit from /public/util/console_download.js into the console; hit return. (For a CSV file change the output_format variable.)

The page will redirect to a page containing the data. Select all, copy, and paste into a new .json file.

Copy the json file to /public/books/books_all.json

## Open the viewer
### dev server
Install yarn or npm. Run npm start or yarn start.

Open http://localhost:3000
### build
Install yarn or npm. Run npm run build or yarn build.
### deploy
Copy build or release to a web server. Or run python server (python3 -m http.server)

Open http://localhost:8000

## Credits and More


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

The downloader is based on a Gist from @usayamadx:

https://gist.github.com/usayamadx/9c638d9b70bc714d6dd6043fcd54085f 

# DEMO
https://jkboxed.com/kindler/

