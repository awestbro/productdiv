import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { getEditorMountPoint } from "./utilities/selector";
import { Application } from "./components/Application";
import {
  LibraryConfigurationDefinition,
  UtilityClassDefinition,
  TemplateDefinition,
  ParsedLibraryConfigurationDefinition,
  parseLibraryConfiguration,
} from "./utilities/configuration/configuration-importer";

import { htmlStringToNodeList } from "./utilities/dom/dom-utilities";
import { jsxFormatter } from "./utilities/jsx-formatter";
import { EditorToggle } from "./components/common/EditorToggle";

export {
  LibraryConfigurationDefinition,
  UtilityClassDefinition,
  TemplateDefinition,
  ParsedLibraryConfigurationDefinition,
  jsxFormatter,
};

// eslint-disable-next-line
const theme = require("./theme.scss");

export function saveOffsetTop(top: number) {
  localStorage.setItem("productdiv-offset-top", JSON.stringify(top));
}

export function getOffsetTop() {
  const top = localStorage.getItem("productdiv-offset-top");
  if (top) {
    return JSON.parse(top);
  }
  return 0;
}

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function mountApplication(
  configuration: ParsedLibraryConfigurationDefinition,
  editorConfig: ProductDivConfig
) {
  let mount = getEditorMountPoint();
  if (!mount) {
    const node = htmlStringToNodeList('<div id="productdiv"></div>')[0];
    mount = document.body.appendChild(node) as HTMLElement;
  }
  document.addEventListener("scroll", function () {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    saveOffsetTop(top);
  });
  render(
    <EditorToggle
      onClick={() => {
        unmountComponentAtNode(mount);
        mountProductDiv(configuration, editorConfig);
      }}
    />,
    mount
  );
}

export type ProductDivConfig = {
  htmlFormatter?(s: string): string;
  preventPageLeave?: boolean;
  preventHistoryLeave?: boolean;
};

async function mountProductDiv(
  configuration: ParsedLibraryConfigurationDefinition,
  editorConfig: ProductDivConfig
) {
  document.open();
  document.write(`
        <!DOCTYPE html>
        <html>
            <head></head>
             <body>
                <style>
                ${theme}
                </style>
                <div id="productdiv" class="d-flex flex-row w-100 h-100"></div>
            </body>
        </html>
    `);
  document.close();

  render(
    <Application editorConfig={editorConfig} configuration={configuration} />,
    getEditorMountPoint()
  );
}

export default function ProductDiv(
  config: LibraryConfigurationDefinition,
  editorConfig: ProductDivConfig = {}
) {
  const defaultConfig: ProductDivConfig = {
    preventPageLeave: true,
    preventHistoryLeave: true,
  };
  if (!inIframe()) {
    saveOffsetTop(0);
    mountApplication(parseLibraryConfiguration(config), {
      ...defaultConfig,
      ...editorConfig,
    });
  }
}
