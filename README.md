[![npm version](https://badge.fury.io/js/productdiv.svg)](https://badge.fury.io/js/productdiv)

![Alt text](/images/productdiv_logo_white_transparent.png?raw=true "Optional Title")

[ProductDiv](https://productdiv.com) - an open-source visual user-interface builder using your own css!

[View Documenation and Demo](https://productdiv.com/docs)

## Add to your project

```js
/**
 *  You can include this code in a seperate file that gets bundled in development, or
 *  use local environment variables to only do this in dev. Example:
 *  if (process.env.NODE_ENV === 'development') {
 *      ...
 *  }
 */
import ProductDiv from "productdiv";
import { BootstrapConfiguration } from "productdiv-config-bootstrap5";

document.addEventListener("DOMContentLoaded", () => {
  ProductDiv(BootstrapConfiguration);
});
```

For editor configuration, please refer to the docs here: https://productdiv.com/docs

## Local Development

```
npm i
npm run dev
```
