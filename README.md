# Create Apps In Node.js

# Package/Compile App
node node_modules/gallium/index.js pack

# Functions

## Require
```js
const gallium = require('gallium');
```

## Initialize
```js
const window = gallium.init({
    title: 'Gallium',
    width: 800,
    height: 600,
    fullscreen: false,
});
```

## Create Text
```js
let text1 = window.text('Hello, World!', 10, 10, 'Arial', 10, 'Black');
```

## Run
```js
window.run();
```