# Dolphin M3MO BE

This project is an Express and Socket.io server used to run the dolphin memo web app. 
It's been made using Node and Typescript for the Back-End, and is deployed through a pipeline to Heroku.

You can visit the deployed application by going to [https://dolphin-memo.herokuapp.com/](https://dolphin-memo.herokuapp.com/).

## Available Endpoints

With the server on, we can now retrieve a list of:
- [Games](https://dolphin-memo.herokuapp.com/games) at https://dolphin-memo.herokuapp.com/games or http://localhost:8080/games ;
- [Public Games](https://dolphin-memo.herokuapp.com/public-games) at https://dolphin-memo.herokuapp.com/public-games or http://localhost:8080/public-games ;

Moreover you can access a single element by adding its id at the end of the url:
For example: https://dolphin-memo.herokuapp.com/games/id ;

## Available Scripts

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn run lint:fix`

The site is formatted by Eslint and Prettier, to fix possible Eslint errors you can run this command.
