## Preview 
:sparkles:**[Checkout the live link](https://will-and-skill-challenge.herokuapp.com)** :balloon: 

#### Run the app locally 
1. `git clone` to clone the repo
2. `cd ws-frontend-test` to go into the folder
3. `npm i` to install the npm packages
3. `npm run react` to transpile the react files
4. `npm start` to start the server 
5. Got to `localhost:3000` in your browser

## Brief: 
Create a web app that:  
- [x] Uses Authentication   
- [x] Fetches user stock data from an API  
- [x] Render information in a user-friendly way  
- [x] Displays a minimum of three pages of user information  

## Solution
#### Stack
Frontend: React.js (with Parcel/Babel)   
Backend: Node.js  
Auth: jsonwebtoken  
Deployment: Heroku 

### Going fullstack
Due to the nature of the financial API data, I wanted to create a secure login experience. The preferred architecture consisted of three layers: 
1. *Frontend:* Taking in the user details and passing them on to a webproxy server
2. *Backend:* Server receiving the user details and using them to request relevant info for the API
3. *External API:* Able to provide information about registerred users  

#### Authorisation
* Valid user info will generate a token that will allow further access to the personal information
* The token needs to be provided when requesting any new information from the API
* The token is received and encrypted by the server before being passed to the front
* In the client, the encrypted token is stored in local storage until the user logs out, triggering clearing of the local storage

#### Frontend structure
* `App.js` component makes all the fetch() requests and passes down the data to the relevant children via props
* `LoginForm.js` component renders and takes in the username and password and passes them back to `App.js`
* `PortfolioList.js`, `PortfolioDetail` and `InstumentDetail.js` all display information stemming from a an API request via the server
* `PortfolioList.js` and `PortfolioDetail` both pass back an id to `App.js` for use in the api request that populated its child component with data

#### Backend structure
* The server is created in `server.js`
* The requested endpoints are split out in `routes.js`
* The `handler.js` file determines what happens at each endpoint

#### React functionality 
Rendering of all components is achieved by alternating it's state between true/false
* *`login()`:* 
  - POSTs the user info to the server for use in the API request 
  - Receives an encrypted token that si saved in local storage
* *`getPortfolioData()`*, *`getPortfolioDetails()`* and *`getInstrumentDetails()`*:
  - Send GET requests to the server with the encrypted token from local storage
  - Receives different bits of user data that are rendered by the relevant components
* *`logout()`:*
  - Empties local storage
  - Displays the `LoginForm.js` component

#### Server functionality  
* *`/api-login`:* 
  - Login details are received via `apiLoginRoute()` and passed on to the API
  - A token is returned back if user info is valid
  - Before reaching the front `jsonwebtoken` encrypts the token
* *`/api-portfolios`*, *`/api-portfolio-details/`* and *`/api-instrument-details/`:* 
  - The encrypted token is received via `apiRequestRoute()` and decrypted before being passed on to request user data from the API 
* *`All other endpoints:`* Leads to `reactRoutes()` which reads the transpiled react files straight from the `/dist` folder
