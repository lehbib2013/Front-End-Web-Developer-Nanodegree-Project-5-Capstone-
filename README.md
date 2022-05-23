# Introduction

This repo is for my cqpstone project in Front End Developper nanodegree Programm at Udacity.
those are topics covered by this project :

The idea behind this chalenge is to practice all learned concepts and technics on a topic of Travel App.
The programme will communicate with third parties APIs to read and get data about Geographic ,weather and photos of locatiobs.
The user can compose their trips by adding multiple destinations called segments.



## Getting started

Remember that once you clone, you will still need to install everything:

`cd` into your new folder and run:
- `npm install`

## Dependencies

this projects depends on following npm packages :
```
    "@babel/core": "^7.13.15",
    "@babel/plugin-transform-modules-commonjs": "^7.13.8",
    "@babel/preset-env": "^7.17.10",
    "babel-loader": "^8.2.2",
    "body-parser": "^1.19.0",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^6.0.4",
    "cors": "^2.8.5",
    "css-loader": "^5.2.1",
    "eslint": "^8.15.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.26.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^26.6.3",
    "mini-css-extract-plugin": "^0.8.0",
    "node-fetch": "^2.6.1",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "prettier": "2.6.2",
    "sass": "^1.51.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^2.0.0",
    "supertest": "^6.1.3",
    "terser-webpack-plugin": "^1.3.0",
    "webpack-dev-middleware": "^3.7.0",
    "webpack-dev-server": "^3.11.2",
    "workbox-webpack-plugin": "^4.3.1",
    "write-file-webpack-plugin": "^4.5.1"

```


###  Environement variables
To communicate with  API  , we stored the keys and URLs  in the the .env variable stored in .env file at the root of the project.


## Executing API Fetching

to run the dev server pn port 8080:
```
npm run build-dev
```
to run prdoction server on 8081 :
```
npm run build-prod
```

#

## Tests
to run test :
```
npm run test
```

## Deploying

the project currently not yet deployed.
