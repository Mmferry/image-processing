﻿# Image processing API
 
##Project Summary

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## How to build and start the server

####please follow below instractions.

### 1. Install all dependencies

`npm install`

### 2. Build

`npm run build`

### 3. Start the Server

`npm run dev`

This command will start the server running on port `3000`.

### 4. Linting

`npm run lint`

### 5. Formatting

`npm run prettier`

### 6. Testing

`npm run test`

This command will build then run test cases

## Endpoint

Method: `get`
URL Params: `filename` and `height` and `width`

    For example: `localhost:3000/resize?filename=fjord&width=200&height=200`

#### Available Image options

1. `fjord`
2. `encenadaport`
3. `palmtunnel`
4. `santamonica`
5. `icelandwaterfall`
