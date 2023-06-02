# Where in the world is cs?

## Description
A javascript based website that allows for users to input a coordinate in various forms to be then marked on a leaflet map at that point, with the additional ability to name said marker on the leaflet map


## Running the program
open a console and cd into the working directory of myapp, from there run either npm run start or npm run devstart, and from there users can navigate to localhost:3000 in a browser in order to view and interact with the webapp


## App.js
A file used to create the routers for the website, contains routes to index, and two defunct pages that were intended for other features, map and users

## views(error.pug, index.pug, layout.pug, map.pug)
Pug files used to create the basic html layout for the pages, error is used when opening pages that dont exist and map is used in the now defunct map route, while index and layout are used to give the html for the final version of the web application

## routes
index.js is the only file used within here currently and is used to route to the index page

## public/javascripts
contains two key files as well as the leaflet information, the GeoJSON.json file, which contains some example markers as default, and allows for storage of new markers added into the file. index.js contains the javascript for the page

## index.js
The java script within this file handlles creating the map object, and allocating its pointers, as well as handling new inputs coordinates and managing adding new pointers for them.

# hasComma(s)
checks if input string contains commas

# hasWhiteSpace(s)
checks if input string contains spaces

# isNumber(c)
checks if input char is a number

# hasDash
checks if input string has dashes

# writeToJson(lat,long,extra)
stores the input lat and long in the GeoJson file, with extra being an optional add-on to add a name to the marker

# fetchJsonData()
gets the jsonfile to be able to be used by the javascript in this file

# removeCommas(str)
removes the commas from within a string to make manipulation and use of the string easier

# removeDegree(str)
removes any degree symbols from the string to make handling it easier

# dirCheck(northSouth,eastWest)
checks the given chars direction, be it north or south, and east or west

# numCheck(s)
checks to see if the string contains only numbers, and that it dosent contain a number at the start

# hasdot(s)
checks to see if the string contains any "." chars

# hasMins(s)
checks to see if the string contains any mins chars
# hasSecs(s)
checks to see if the string contains any secs chars
# hasN(s)
checks to see if the string contains any N chars
# hasS(s)
checks to see if the string contains any S chars

# sixOrLess(s)
checks to see if a string has 6 or less chars in it, used to make sure the decimal limit for correct formating is met

# hasNoLetters(s)
Checks to see if the string has no letters in it

# findSpaceIndex(num, String)
Finds the nth spaces index in the string

# degreeDecimalMins(input)
Formats and checks a string if its in the format of decimal mins, to see if the coordinate entered is in the correct fomrat, before then storing it in the json file and adding a marker on the map

# dmsHandle(input)
Formats and checks a string if its in the format of degree mins seconds, to see if the coordinate entered is in the correct fomrat, before then storing it in the json file and adding a marker on the map

# handleSubmit(input)
Formats and checks a string if its in the non dms or decimal degree format, if it is pass those to the prior two methods,else check to see if the coordinate entered is in the correct fomrat, before then storing it in the json file and adding a marker on the map