import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { getEditorMountPoint } from "./utilities/selector";
import { Application } from "./components/Application";
import {
  LibraryConfigurationDefinition,
  ComponentDefinition,
  UtilityClassDefinition,
  UtilityClassControl,
  TemplateCategoryDefinition,
  TemplateDefinition,
  ParsedLibraryConfigurationDefinition,
  parseLibraryConfiguration,
} from "./utilities/configuration/configuration-importer";

import { ConfigurationModifier } from "./utilities/configuration/configuration-modifier";

export {
  LibraryConfigurationDefinition,
  ComponentDefinition,
  UtilityClassDefinition,
  UtilityClassControl,
  TemplateCategoryDefinition,
  TemplateDefinition,
  ParsedLibraryConfigurationDefinition,
  ConfigurationModifier,
};

// eslint-disable-next-line
const theme = require("./theme.scss");

import { sanitizeHtmlToString } from "./utilities/clipboard";
import { htmlStringToNodeList } from "./utilities/dom/dom-utilities";

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

let htmlSnapshot = "";

function mountApplication(configuration: ParsedLibraryConfigurationDefinition) {
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
    <div style={{ position: "fixed", bottom: 10, left: 10 }}>
      <button
        type="button"
        style={{
          color: "#f8f9fa",
          backgroundColor: "#6976ce",
          border: "1px solid white",
          padding: "0.375rem 0.75rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
        }}
        onClick={() => {
          unmountComponentAtNode(mount);
          htmlSnapshot = document.documentElement.innerHTML;
          mountProductDiv(configuration, htmlSnapshot);
        }}
      >
        PD
      </button>
    </div>,
    mount
  );
}

async function mountProductDiv(
  configuration: ParsedLibraryConfigurationDefinition,
  html: string
) {
  document.open();
  document.write(`
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
    <Application
      pageSource={html}
      configuration={configuration}
      onLeftNavClose={(iframeDocument: Document) => {
        const str = sanitizeHtmlToString(iframeDocument.documentElement);
        unmountComponentAtNode(getEditorMountPoint());
        document.open();
        document.write(str);
        document.close();
        document.addEventListener("DOMContentLoaded", () => {
          mountApplication(configuration);
          window.scrollTo(0, getOffsetTop());
        });
      }}
    />,
    getEditorMountPoint()
  );
}

export default function ProductDiv(
  configuration: LibraryConfigurationDefinition
) {
  if (!inIframe()) {
    saveOffsetTop(0);
    mountApplication(parseLibraryConfiguration(configuration));
  }
}
