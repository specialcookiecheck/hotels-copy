# hotels

This app allows users to search for and store their favourite hotels. Once hotels have been added to hotel lists,
user will see their added hotels with on the map for that particular list, and all their hotels in general on their dashboard.

An admin account is generated automatically when the app starts, to login use "admin" in both fields (email checking is disabled while
the app is in development, to make for easier testing). The admin can see everything that has been added by all users on the dashboard
(except the user's password), can delete everything (which automatically deletes all subdocuments as well), and the admin can edit user details.
The admin dashboard also shows all the hotels for all the user on a map, and shows database statistics.

Unfortunately a problem did crop up towards the very end related to "Leaflet" unsecured CSS files so not all functionality can
be seen on Render, and Render renders with some errors, but it is working properly on localhost which I'm happy to show.

Also, the aggregate tests don't work properly, I suspect because of a database delay, but the individual tests all work

Enjoy!

<br>
<h1> References </h1>
- https://www.freecodecamp.org/news/the-ultimate-guide-to-git-merge-and-git-rebase/
- https://stackoverflow.com/questions/10081452/how-to-drop-a-database-with-mongoose
- https://axios-http.com/docs/handling_errors
- https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
- https://www.npmjs.com/package/firebase
- https://firebase.google.com/docs/database/web/read-and-write?authuser=0&hl=en
- https://firebase.google.com/docs/database/web/lists-of-data?authuser=0&hl=en
- https://firebase.google.com/docs/admin/setup?hl=en&authuser=0&_gl=1*1njkxt7*_ga*MTg4MzQwNTU0NS4xNzA5MjI1MDQy*_ga_CW55HF8NVT*MTcwOTgwNTg1Ny45LjEuMTcwOTgwNzQ2Mi42MC4wLjA.
- https://github.com/firebase/quickstart-nodejs/blob/master/database/index.js
- https://firebase.google.com/docs/firestore/query-data/get-data
- https://stackoverflow.com/questions/72190763/find-documents-by-child-value
- https://firebase.google.com/docs/firestore/manage-data/delete-data
- https://stackoverflow.com/questions/12297959/access-properties-of-the-parent-with-a-handlebars-each-loop
- https://stackoverflow.com/questions/42583298/bulma-how-do-you-center-a-button-in-a-box
- https://firebase.google.com/docs/firestore/query-data/aggregation-queries
- https://medium.com/@nargessmi87/how-to-embede-open-street-map-in-a-webpage-like-google-maps-8968fdad7fe4
- https://medium.com/@nargessmi87/how-to-customize-the-openstreetmap-marker-icon-and-binding-popup-ab2254bddec2
- https://apidocs.geoapify.com/samples/autocomplete/autocomplete-tutorial/#step-1
- https://jsfiddle.net/Geoapify/akzrtm26/
- https://www.geoapify.com/tutorial/how-to-implement-geocoding-javascript-tutorial
- https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array


<br>
<h1> Image sources </h1>
- https://upload.wikimedia.org/wikipedia/commons/8/87/Piran_Portoro%C5%BE_Kempinski_Palace_Hotel-4500.jpg
- https://cdn.iconscout.com/icon/free/png-256/free-hotel-512-453740.png
(images not shown or hosted on the website are not included)