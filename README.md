# ProductDiv

An open-source visual user-interface builder using your own css!

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
