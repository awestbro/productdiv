import { ComponentDefinition } from "../../utilities/configuration/configuration-importer";

export const components: ComponentDefinition[] = [
  {
    name: "Anchor",
    selectors: ["a"],
    utilityClassMatches: ["Link"],
  },
  {
    name: "Button",
    selectors: ["button", "a", ".btn"],
    utilityClassMatches: ["Button"],
  },
  {
    name: "Text",
    selectors: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "span"],
    utilityClassMatches: ["Text"],
  },
  {
    name: "Navbar",
    selectors: [".navbar"],
    utilityClassMatches: ["Navbar", "Color"],
  },
  {
    name: "Container",
    selectors: [".container", ".container-fluid"],
    utilityClassMatches: ["Container"],
  },
  {
    name: "Row",
    selectors: [".row"],
    utilityClassMatches: ["Flex Container", "Row"],
  },
  {
    name: "Columns",
    selectors: [".col", '*[class^="col-"]'],
    utilityClassMatches: ["Column"],
  },
  {
    name: "Flex Container",
    selectors: [".d-flex"],
    utilityClassMatches: ["Flex Container"],
  },
  {
    name: "List",
    selectors: ["ul", "ol", "li"],
    utilityClassMatches: ["List"],
  },
  {
    name: "Image",
    selectors: ["img"],
    utilityClassMatches: ["Image"],
  },
  {
    name: "Table",
    selectors: ["table", ".table"],
    utilityClassMatches: ["Table", "Border"],
  },
  {
    name: "Table Head",
    selectors: ["thead"],
    utilityClassMatches: ["Table Head"],
  },
  {
    name: "Table Body",
    selectors: ["tr", "td"],
    utilityClassMatches: ["Table Body"],
  },
  {
    name: "Table Responsive",
    selectors: ['*[class^="table-responsive"]'],
    utilityClassMatches: ["Table Responsive"],
  },
  {
    name: "Alert",
    selectors: [".alert", ".alert a"],
    utilityClassMatches: ["Alert"],
  },
  {
    name: "Alert Link",
    selectors: [".alert a"],
    utilityClassMatches: ["Alert Link"],
  },
  {
    name: "Badge",
    selectors: [".badge"],
    utilityClassMatches: ["Badge", "Color"],
  },
  {
    name: "Breadcrumb",
    selectors: [
      'nav[aria-label="breadcrumb"]',
      ".breadcrumb",
      ".breadcrumb-item",
    ],
    utilityClassMatches: ["Breadcrumb"],
  },
  {
    name: "Button Group",
    selectors: [".btn-group"],
    utilityClassMatches: ["Button Group"],
  },
  {
    name: "List Group Item",
    selectors: [".list-group-item"],
    utilityClassMatches: ["List Group Item"],
  },
  {
    name: "Nav",
    selectors: [".nav"],
    utilityClassMatches: ["Nav", "Flex Container"],
  },
  {
    name: "Offcanvas",
    selectors: [".offcanvas"],
    utilityClassMatches: ["Offcanvas"],
  },
  {
    name: "Pagination",
    selectors: [".pagination"],
    utilityClassMatches: ["Pagination", "Flex Container"],
  },
  {
    name: "Progress Bar",
    selectors: [".progress-bar"],
    utilityClassMatches: ["Progress", "Color", "Sizing"],
  },
  {
    name: "Spinner",
    selectors: ['*[class^="spinner"]'],
    utilityClassMatches: ["Spinner", "Color"],
  },
  {
    name: "Form Control",
    selectors: [".form-control"],
    utilityClassMatches: ["Form Control"],
  },
];
