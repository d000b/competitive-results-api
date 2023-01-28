# Competitive Results API
An API to get the latest results from CSGO, Valorant and Overwatch tournaments. 

# Built with
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Cheerio](https://cheerio.js.org/)

# Getting started

## Pre-requisites
- Install [Node.js](https://nodejs.org/en/)

## Installation
- Clone the repository

- Install dependencies
```
npm install
```
- Run the project
```
node index.js
```
  Navigate to `http://localhost:8080`

# There is one route to each game:
- Data is acquired through scraping different pages which are the main news site of each game, hence the amount of data may vary among them.

## CS:GO: `/csgo`
![](images/csgo.PNG)

## Valorant: `/valorant`
![](images/vava.PNG)

## Overwatch: `/overwatch`
![](images/overw.PNG)

