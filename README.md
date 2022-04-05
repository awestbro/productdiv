[![npm version](https://badge.fury.io/js/productdiv.svg)](https://badge.fury.io/js/productdiv)

![Alt text](/images/productdiv_logo_white_transparent.png?raw=true "Optional Title")

An open-source visual user-interface builder using your own css!

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
  ProductDiv(config);
});
```

## Local Development

```
npm i
npm run dev
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

# ProductDiv Instructions

## What is ProductDiv?

ProductDiv is a web page editor that works anywhere! It accomplishes this by being and HTML and CSS first editor, running entirely client side and based on configuration. It was born out of a frustration with other visual editing tools either for a lack of configurability, extensability, or means of distribution. The core of ProductDiv is an open source library found [here](https://github.com/awestbro/productdiv).

ProductDiv works by rendering your templates in the page itself! This way as your project grows, evolves, and changes so do your templates! Since ProductDiv is configuration based, it is intended to live beside your project as a tool for all the developers on your team! Have a common component? Make a template defintion and your team never has to write that code again!

## How do I use ProductDiv?

Start using ProductDiv by clicking the purple "PD" button in the bottom left hand of your browser! This opens ProductDiv by wrapping the current page in an `iframe` element so it can render the ProductDiv editor! Now you should see ProductDiv on the left hand side of the screen ready for use! If you see elements being highlighted while you mouse over them don't panic! We'll get to that in just a moment.

### Using the Template Selector

The Template selector should now be visible with all of your templates! Try hover over the "eye" icon to see a template rendered in your page! To put it into your page, click and drag any template item over your page. When dragging a template onto the page, you'll notice ProductDiv renders large rectangles around every element on your page. This is to ensure your template can be placed anywhere on the page because by default, there are many hidden elements that could normally not be selected by hovering over them. When trying to place an element, the outer top and left corners around an element are drop zones for prepending an element. Dropping a template over the bottom and right edges of an element will append the template after that element. If you drag a template over the element, you will see green highlighted boxes on the left and right halves of the element. This will do an inner prepend/ append. Once you know where you're placing your element, just release the drag and watch it pop into the page!

Templates are defined in your configuration for you to create, modify, and extend to your liking! Some templates even include containers to place other elements in them. Many of the "Layout" components make use of this feature to make empty cards, containers, rows, etc for you to drag elements in as you see fit! These become the building blocks of your application. To make your own container, in any template add:

```
<div class="productdiv-drop-container"></div>
```

Try adding your own styles if you want to modify the preview!

### Editing Elements

The Element Editor is opened by either clicking an element you want to modify, or by dragging a template onto the page! Once it's open, you can modify the HTML directly if you so choose, or apply utility classes to the element using any of the defined classes! After scrolling down, you can see active classes on the element, matched classes based on configuration (i.e. if you click on an anchor, it will show link and button helpers since they can be directly applied to the element), and filtered classes if you so choose. Each utility class is defined with "Tags" that can be easily filtered using the "Filter by tag" and "Filter by name" inputs at the top of the section. For instance if I wanted to modify an element's margin and padding, I would select the "Spacing" tag from the tag filter and make sure my element is placed exactly where I want it.

The Attribute Editor can be used by clicking the "Attributes" button at the top of the Element Editor. This is used to modify any attributes on the element, such as style and others. Attributes can be added by clicking the "+" symbol next to the title.

Much of the functionality of the Element Editor is in the actions. Under the HTML editor, you will see all of the actions available. An important one is Select Parent. This selects the immediate parent for this element and is useful for quickly navigating to elements that may be hard to click exactly. If you need to get to a hard to select parent element, just click its nearest child and "Select Parent" until you're on the node you want to select. Other useful editing actions are "Duplicate" and "Delete" which are self-explanatory. The "Move" action lets you drag and drop the element around the page like you are used to with the Template Selector! The "Copy HTML" action copies the HTML of the element to your clipboard. The "Copy As Template" button copies a javascript template version of your component so you can easily add it to your configuration and use the element from the Template Selector!

`NOTE:` Usage with client side frameworks

If you use a client-side rendering framework like React or Vue, your page changes will be lost when you turn off ProductDiv as the page performs a full document re-render. Please copy any changes you would like to keep to you code before toggling this off. If you're using static or server-side HTML, you can toggle ProductDiv on and off at will.

At the bottom of the ProductDiv editor, there's a small menu for toggling ProductDiv off.

On the right-hand side of the menu you'll find actions. From here you can copy the entire page's HTML, you can open documentation, and you can toggle the Tree View! This will open a seperate menu on the right hand side of the screen to help you easily navigate the nested structure of the DOM. Clicking an element in the TreeView will open it in the Element Editor!

## Making ProductDiv your own

ProductDiv is a foundation for your project that grows with you. All of it is entirely configurable so if you're adding new styles or components to your application, modify your ProductDiv configuration and you'll be set to develop with speed! Definitions for configuration are located in the ProductDiv main repository at: (https://github.com/awestbro/productdiv/blob/main/app/utilities/configuration/configuration-importer.ts)[https://github.com/awestbro/productdiv/blob/main/app/utilities/configuration/configuration-importer.ts]. An example configuration could be defined as:

```js
const configuration = {
  treeViewIgnoreQuerySelectors: [
    "script",
    "style",
    "link",
    '[data-productdiv="true"]',
    "svg",
  ],
  utilityClasses: [
    {
      name: "Margin Start",
      type: "selectMany",
      classes: [
        "ms-(0|1|2|3|4|5|auto)",
        `ms-(sm|md|lg|xl|xxl)-(0|1|2|3|4|5|auto)`,
      ],
      tags: ["Spacing", "Margin"],
      selectors: [".test"],
      documentationLink:
        "https://getbootstrap.com/docs/5.0/utilities/spacing/#margin-and-padding",
    },
  ],
  templates: [
    {
      name: "Section Container",
      htmlTemplate: `
                    <section>
                        <div class="container">
                          <div class="productdiv-drop-container"></div>
                        </div>
                    </section>
                    `,
      tags: ["Layout"],
      previewWidth: "100%", // optional, defaults to 100%
    },
  ],
};
```

Above is a fully working configuration for ProductDiv. It's all templates and utility classes! Lets take a more in-depth look at the structure. Firstly `treeViewIgnoreQuerySelectors` will mostly be the same anywhere you use ProductDiv, but it can be used to exclude selectors of elements you don't want visible in the tree view (it can get very large with things like svgs). Under Utility classes is where things get interesting.

`utilityClasses` are defined by:

- `name`: Pretty name displayed in the Element Editor
- `type`: The control to use when selecting. One of `selectOne` or `selectMany`
- `classes`: Any class that can be applied via this control
  - the `(option|option2)` syntax is expanded by ProductDiv, so for example `me-(1|2)` will become two options: `me-1` and `me-2`.
- `tags`: Tags help with searching, filtering, and categorizing in the filters section of the Element Editor
- `documentationLink`: This is a link to a URL for documentation
- `selectors`: A list of selectors this element will "match" when editing. This puts the control at the top of the list when editing making sure you always have the right editing controls in place for your element type.

`templates` are defined by:

- `name`: Pretty name displayed in the Element Editor
- `htmlTemplate`: The HTML you want on your page
- `tags`: Tags help with searching, filtering, and categorizing in the filters section of the Template Selector
- `previewWidth`: an optional setting for displaying previews. Default template previews are set to 100% width.

## Now it's time to start Building!

If you run into any issues with the ProductDiv, please submit an issue at: [https://github.com/awestbro/productdiv/issues](https://github.com/awestbro/productdiv/issues).
