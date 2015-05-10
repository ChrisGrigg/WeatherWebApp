# WeatherWebApp

An app where users can enter cities they would like to see weather for and view a list.

TODO:

- Data is not pertinent, it is just saved to an Array. Utilise a db, ideally Mongo to create a registration and login system.
- Weather is not updated with new data. Ideally the 'setInterval()' Javascript syntax would be utilised to loop through the list of cities and update the weather on each in the Angular Controller.
- The 3 day forecast is not displayed. The extra data could be obtained from the Open Weather Map API and displayed in each list item.
- The list cannot be ordered manually. The 'id' attribute of the list item would need to be edited.
- Form validation is not implemented so the user can type anything in the input field. An error is given so the app does not crash however. Ideally autocomplete would utilised to suggest Australian cities.

Quick Start

Install Node.js and then:

- git clone git://github.com/ChrisGrigg/WeatherWebApp/
- cd WeatherWebApp
- npm install
- npm install gulp -g
