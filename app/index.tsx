import * as React from "react";
import * as ReactDOM from "react-dom";

import { getEditorMountPoint } from "./utilities/selector";
import { Application } from "./components/Application";
import {
  LibraryConfigurationDefinition,
  ParsedLibraryConfigurationDefinition,
  parseLibraryConfiguration,
} from "./utilities/configuration/configuration-importer";

import "./theme.scss";
import { sanitizeHtmlToString } from "./utilities/clipboard";
import { htmlStringToNodeList } from "./utilities/dom/dom-utilities";

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

let htmlSnapshot = "";

function mountApplication(
  configuration: ParsedLibraryConfigurationDefinition,
  cssPath: string
) {
  let mount = getEditorMountPoint();
  if (!mount) {
    const node = htmlStringToNodeList('<div id="productdiv"></div>')[0];
    mount = document.body.appendChild(node) as HTMLElement;
  }
  ReactDOM.render(
    <div style={{ position: "fixed", bottom: 10, left: 10 }}>
      <button
        type="button"
        style={{
          color: "#f8f9fa",
          backgroundColor: "#6976ce",
          borderColor: "#6976ce",
          border: "1px solid transparent",
          padding: "0.375rem 0.75rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
        }}
        onClick={() => {
          ReactDOM.unmountComponentAtNode(mount);
          htmlSnapshot = document.documentElement.innerHTML;
          mountProductDiv(configuration, cssPath, htmlSnapshot);
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
  cssPath = "/app.css",
  html: string
) {
  document.open();
  document.write(`
        <html>
            <head></head>
             <body>
                <link rel="stylesheet" href="${cssPath}">
                <div id="productdiv" class="d-flex flex-row w-100 h-100"></div>
            </body>
        </html>
    `);
  document.close();

  document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <Application
        pageSource={html}
        configuration={configuration}
        onLeftNavClose={(iframeDocument: Document) => {
          const str = sanitizeHtmlToString(iframeDocument.documentElement);
          ReactDOM.unmountComponentAtNode(getEditorMountPoint());
          document.open();
          document.write(str);
          document.close();
          document.addEventListener("DOMContentLoaded", () => {
            mountApplication(configuration, cssPath);
          });
        }}
      />,
      getEditorMountPoint()
    );
  });
}

export default function ProductDiv(
  configuration: LibraryConfigurationDefinition,
  cssPath = "/app.css"
) {
  if (!inIframe()) {
    mountApplication(parseLibraryConfiguration(configuration), cssPath);
  }
}
