# React(Debugging): Fix Pokemon Details

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/wdDsg_eJzKv9SqT6fFM0QQ/ezgif.com-gif-maker%20(4).gif)

## Functionality Requirements

The component must have the following functionalities:

- The input field should take the pokemon id as a number.
- The id should be in the range of 1 to 151. Otherwise, the component should show an alert with the text 'Pokemon ID must be between 1 and 151'.
- On getting a valid pokemon id, the component should make a GET request to the following API endpoint 'https://jsonmock.hackerrank.com/api/pokemon?id=<id>' which returns pokemon data in JSON format
- If the pokemon contains the next evolved version, the 'Next Evolution' button should be enabled.
- If the pokemon contains a previous evolved version (primitive version), the 'Prev Evolution' button should be enabled.
- On clicking the 'Next Evolution' button, the next evolved version of the pokemon should be fetched from the API and loaded.
- On clicking the 'Prev Evolution' button, the previous version of the pokemon should be fetched from the API and loaded.
- The Pokemon.js component should be used to render all the pokemon data by passing the pokemon as props.

## Project Specifications

**Read Only Files**
- src/App.test.js

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
