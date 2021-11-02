Code Repository for the frontend used in the AZUR project from the 2021 [Tech4Germany](tech.4germany.org) fellowship. This frontend calls upon a backend which is abstracted out as an API. The API is available on [the Tech4Germany GitHub](https://github.com/tech4germany/AZUR-API).

# AZUR

In the German Bundestag, various resources are allocated to parties according to their strengths in the plenum using one of three [proportionality calculation](https://en.wikipedia.org/wiki/Party-list_proportional_representation) methods - the Sainte-Laguë/Schepers, d'Hondt, and Hare-Niemeyer methods. This includes, for example, the number of seats on committees, speaking time on the floor, and even things like floor space on open-door days. AZUR is an internally used calculator that applies these methods - this project is its third iteration, after one created in the 1970s and one created in 2000.

# AZUR-Frontend

This repository contains the implementation of the frontend for AZUR. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Available Scripts

In the project directory, you can run:

### `yarn start_dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start`

Hosts the last version of the app that has been created with `yarn build`.

