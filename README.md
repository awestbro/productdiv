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

Example Configuration:

```js
{
    components: [
        {
            name: string,
            selectors: string[], // Query Selectors that should match this element
            utilityClassMatches: string[], // Utility class matches, use to assign say "Button" utility class definitions to this element while editing it
        }
    ],
    templateCategories: [
        {
            name: string,
            templates: [
                {
                    name: string,
                    htmlTemplate: string,
                }
            ]
        }
    ],
    utilityClasses: [
        {
            section: string,
            documentationLink?: string, // Link to external documentation for this element
            controls: [
                {
                    name: string,
                    type: 'selectOne' | 'selectMany',
                    classes?: string[], // List of classes. Can use short-hand to expand to multiple e.x. mt-(1|2|3) = mt-1, mt-2, mt-3
                }
            ]
            showDefault?: boolean,
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
