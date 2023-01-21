# Image processing API

## How to build and start the server

### 1. Install all dependencies

`npm install`

### 2. Build

`npm run build`

### 3. Start the Server

`npm run dev`

This command will start the server running on port `3000`.

### 4. Linting

`npm run lint`

## 5. Formatting

`npm run prettier`

### 6. Testing

`npm run test`

This command will build then run test cases

## Endpoint

Method: `get`
URL Params: `filename` and `height` and `width` - the height or width of the image in pixels

    For example: `localhost:3000/resize?filename=fjord&width=300&height=300`

#### Available Image options

1. `fjord`
2. `encenadaport`
3. `palmtunnel`
4. `santamonica`
5. `icelandwaterfall`
