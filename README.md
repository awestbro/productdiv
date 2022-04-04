[![npm version](https://badge.fury.io/js/productdiv.svg)](https://badge.fury.io/js/productdiv)

![Alt text](/images/productdiv_logo_white_transparent.png?raw=true "Optional Title")

An open-source visual user-interface builder using your own css!

## Add to your project

TODO

## Development

```
npm i
npm run dev
```

## Configuration

ProductDiv configuration information can be found in `/app/lib/configuration/configuration-importer.ts` under the `LibraryConfigurationDefinition` type.

Configuration Schema:

```js
{

    templates: [
        {
            name: string,
            htmlTemplate: string,
            tags: string[],
            previewWidth?: string,
        }
    ],
    utilityClasses: [
        {
            name: string;
            type: "selectOne" | "selectMany";
            documentationLink?: string;
            classes: string[];
            tags: string[];
            selectors?: string[];
        }
    ],
    // Things you want productdiv to ignore as editable "elements"
    treeViewIgnoreQuerySelectors: [
        'script',
        'style',
        'link',
        '[data-productdiv="true"]',
        'svg',
    ],
}
```

## Editor Configuration

```ts
export type ProductDivConfig = {
  htmlFormatter?(s: string): string;
};
```

An example usage with BASIC JSX formatting

```ts
import ProductDiv, { jsxFormatter } from "productdiv";
import BootstrapComponents from "productdiv/dist/bootstrap-5-config";

document.addEventListener("DOMContentLoaded", () => {
  ProductDiv(BootstrapComponents, { htmlFormatter: jsxFormatter });
});
```
