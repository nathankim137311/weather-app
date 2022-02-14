# [Weather App](https://nathankim137311.github.io/weather-app/)

## Description
A simple weather app that fetches current weather forecast based on city. 

## Demo
![weather_demo](https://user-images.githubusercontent.com/46698958/153813400-0e61d713-6283-4ce9-9867-7a450514ada9.gif)

## Features
* Toggle Celsius / Fahrenheit
* Flip card
* Smooth CSS animations
* Search by city
* Current date and time 
* Today's weather forecast

## Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Questions 
### What was your motivation?
I wanted to learn as much as possible about how to recieve data from an API and render the data on to my web page. 

### Why did you build this project?
I built this project because I wanted to experiment with design and CSS animations. And I wanted to learn how to fetch data from an API. 

### What did you learn?
* Fetching data from an API
* Postman for testing
* Query strings
* CSS animations

## Challenges
* CSS Animations
* Query String Parameters
* Design

### CSS Animations
I found it very difficult to time the CSS animations correctly. I had to tinker with it using setTimeout method. 

### Query String Parameters
I found it difficult to use Postman and read the OpenWeather documentation because I did not know the anatomy of the query strings. I wanted to search the city and get weather data, so I had to turn the URL into a string literal and pass in a variable for the search input value.

### Anatomy of a Query String
![Query String](https://cdn.discordapp.com/attachments/665341028403773465/942676526296600596/urlparametercomponents.png)

### Solution

```JavaScript
// Before 
fetch('http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=123123324');

// After 
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key1}`);
```

## Reflection
I would have added more features to my app and perhaps added a weekly forecast section to allow for more functionality and ease of use. In the end, I am proud by how it turned out. 
